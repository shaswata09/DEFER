"""Data for the static companion page (ui/index.html).

    python -m ui.build_data        # -> ui/data/defer-data.js, ui/data/catalog.js

Reads only what the paper's tables read: the reported runs through
``analysis.reported`` (CyberOps v3.2, the other domains v3.1 with v3.1.4
cells), JUDGEONLY and FULL as their direct outcome under Local4 from the
cached votes, panel-free configurations as run. No model is queried.

The page computes every rate itself from the per-trial rows written here, so
its numbers can be checked against results/reported_boundary.json
(``--check`` does that and exits non-zero on a mismatch).

Both outputs are JavaScript files that assign a global, so the page also
works when opened from a checkout (``file://`` cannot ``fetch`` JSON).
"""
from __future__ import annotations

import argparse
import datetime as _dt
import glob
import json
import re
import shutil
import sys
from collections import Counter

from analysis import tiers
from analysis.p3_eligibility import _payload, trials
from analysis.replay_panels import load_all_votes, outcomes
from analysis.replay_reported import keep, load_rounds
from analysis.reported import ABLATION, DOMAINS, FREEZE, PRIMARIES, REPORTED
from attacks.effects import build_calls, evaluate_effects
from config import BASE_DIR

OUT = BASE_DIR / "ui" / "data"
RES = BASE_DIR / "results"
TEX = BASE_DIR / "paper" / "main.tex"

# config as logged -> page key
CFG = {"flat": "FLAT", "acl_hardened": "ACL", "symbolic_only": "NOJUDGE",
       "defer": "FULL", "llm_judge": "JUDGEONLY"}
PANEL_FREE = ("flat", "acl_hardened", "symbolic_only")
PRIM_ARM = {"gpt-oss-120b": "rep_oss120", "Llama-3.1-8B": "rep_llama8b"}
CHANNEL = {"alert_text": "C1", "tool_response": "C2", "memory": "C3",
           "handoff": "C4", "proposal_justification": "C5"}


# --------------------------------------------------------------------- #
#  Trials
# --------------------------------------------------------------------- #
def _attack_row(run, domain, cfg, tid, outcome, mech, channel):
    _, ap, var, trial = tid.split("_")[:4]
    return [run, domain, CFG[cfg], ap, int(var.lstrip("v")), int(trial.lstrip("t") or 0),
            outcome, mech or "", tiers.tier_of(mech) or "" if outcome == "blocked" else "",
            CHANNEL.get(channel, "")]


def _channel(domain: str, tid: str) -> str:
    p = _payload(domain, tid)
    return ((p[1].get("meta") or {}).get("channel") or "") if p else ""


def _benign_rows(run, domain, cfg, evs: dict, denied_by_trial: dict | None = None):
    rows = []
    for tid, ev in evs.items():
        if "_benign_" not in tid:
            continue
        calls = [c for c in build_calls(ev) if c.kind == "tool"]
        den = sum(c.denied for c in calls) if denied_by_trial is None else denied_by_trial[tid][0]
        parts = tid.split("_")
        rows.append([run, domain, CFG[cfg], parts[2], parts[3], len(calls), den])
    return rows


def panel_free(run, group, domain, cfg, kv):
    evs = trials(group, domain, cfg)
    att = []
    for tid, ev in evs.items():
        if "_benign_" in tid or tuple(tid.split("_")[1:3]) not in kv:
            continue
        p = _payload(domain, tid)
        if not p:
            continue
        v = evaluate_effects(p[1], ev, config=cfg)
        if v.outcome in ("executed", "blocked", "not_attempted"):
            att.append(_attack_row(run, domain, cfg, tid, v.outcome, v.blocked_by, _channel(domain, tid)))
    return att, _benign_rows(run, domain, cfg, evs)


def judged(run, arm, group, domain, cfg, kv, V, R):
    o = outcomes(arm, group, cfg, (domain,), "", "Local4", V, R.get(arm, []))["domains"][domain]
    att = []
    for t in o["attack"]:
        if (t["ap"], t["variant"]) not in kv:
            continue
        tid = f"{domain}_{t['ap']}_{t['variant']}_{t['trial']}"
        att.append(_attack_row(run, domain, cfg, tid, t["outcome"], t["blocked_by"], _channel(domain, tid)))
    evs = trials(group, domain, cfg)
    return att, _benign_rows(run, domain, cfg, evs, o["benign_trials"])


