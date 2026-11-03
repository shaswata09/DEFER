"""Stage (and optionally push) the DEFER dataset for the Hugging Face Hub.

    python -m scripts.build_hf_dataset                       # -> dist/hf_dataset/
    python -m scripts.build_hf_dataset --push <user>/<name> [--private] [--no-raw]

The staged folder holds the viewer-friendly part: the attack and benign suites
as JSON Lines, and the per-trial outcomes of the reported runs (the same rows
ui/index.html is built from, so they reproduce the paper's tables) next to the
as-run trial tables of every run group. ``--push`` uploads it, and unless
``--no-raw`` also the raw per-trial logs (logs/) and every cached judge vote and
logged panel input (cache/) from their repository paths, so the analysis code
runs unchanged on a download. No model is queried.
"""
from __future__ import annotations

import argparse
import csv
import json
import shutil

from analysis.reported import DOMAINS
from config import BASE_DIR
from ui.build_data import CFG, all_trials, catalog

OUT = BASE_DIR / "dist" / "hf_dataset"
T2_APS = {"ap5", "ap9", "ap10", "ap15"}
LABEL = {v: {"FLAT": "Flat", "ACL": "ACL", "NOJUDGE": "NoJudge", "FULL": "DEFER",
             "JUDGEONLY": "JudgeOnly"}[v] for v in CFG.values()}