def all_trials():
    V, R = load_all_votes(), load_rounds()
    kv = {d: keep(d) for d in DOMAINS}
    A, B = [], []

    def add(res):
        A.extend(res[0])
        B.extend(res[1])

    for d in DOMAINS:                                   # the reported boundary
        for cfg in PANEL_FREE:
            add(panel_free("boundary", REPORTED, d, cfg, kv[d]))
        add(judged("boundary", "rep_judgeonly", REPORTED, d, "llm_judge", kv[d], V, R))
        add(judged("boundary", "rep_full", REPORTED, d, "defer", kv[d], V, R))
        print(f"boundary {d}", flush=True)
    for i, g in ABLATION.items():                       # leave-one-out, CyberOps
        run = f"minus_P{i}"
        if i == 3:                                      # no panel without P3
            add(panel_free(run, g, "cyberops", "defer", kv["cyberops"]))
        else:
            add(judged(run, f"rep_full_minus_p{i}", g, "cyberops", "defer", kv["cyberops"], V, R))
    print("ablation", flush=True)
    for m, g in PRIMARIES.items():                      # two more primaries, CyberOps
        for cfg in PANEL_FREE:
            add(panel_free(m, g, "cyberops", cfg, kv["cyberops"]))
        add(judged(m, f"{PRIM_ARM[m]}_judgeonly", g, "cyberops", "llm_judge", kv["cyberops"], V, R))
        add(judged(m, f"{PRIM_ARM[m]}_full", g, "cyberops", "defer", kv["cyberops"], V, R))
    print("primaries", flush=True)
    return A, B


# --------------------------------------------------------------------- #
#  Paper tables (parsed from main.tex so the page follows the paper)
# --------------------------------------------------------------------- #
def _detex(s: str) -> str:
    s = re.sub(r"\\(textbf|textit|emph|texttt|textsc)\{([^{}]*)\}", r"\2", s)
    s = re.sub(r"~?\\(cite|ref)\{[^}]*\}", "", s)
    s = re.sub(r"\$([^$]*)\$", r"\1", s)
    for a, b in ((r"\theta", "θ"), (r"\tau", "τ"), (r"\alpha", "α"), (r"\kappa", "κ"), (r"\delta", "δ"),
                 (r"\geq", "≥"), (r"\leq", "≤"), (r"\times", "×"), (r"\,", " "), ("--", "–"),
                 (r"\%", "%"), ("``", "“"), ("''", "”"), (r"\_", "_"), ("~", " "), (r"\&", "&")):
        s = s.replace(a, b)
    s = re.sub(r"\\[a-zA-Z]+\s?", "", s)
    return re.sub(r"\s+", " ", s.replace("{", "").replace("}", "")).strip()


def _table(label: str) -> list[list[str]]:
    tex = TEX.read_text()
    i = tex.index(f"\\label{{{label}}}")
    body = tex[tex.index("\\midrule", i):tex.index("\\bottomrule", i)]
    rows = []
    for ln in body.split("\\\\"):
        ln = re.sub(r"%.*", "", ln).replace("\\midrule", "").strip()
        if ln and "&" in ln and "multicolumn" not in ln:
            rows.append([_detex(c) for c in ln.split("&")])
    return rows


def paper_tables() -> dict:
    checks = [{"id": r[0], "name": r[1], "type": r[2], "what": r[3]}
              for r in _table("tab:layers") if re.match(r"P\d\.\d+", r[0])]
    aps = [{"id": r[0].replace("AP-", "ap"), "label": r[0], "name": r[1], "objective": r[2],
            "channel": r[3], "tier": r[4], "effect": r[5]} for r in _table("tab:ap_list")]
    channels = [{"id": r[0], "name": r[1], "arrives": r[2], "surface": r[3], "tier": r[4]}
                for r in _table("tab:channels")]
    inv = []
    for r in _table("tab:inventory"):
        for k in (0, 4):
            if len(r) > k + 3 and r[k]:
                inv.append({"id": r[k], "vector": r[k + 1], "check": r[k + 2], "aps": r[k + 3]})
    return {"checks": checks, "aps": aps, "channels": channels, "inventory": inv}


# --------------------------------------------------------------------- #
#  Domains and the attack / benign catalog (the dataset previewer)
# --------------------------------------------------------------------- #
def domains() -> dict:
    out = {}
    for d in DOMAINS:
        cfg = BASE_DIR / "domains" / d / "configs"
        phases = {}
        for ph in ("monitor", "analyze", "admin", "report"):
            m = json.loads((cfg / f"{ph}_manifest.json").read_text())
            phases[ph] = {k: m.get(k) for k in ("allowed_tools", "allowed_memory_read",
                                                "allowed_memory_write", "max_actions_per_incident",
                                                "requires_consensus")}
        stores = json.loads((cfg / "memory_collections.json").read_text())["collections"]
        out[d] = {"phases": phases, "stores": stores}
    return out


def catalog() -> dict:
    """Every variant in the payload files. ``set`` is "reported" for the 75 per
    domain the paper reports, "sibling" for the rule-evading siblings (E2,
    attacks/build_e2_siblings.py), which carry their parent's id plus "e2"."""
    attacks, benign = [], []
    for d in DOMAINS:
        kv = keep(d)
        for f in sorted(glob.glob(str(BASE_DIR / "domains" / d / "payloads" / "ap*_variants.json")),
                        key=lambda p: int(re.search(r"ap(\d+)_", p).group(1))):
            for v in json.loads(open(f).read()):
                meta = v.get("meta") or {}
                ap_, var = v["variant_id"].split("_")[:2]
                attacks.append({"domain": d, "id": v["variant_id"], "ap": ap_,
                                "set": "reported" if (ap_, var) in kv else "sibling",
                                "name": v.get("name", ""), "description": v.get("description", ""),
                                "channel": CHANNEL.get(meta.get("channel"), ""),
                                "canaries": meta.get("canaries") or [], "payload": v})
        for f in sorted(glob.glob(str(BASE_DIR / "domains" / d / "payloads" / "benign*.json"))):
            for v in json.loads(open(f).read()):
                benign.append({"domain": d, "id": v["variant_id"], "name": v.get("name", ""),
                               "category": v.get("category", ""), "payload": v})
    return {"attacks": attacks, "benign": benign}


# --------------------------------------------------------------------- #
#  Results the page shows as tables (not re-derived per trial)
# --------------------------------------------------------------------- #
def _load(name: str) -> dict:
    p = RES / name
    return json.loads(p.read_text()) if p.exists() else {}


def summaries() -> dict:
    rep = _load("reported_boundary.json")
    return {"reported": rep, "primaries": _load("primaries_v32.json"), "tamas": _load("tamas.json"),
            "extras": _load("v31_extras.json"), "mechanisms": _load("v31_mechanisms.json"),
            "replay": {k: v for k, v in _load("replay_tables.json").items()
                       if k in ("asb", "judges", "lineage")}}


# paper figures the page shows as images (previews written by ``make figures``)
FIG_SRC = {**{n: BASE_DIR / "paper" / "figs" / "preview" / f"{n}.png" for n in (
    "judgment_boundary", "paired_variants", "panel_composition", "validator_behavior", "cost",
    "state_carryover", "asb_families", "transfer", "p5_reads")},
    **{n: BASE_DIR / "docs" / "figures" / f"{n}.png" for n in ("boundary_domains", "tamas")}}


def figures() -> list[dict]:
    """Copy the figure previews next to the page; return name and takeaway."""
    meta = {f["name"]: f["takeaway"] for f in
            json.loads((BASE_DIR / "paper" / "figs" / "figures.json").read_text())}
    (BASE_DIR / "ui" / "figures").mkdir(exist_ok=True)
    out = []
    for n, src in FIG_SRC.items():
        if src.exists():
            shutil.copyfile(src, BASE_DIR / "ui" / "figures" / f"{n}.png")
            out.append({"name": n, "takeaway": meta.get(n, "")})
    return out


# --------------------------------------------------------------------- #
def check(A, rep) -> int:
    """The page's point estimates against results/reported_boundary.json."""
    bad = 0
    for d in DOMAINS:
        for k in ("FLAT", "ACL", "NOJUDGE", "JUDGEONLY", "FULL"):
            rows = [r for r in A if r[0] == "boundary" and r[1] == d and r[2] == k]
            got = round(100 * sum(r[6] == "executed" for r in rows) / len(rows), 1)
            want = float(rep["domains"][d][k]["asr"].split()[0])
            ok = abs(got - want) < 0.05 and len(rows) == rep["domains"][d][k]["n"]
            bad += not ok
            print(f"{'ok ' if ok else 'BAD'} {d:10s} {k:9s} {got:5.1f} vs {want:5.1f}  n={len(rows)}")
    return bad


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="compare with reported_boundary.json")
    args = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    A, B = all_trials()
    S = summaries()
    data = {
        "built": _dt.date.today().isoformat(),
        "freeze": FREEZE, "panel": "Local4", "domains": list(DOMAINS),
        "attack_cols": ["run", "domain", "config", "ap", "variant", "trial", "outcome",
                        "mechanism", "tier", "channel"],
        "benign_cols": ["run", "domain", "config", "scenario", "trial", "proposed", "denied"],
        "attack": A, "benign": B,
        "tiers": {"order": list(tiers.TIERS), "label": tiers.LABEL, "color": tiers.COLOR},
        "paper": paper_tables(), "domain_config": domains(), "figures": figures(), **S,
    }
    (OUT / "defer-data.js").write_text("window.DEFER_DATA = " + json.dumps(data, separators=(",", ":")) + ";\n")
    (OUT / "catalog.js").write_text("window.DEFER_CATALOG = " + json.dumps(catalog(), separators=(",", ":")) + ";\n")
    print(f"{len(A)} attack trials, {len(B)} benign trials -> {OUT}")
    if args.check:
        sys.exit(1 if check(A, S["reported"]) else 0)


if __name__ == "__main__":
    main()