def _jsonl(path, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")


def _csv(path, head, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(head)
        w.writerows(rows)


def suites() -> tuple[int, int]:
    """attacks/<domain>.jsonl and benign/<domain>.jsonl. Nested parts are JSON
    strings so every row has the same schema in the dataset viewer."""
    cat = catalog()
    for d in DOMAINS:
        rows = []
        for a in (x for x in cat["attacks"] if x["domain"] == d):
            p = a["payload"]
            meta = p.get("meta") or {}
            rows.append({
                "domain": d, "variant_id": a["id"], "attack_path": a["ap"], "set": a["set"],
                "name": a["name"], "intent": a["description"], "channel": a["channel"],
                "attacker_tier": "T2" if a["ap"] in T2_APS else "T1",
                "attacker_phase": meta.get("attacker_phase", ""), "canaries": a["canaries"],
                "incident": json.dumps(p.get("trigger") or {}, ensure_ascii=False),
                "injection": json.dumps(meta.get("injection") or {}, ensure_ascii=False),
                "memory_ops": json.dumps(p.get("memory_ops") or {}, ensure_ascii=False),
                "success_criteria": json.dumps(p.get("success_criteria") or {}, ensure_ascii=False),
                "payload": json.dumps(p, ensure_ascii=False),
            })
        _jsonl(OUT / "attacks" / f"{d}.jsonl", rows)
        _jsonl(OUT / "benign" / f"{d}.jsonl", [{
            "domain": d, "scenario_id": b["id"], "name": b["name"], "category": b["category"],
            "incident": json.dumps(b["payload"].get("trigger") or {}, ensure_ascii=False),
            "memory_ops": json.dumps(b["payload"].get("memory_ops") or {}, ensure_ascii=False),
            "expected_behavior": json.dumps(b["payload"].get("expected_behavior"), ensure_ascii=False),
            "payload": json.dumps(b["payload"], ensure_ascii=False),
        } for b in cat["benign"] if b["domain"] == d])
    return len(cat["attacks"]), len(cat["benign"])


def trials() -> tuple[int, int]:
    A, B = all_trials()
    _csv(OUT / "trials" / "reported_attack_trials.csv",
         ["run", "domain", "config", "attack_path", "variant", "trial", "outcome",
          "first_interceptor", "tier", "channel"],
         [[r[0], r[1], LABEL[r[2]], *r[3:]] for r in A])
    _csv(OUT / "trials" / "reported_benign_trials.csv",
         ["run", "domain", "config", "scenario", "trial", "tool_proposals", "denied"],
         [[r[0], r[1], LABEL[r[2]], *r[3:]] for r in B])
    for name in ("all_trials.csv", "all_trials_local4.csv"):
        shutil.copyfile(BASE_DIR / "results" / "eval_attacks" / name, OUT / "trials" / name)
    return len(A), len(B)


def results() -> None:
    """The committed summary files every paper table is generated into."""
    (OUT / "results").mkdir(parents=True, exist_ok=True)
    for p in sorted((BASE_DIR / "results").glob("*")):
        if p.is_file() and p.suffix in (".json", ".md", ".csv"):
            shutil.copyfile(p, OUT / "results" / p.name)


def card(n_att: int, n_ben: int, n_at: int, n_bt: int) -> None:
    (OUT / "README.md").write_text(CARD.format(n_att=n_att, n_ben=n_ben, n_at=f"{n_at:,}", n_bt=f"{n_bt:,}"))


def _retry(step: str, fn, tries: int = 6):
    """The Hub answers some requests with a transient 401; retry with backoff.
    Every step is idempotent (a commit skips files already on the Hub)."""
    import time
    for i in range(tries):
        try:
            return fn()
        except Exception as e:                          # noqa: BLE001
            if i == tries - 1:
                raise
            print(f"{step}: {type(e).__name__}, retry {i + 1} in {15 * 2 ** i}s", flush=True)
            time.sleep(15 * 2 ** i)


def push(repo: str, private: bool, raw: bool) -> None:
    from huggingface_hub import HfApi
    api = HfApi()
    kw = dict(repo_id=repo, repo_type="dataset")
    _retry("create", lambda: api.create_repo(repo, repo_type="dataset", private=private, exist_ok=True))
    _retry("staged", lambda: api.upload_folder(folder_path=str(OUT), **kw,
                                               commit_message="DEFER dataset: suites, per-trial outcomes, results"))
    print("staged part uploaded", flush=True)
    if raw:
        _retry("cache", lambda: api.upload_folder(folder_path=str(BASE_DIR / "cache"), path_in_repo="cache",
                                                  allow_patterns=["validators/*", "replay*/*"], **kw,
                                                  commit_message="Cached judge votes and logged panel inputs"))
        print("cache uploaded", flush=True)
        _retry("logs", lambda: api.upload_folder(folder_path=str(BASE_DIR / "logs"), path_in_repo="logs",
                                                 allow_patterns=["**/*.jsonl", "*.jsonl"], **kw,
                                                 commit_message="Raw per-trial logs"))
        print("logs uploaded", flush=True)
    print(f"https://huggingface.co/datasets/{repo}")


CARD = """---
license: mit
pretty_name: DEFER judgment-boundary dataset
language:
- en
tags:
- security
- multi-agent-systems
- llm-agents
- prompt-injection
- memory-poisoning
- llm-as-a-judge
size_categories:
- 1K<n<10K
configs:
- config_name: attacks
  data_files: attacks/*.jsonl
  default: true
- config_name: benign
  data_files: benign/*.jsonl
- config_name: reported_attack_trials
  data_files: trials/reported_attack_trials.csv
- config_name: reported_benign_trials
  data_files: trials/reported_benign_trials.csv
- config_name: all_trials
  data_files: trials/all_trials.csv
- config_name: all_trials_local4
  data_files: trials/all_trials_local4.csv
---

# DEFER: the judgment-boundary dataset

Data for *Where Rules End and Judges Begin: Measuring the Judgment Boundary in
Multi-Agent Systems Security* ([arXiv:2610.07657](https://arxiv.org/abs/2610.07657)).
Code: [github.com/shaswata09/DEFER](https://github.com/shaswata09/DEFER).

The paper asks how much of the decision to allow an LLM agent's action can be
made by deterministic checks and how much needs an LLM judge. DEFER is a
cascade of 28 checks over five principles (authorized interface, capability
scoping, verified execution, memory integrity, access-controlled isolation)
that denies what it can deterministically and defers the remainder to a panel
of four open-weight judges. This dataset holds the attack and benign suites it
was measured on, the outcome of every trial, the raw logs, and every judge vote.

## Contents

| Config / path | Rows | What it is |
|---|---|---|
| `attacks` | {n_att} | Attack variants in four domains (CyberOps, healthcare, finance, legal): 15 attack paths × 5 variants per domain (AP-4 seven, AP-15 three) = 300 reported variants, plus the 24 rule-evading siblings (`set = sibling`) |
| `benign` | {n_ben} | Benign scenarios (20 CyberOps, 5 per other domain) using the same tools, stores and consequential actions |
| `reported_attack_trials` | {n_at} | Outcome and first interceptor of every reported attack trial: the four-domain boundary, the leave-one-out arms and two further primaries |
| `reported_benign_trials` | {n_bt} | Tool proposals and denials of every reported benign incident |
| `all_trials`, `all_trials_local4` | | Every trial of every run group as run, and with judged configurations re-adjudicated under Local4 (includes superseded and diagnostic runs; select groups by the `group` column) |
| `results/` | | The summary files the paper's tables are generated into (`reported_boundary.json` is the main table) |
| `cache/validators/` | | Every judge's vote on every logged panel input, keyed by message hash |
| `cache/replay*/` | | The logged panel inputs (`messages.jsonl`) and the rounds that use them (`rounds.jsonl`) |
| `logs/` | | Raw per-trial JSON Lines event logs: each proposal with its arguments before any check ran, each decision, the deciding check and tier, per-check latency and tokens |

## Attack variants

Each row is one variant as the harness delivers it.

- `channel`: C1 task input, C2 tool response, C3 memory content, C4 handoff, C5 proposal justification.
- `attacker_tier`: T1 (content attacker) or T2 (compromised agent).
- `intent`: the attack description. This lives in a metadata block that no model sees.
- `incident`: the alert or request that starts the run. For C1 the adversarial text is in its `description`.
- `injection`: the content delivered through C2 to C5 (a forged tool response, planted records, a replaced handoff, or an appended proposal rationale).
- `canaries`: attacker-chosen values that the harmful action must carry.
- `success_criteria.effects`: what the oracle scores as success.
- `payload`: the complete original JSON.

The payloads are prompt-injection strings, poisoned records and forged tool
responses aimed at a stub environment. They contain no working exploit against
any real product, and comparable material is already public in the benchmarks
the suite builds on (ASB, InjecAgent).

## Reported trials

`config` takes one of five values:

- Flat: no checks.
- ACL: connectivity limits only.
- NoJudge: every rule; anything undecided is escalated.
- DEFER: rules first, judges last.
- JudgeOnly: the panel judges every proposal.

`run` takes one of these values:

- `boundary`: the four domains, with Qwen3-235B as the primary.
- `minus_P1` … `minus_P5`: CyberOps, DEFER with one principle removed.
- `gpt-oss-120b` and `Llama-3.1-8B`: CyberOps, with that model as the primary.

JudgeOnly and DEFER outcomes are the direct outcome under the Local4 panel
(Mistral-Small-3.2-24B, Gemma-4-31B-it, gpt-oss-120b and Llama-4-Scout; 3 of 4
must approve), re-adjudicated from the logged inputs. The other configurations
are as run. `outcome` is `not_attempted`, `blocked` or `executed`. `tier` is the
tier of the first interceptor: `content_independent`, `content_dependent`,
`similarity` or `panel`.

Attack success is the share of `executed` trials. Pooled over `run == boundary`,
it is 34.6% under Flat and 6.1% under DEFER, as in the paper.

```python
from datasets import load_dataset
t = load_dataset("{{repo}}", "reported_attack_trials", split="train").to_pandas()
b = t[t.run == "boundary"]
print(b.groupby(["domain", "config"]).outcome.apply(lambda s: round(100 * (s == "executed").mean(), 1)))
```

## Citation

```bibtex
@article{{mitra2026rules,
  title   = {{Where Rules End and Judges Begin: Measuring the Judgment Boundary in Multi-Agent Systems Security}},
  author  = {{Mitra, Shaswata and Patel, Raj and Neupane, Subash and Mittal, Sudip and Rahman, Md Rayhanur and Rahimi, Shahram}},
  journal = {{arXiv preprint arXiv:2610.07657}},
  year    = {{2026}}
}}
```
"""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--push", metavar="REPO", help="<user>/<name> on the Hub")
    ap.add_argument("--private", action="store_true")
    ap.add_argument("--no-raw", action="store_true", help="skip logs/ and cache/")
    args = ap.parse_args()
    if OUT.exists():
        shutil.rmtree(OUT)
    n_att, n_ben = suites()
    n_at, n_bt = trials()
    results()
    card(n_att, n_ben, n_at, n_bt)
    if args.push:
        (OUT / "README.md").write_text((OUT / "README.md").read_text().replace("{repo}", args.push))
    print(f"staged {OUT}: {n_att} attacks, {n_ben} benign, {n_at} attack trials, {n_bt} benign trials")
    if args.push:
        push(args.push, args.private, not args.no_raw)


if __name__ == "__main__":
    main()
