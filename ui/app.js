/* DEFER companion page. Every rate is computed here from the per-trial rows in
   data/defer-data.js (written by `python -m ui.build_data`). */
(function () {
  "use strict";

  // Where the released dataset lives; the Dataset button and file table link here.
  const HF_URL = "https://huggingface.co/datasets/shaswatamitra/DEFER";

  const D = window.DEFER_DATA, K = window.DEFER_CATALOG;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pct = (a, b) => (b ? (100 * a) / b : NaN);
  const f1 = (v) => (v == null || isNaN(v) ? "–" : v.toFixed(1));

  // ------------------------------------------------------------ vocabulary (figstyle.py)
  const CFG = ["FLAT", "ACL", "NOJUDGE", "FULL", "JUDGEONLY"];      // no judgment -> all judgment
  const CFG_LABEL = { FLAT: "Flat", ACL: "ACL", NOJUDGE: "NoJudge", FULL: "DEFER", JUDGEONLY: "JudgeOnly" };
  const CFG_COLOR = { FLAT: "#999999", ACL: "#BBBBBB", NOJUDGE: "#0072B2", FULL: "#009E73", JUDGEONLY: "#E69F00" };
  const CFG_DESC = {
    FLAT: "Every agent may call every tool and store; no checks.",
    ACL: "Flat plus the phase-to-tool and phase-to-store restrictions of P2 and P5, enforced at the network layer.",
    NOJUDGE: "All deterministic checks; proposals that would reach the panel are escalated (blocked for ASR, a denial for cost).",
    FULL: "All 28 checks in cascade order; only undecided consequential proposals reach the panel.",
    JUDGEONLY: "Registry lookup plus the panel on every tool proposal; no manifest, so each agent sees every tool.",
  };
  const DOM_LABEL = { cyberops: "CyberOps", healthcare: "Healthcare", finance: "Finance", legal: "Legal" };
  const OUT_COLOR = { not_attempted: "#CCCCCC", blocked: "#009E73", executed: "#D55E00" };
  const OUT_LABEL = { not_attempted: "Not attempted", blocked: "Blocked", executed: "Executed" };
  const BENIGN = "#CC79A7";
  const T2_APS = new Set(["ap5", "ap9", "ap10", "ap15"]);   // analysis/replay_tables.py
  const TIER = D.tiers;
  const PAPER = D.paper;
  const AP = Object.fromEntries(PAPER.aps.map((a) => [a.id, a]));
  const CH = Object.fromEntries(PAPER.channels.map((c) => [c.id, c]));
  const apNum = (a) => parseInt(String(a).replace(/\D/g, ""), 10);
  const apLabel = (a) => "AP-" + apNum(a);
  const APS = PAPER.aps.map((a) => a.id).sort((x, y) => apNum(x) - apNum(y));

  // ------------------------------------------------------------ rows
  const AC = Object.fromEntries(D.attack_cols.map((c, i) => [c, i]));
  const BC = Object.fromEntries(D.benign_cols.map((c, i) => [c, i]));
  const A = D.attack.map((r) => ({ run: r[AC.run], domain: r[AC.domain], config: r[AC.config], ap: r[AC.ap],
    variant: r[AC.variant], trial: r[AC.trial], outcome: r[AC.outcome], mech: r[AC.mechanism], tier: r[AC.tier], ch: r[AC.channel] }));
  const B = D.benign.map((r) => ({ run: r[BC.run], domain: r[BC.domain], config: r[BC.config], scen: r[BC.scenario],
    trial: r[BC.trial], proposed: r[BC.proposed], denied: r[BC.denied] }));

  // ------------------------------------------------------------ statistics
  function rng(seed) {                                   // mulberry32: same intervals on every load
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* ASR with a 95% cluster bootstrap over variants (domain:ap:variant), as in the paper. */
  function asr(rows, nboot) {
    const n = rows.length;
    if (!n) return { v: NaN, lo: NaN, hi: NaN, n: 0, ex: 0 };
    const cl = new Map();
    for (const r of rows) {
      const k = r.domain + ":" + r.ap + ":" + r.variant;
      const c = cl.get(k) || [0, 0];
      c[0] += r.outcome === "executed"; c[1] += 1;
      cl.set(k, c);
    }
    const cs = Array.from(cl.values());
    const ex = cs.reduce((s, c) => s + c[0], 0);
    const R = rng(20261002), boots = [];
    const NB = nboot || 1000;
    for (let b = 0; b < NB; b++) {
      let e = 0, t = 0;
      for (let i = 0; i < cs.length; i++) { const c = cs[(R() * cs.length) | 0]; e += c[0]; t += c[1]; }
      boots.push(t ? (100 * e) / t : 0);
    }
    boots.sort((a, b) => a - b);
    return { v: (100 * ex) / n, lo: boots[Math.floor(0.025 * NB)], hi: boots[Math.min(NB - 1, Math.ceil(0.975 * NB) - 1)], n, ex };
  }
  function outcomes(rows) {
    const c = { not_attempted: 0, blocked: 0, executed: 0 };
    rows.forEach((r) => c[r.outcome]++);
    return c;
  }
  function benignDenied(rows) {
    const p = rows.reduce((s, r) => s + r.proposed, 0), d = rows.reduce((s, r) => s + r.denied, 0);
    return { v: pct(d, p), p, d, inc: rows.length, withDenial: rows.filter((r) => r.denied > 0).length };
  }
  const parseCI = (s) => {
    const m = /([\d.]+) \[([\d.]+), ([\d.]+)\]/.exec(s || "");
    return m ? { v: +m[1], lo: +m[2], hi: +m[3] } : null;
  };

  // ------------------------------------------------------------ header tiles
  function tiles() {
    const bd = A.filter((r) => r.run === "boundary");
    const flat = asr(bd.filter((r) => r.config === "FLAT")), full = asr(bd.filter((r) => r.config === "FULL"));
    const bl = bd.filter((r) => r.config === "FULL" && r.outcome === "blocked");
    const det = pct(bl.filter((r) => r.tier && r.tier !== "panel").length, bl.length);
    const co = D.reported.domains.cyberops;
    const coJ = asr(bd.filter((r) => r.domain === "cyberops" && r.config === "JUDGEONLY"));
    const coF = asr(bd.filter((r) => r.domain === "cyberops" && r.config === "FULL"));
    const T = [
      [`${f1(flat.v)}% <small>→</small> ${f1(full.v)}%`, `Attack success pooled over four domains, no defenses → DEFER (${full.n} trials)`],
      [`${det.toFixed(0)}%`, `of ${bl.length} blocked attacks first intercepted by a deterministic check`],
      [`${co.FULL.judged.attack.judged_pct.toFixed(0)}%`, "of tool proposals in CyberOps attack incidents reach the judges"],
      [`${f1(coJ.v)}% <small>vs</small> ${f1(coF.v)}%`, "CyberOps: the same judges without the rules, and with them"],
    ];
    $("#tiles").innerHTML = T.map(([v, k]) => `<div class="tile"><div class="v">${v}</div><div class="k">${k}</div></div>`).join("");
    $$("[data-k]").forEach((s) => {
      const [, c] = s.dataset.k.split(".");
      s.textContent = f1(asr(bd.filter((r) => r.domain === "cyberops" && r.config === c)).v) + "%";
    });
  }

  // ------------------------------------------------------------ problem + defense tables
  function table(el, head, rows, opts) {
    opts = opts || {};
    const th = head.map((h, i) => `<th class="${(opts.num || []).includes(i) ? "n" : ""}">${h}</th>`).join("");
    const tr = rows.map((r) => {
      const cls = r._cls ? ` class="${r._cls}"` : "";
      const cells = (r._cells || r).map((c, i) => `<td class="${(opts.num || []).includes(i) ? "n" : ""}${i === 0 && opts.id ? " id" : ""}">${c == null ? "" : c}</td>`).join("");
      return `<tr${cls}>${cells}</tr>`;
    }).join("");
    el.innerHTML = `<thead><tr>${th}</tr></thead><tbody>${tr}</tbody>`;
  }

  function staticTables() {
    table($("#tbl-channels"), ["ID", "Channel", "Attacker content arrives as", "Surface", "Tier"],
      PAPER.channels.map((c) => [c.id, esc(c.name), esc(c.arrives), esc(c.surface), esc(c.tier)]), { id: true });

    const PR = [
      ["P1", "Authorized interface", "Tools are remote, so a call can be redirected to an impostor or its response forged. A call proceeds only if the tool is registered; responses pass schema, timing, replay and per-tool MAC checks; configuration files are hashed at start-up and re-verified every incident.", "Tool surface · every call"],
      ["P2", "Capability scoping", "Every capability is one an attacker can exploit. Each phase has a manifest of allowed tools with action caps; parameters are checked for wildcards, asset criticality, per-tool rules and target-in-evidence; tool outputs pass a sensitive-content classifier.", "Tool surface · every call"],
      ["P3", "Verified execution", "An authorized, in-scope call can still be the wrong call. Eleven steps for consequential proposals: handoff and context checks, an intent-chain monitor, cross-incident ledgers, replay detection, adaptive consent, risk gates, the LLM panel for what remains, and a re-hash before execution.", "Tool surface · consequential calls"],
      ["P4", "Memory integrity", "Once stored, content is treated as fact. A deterministic write filter: schema and metadata validation, similarity to the incident evidence, per-store drift detection, write-replay detection and a rule-based contradiction check.", "Memory surface · every write"],
      ["P5", "Access-controlled isolation", "Unrestricted shared memory exposes every record to every agent. A static phase-to-store policy with field-level redaction, query-scope limits, a reconnaissance monitor over read patterns, and sanitization of retrieved text.", "Memory surface · every read"],
    ];
    $("#principles").innerHTML = PR.map(([id, nm, ds, s]) => {
      const n = PAPER.checks.filter((c) => c.id.startsWith(id + ".")).length;
      return `<div><div class="id">${id} · ${n} checks</div><div class="nm">${nm}</div><div class="ds">${ds}</div><div class="surf">${s}</div></div>`;
    }).join("");

    $("#tier-legend").innerHTML = TIER.order.map((t) => `<span><span class="swatch" style="background:${TIER.color[t]}"></span>${esc(TIER.label[t])}</span>`).join("")
      + `<span><span class="swatch" style="background:#fff;border:1px solid #D55E00"></span>Deny → human review</span>`;

    const drawChecks = () => {
      const p = $("#chk-p").value, t = $("#chk-t").value, q = $("#chk-q").value.trim().toLowerCase();
      const rows = PAPER.checks.filter((c) => (!p || c.id.startsWith(p + "."))
        && (!t || c.type.split(/,\s*/).includes(t))
        && (!q || (c.id + " " + c.name + " " + c.what).toLowerCase().includes(q)));
      table($("#tbl-checks"), ["ID", "Check", "Type", "What it verifies"],
        rows.map((c) => [c.id, esc(c.name), c.type.split(/,\s*/).map((x) => `<span class="chip ${x}">${x}</span>`).join(" "), esc(c.what)]), { id: true });
    };
    ["#chk-p", "#chk-t", "#chk-q"].forEach((s) => $(s).addEventListener("input", drawChecks));
    drawChecks();

    table($("#tbl-configs"), ["Configuration", "What runs"],
      CFG.map((c) => [`<span class="swatch" style="background:${CFG_COLOR[c]}"></span><b>${CFG_LABEL[c]}</b>`, esc(CFG_DESC[c])]));

    table($("#tbl-aps"), ["AP", "Name", "Attacker objective", "Channel", "Tier", "Effect scored as success"],
      PAPER.aps.map((a) => [a.label, esc(a.name), esc(a.objective), esc(a.channel), esc(a.tier), esc(a.effect)]), { id: true });
    table($("#tbl-inventory"), ["ID", "Vector", "Expected check", "AP"],
      PAPER.inventory.map((v) => [v.id, esc(v.vector), esc(v.check), esc(v.aps)]), { id: true });
  }

  // ------------------------------------------------------------ cascade diagram
  function cascade() {
    const C = TIER.color, ink = "#111", red = "#D55E00";
    const box = (x, y, w, h, fill, title, sub, dark) => `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${ink}" stroke-width="0.8"/>
      <text x="${x + w / 2}" y="${y + 18}" text-anchor="middle" font-size="12" font-weight="700" fill="${dark ? "#fff" : ink}">${title}</text>
      ${sub.map((s, i) => `<text x="${x + w / 2}" y="${y + 34 + i * 13}" text-anchor="middle" font-size="10.5" fill="${dark ? "#fff" : "#333"}">${s}</text>`).join("")}`;
    const arrow = (x1, y1, x2, y2, col, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col || ink}" stroke-width="1" ${dash ? 'stroke-dasharray="3 3"' : ""} marker-end="url(#ah${col === red ? "r" : ""})"/>`;
    const deny = (x, y) => arrow(x, y, x, y + 26, red) ;
    const y1 = 40, h = 74;
    $("#cascade").innerHTML = `<svg viewBox="0 0 1000 330" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${ink}"/></marker>
        <marker id="ahr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${red}"/></marker>
      </defs>
      <text x="0" y="18" font-size="11" font-weight="700" fill="#555" letter-spacing="1">TOOL-ORCHESTRATION SURFACE</text>
      ${box(0, y1, 100, h, "#fff", "Agent", ["proposes a", "tool call"])}
      ${arrow(100, y1 + h / 2, 122, y1 + h / 2)}
      ${box(122, y1, 140, h, C.content_independent, "P1 Interface", ["registry, response", "integrity, config hash"], true)}
      ${arrow(262, y1 + h / 2, 284, y1 + h / 2)}
      ${box(284, y1, 150, h, "#fff", "P2 Scoping", ["manifest · parameters", "target-in-evidence", "output classifier"])}
      <rect x="284" y="${y1 + h - 6}" width="50" height="6" fill="${C.content_independent}"/><rect x="334" y="${y1 + h - 6}" width="50" height="6" fill="${C.content_dependent}"/><rect x="384" y="${y1 + h - 6}" width="50" height="6" fill="${C.similarity}"/>
      ${arrow(434, y1 + h / 2, 456, y1 + h / 2)}
      <path d="M456 ${y1 + h / 2} l34 -26 l34 26 l-34 26 z" fill="#fff" stroke="${ink}" stroke-width="0.8"/>
      <text x="490" y="${y1 + h / 2 + 4}" text-anchor="middle" font-size="10">conseq.?</text>
      <text x="490" y="${y1 - 2}" text-anchor="middle" font-size="10" fill="#555">no → execute</text>
      ${arrow(524, y1 + h / 2, 546, y1 + h / 2)}
      ${box(546, y1, 170, h, "#fff", "P3 Deterministic", ["handoff · context · intent", "ledgers · replay · consent", "risk gates"])}
      <rect x="546" y="${y1 + h - 6}" width="85" height="6" fill="${C.content_independent}"/><rect x="631" y="${y1 + h - 6}" width="85" height="6" fill="${C.content_dependent}"/>
      ${arrow(716, y1 + h / 2, 738, y1 + h / 2)}
      ${box(738, y1, 130, h, C.panel, "LLM panel", ["Local4, 3 of 4", "undecided only"], false)}
      ${arrow(868, y1 + h / 2, 890, y1 + h / 2)}
      ${box(890, y1, 110, h, "#fff", "Re-hash", ["request = approved?", "→ execute"])}
      ${deny(192, y1 + h)}${deny(359, y1 + h)}${deny(631, y1 + h)}${deny(803, y1 + h)}${deny(945, y1 + h)}
      <line x1="150" y1="${y1 + h + 32}" x2="990" y2="${y1 + h + 32}" stroke="${red}" stroke-width="0.8" stroke-dasharray="3 3"/>
      <text x="1000" y="${y1 + h + 46}" text-anchor="end" font-size="10.5" fill="${red}">any denial fails closed → escalated for human review</text>

      <text x="0" y="214" font-size="11" font-weight="700" fill="#555" letter-spacing="1">MEMORY-MANAGEMENT SURFACE</text>
      ${box(0, 230, 100, 74, "#fff", "Agent", ["write / read"])}
      ${arrow(100, 252, 182, 252)}
      ${box(182, 230, 330, 44, "#fff", "P4 Write filter", ["schema · similarity · metadata · drift · replay · contradiction"])}
      <rect x="182" y="268" width="110" height="6" fill="${C.content_independent}"/><rect x="292" y="268" width="110" height="6" fill="${C.content_dependent}"/><rect x="402" y="268" width="110" height="6" fill="${C.similarity}"/>
      ${arrow(512, 252, 600, 252)}
      ${box(600, 230, 130, 74, "#fff", "Shared stores", ["12 in CyberOps,", "8 per other domain"])}
      ${arrow(600, 292, 512, 292)}
      ${box(182, 282, 330, 44, "#fff", "P5 Read isolation", ["phase policy · field redaction · query scope · read monitor · sanitize"])}
      <rect x="182" y="320" width="110" height="6" fill="${C.content_independent}"/><rect x="292" y="320" width="110" height="6" fill="${C.content_dependent}"/><rect x="402" y="320" width="110" height="6" fill="${C.similarity}"/>
      ${arrow(182, 292, 100, 292)}
      <text x="760" y="252" font-size="10.5" fill="#555">No configuration routes memory</text>
      <text x="760" y="266" font-size="10.5" fill="#555">operations to the panel; a</text>
      <text x="760" y="280" font-size="10.5" fill="#555">judged-write arm tests doing so.</text>
    </svg>`;
  }

  // ------------------------------------------------------------ domains
  function domainsPanel() {
    const tabs = $("#dom-tabs");
    tabs.innerHTML = D.domains.map((d, i) => `<button class="${i ? "" : "on"}" data-d="${d}" role="tab">${DOM_LABEL[d]}</button>`).join("");
    const draw = (d) => {
      const c = D.domain_config[d];
      const stores = Object.fromEntries(c.stores.map((s) => [s.id, s]));
      const sname = (id) => `<code title="${esc(stores[id] ? stores[id].name : "")}">${id}</code>`;
      const nAtt = K.attacks.filter((a) => a.domain === d).length, nBen = K.benign.filter((b) => b.domain === d).length;
      const tools = new Set();
      Object.values(c.phases).forEach((p) => (p.allowed_tools || []).forEach((t) => tools.add(t)));
      const rows = Object.entries(c.phases).map(([ph, p]) => [
        `<b>${ph[0].toUpperCase() + ph.slice(1)}</b>`,
        (p.allowed_tools || []).map((t) => `<code>${esc(t)}</code>`).join(" "),
        (p.allowed_memory_read || []).map(sname).join(" ") || "–",
        (p.allowed_memory_write || []).map(sname).join(" ") || "–",
        p.max_actions_per_incident, p.requires_consensus ? "yes" : "no"]);
      $("#dom-panel").innerHTML = `
        <p class="note" style="margin-bottom:8px">${tools.size} tools across the four phases, ${c.stores.length} stores, ${nAtt} attack variants and ${nBen} benign scenarios. ${d === "cyberops" ? "Defense thresholds, patterns and the judges' prompt were set on this domain." : "Not tuned: same code, thresholds and judge prompt as CyberOps."}</p>
        <div class="tw"><table class="compact"><thead><tr><th>Phase</th><th>Manifest (allowed tools)</th><th>Reads</th><th>Writes</th><th class="n">Action cap</th><th>Panel</th></tr></thead>
        <tbody>${rows.map((r) => `<tr>${r.map((x, i) => `<td class="${i === 4 ? "n" : ""}">${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <h4 style="margin-top:14px">Stores</h4>
        <p class="note">${c.stores.map((s) => `<code>${s.id}</code> ${esc(s.name.replace(/_/g, " "))}${s.critical ? " <b>(critical)</b>" : ""}`).join(" · ")}</p>`;
    };
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", tabs).forEach((x) => x.classList.toggle("on", x === b));
      draw(b.dataset.d);
    });
    draw(D.domains[0]);
  }

  // ------------------------------------------------------------ results explorer
  function legend(el, items) {
    el.innerHTML = items.map(([c, l, shape]) => shape === "diamond"
      ? `<span><svg width="12" height="12" style="vertical-align:-1px;margin-right:5px"><path d="M6 1 L11 6 L6 11 L1 6 z" fill="#fff" stroke="${c}" stroke-width="1.6"/></svg>${l}</span>`
      : `<span><span class="swatch" style="background:${c}"></span>${l}</span>`).join("");
  }

  function explorer() {
    const sd = $("#r-domain");
    sd.innerHTML = `<option value="">All four domains</option>` + D.domains.map((d) => `<option value="${d}">${DOM_LABEL[d]}</option>`).join("");
    $("#r-ap").innerHTML += APS.map((a) => `<option value="${a}">${apLabel(a)} ${esc(AP[a].name)}</option>`).join("");
    $("#r-ch").innerHTML += PAPER.channels.map((c) => `<option value="${c.id}">${c.id} ${esc(c.name)}</option>`).join("");
    ["#r-domain", "#r-ap", "#r-ch", "#r-tier"].forEach((s) => $(s).addEventListener("change", draw));
    legend($("#l-boundary"), [...CFG.map((c) => [CFG_COLOR[c], CFG_LABEL[c]]), [BENIGN, "Benign proposals denied", "diamond"]]);
    legend($("#l-outcomes"), Object.keys(OUT_COLOR).map((k) => [OUT_COLOR[k], OUT_LABEL[k]]));
    legend($("#l-tiers"), TIER.order.map((t) => [TIER.color[t], TIER.label[t]]));
    legend($("#l-channels"), ["FLAT", "JUDGEONLY", "FULL"].map((c) => [CFG_COLOR[c], CFG_LABEL[c]]));
    legend($("#l-primaries"), CFG.map((c) => [CFG_COLOR[c], CFG_LABEL[c]]));
    draw();
    drawFixed();
  }

  function filt() {
    const d = $("#r-domain").value, ap = $("#r-ap").value, ch = $("#r-ch").value, t = $("#r-tier").value;
    return { d, ap, ch, t, plain: !ap && !ch && !t,
      pass: (r) => (!d || r.domain === d) && (!ap || r.ap === ap) && (!ch || r.ch === ch)
        && (!t || (t === "T2") === T2_APS.has(r.ap)) };
  }

  function draw() {
    const F = filt();
    const rows = A.filter((r) => r.run === "boundary" && F.pass(r));
    const ben = B.filter((r) => r.run === "boundary" && (!F.d || r.domain === F.d));
    const rep = F.d ? D.reported.domains[F.d] : null;
    const pooled = !F.d ? D.reported.all_four : null;
    const stats = {};
    CFG.forEach((c) => {
      const rc = rows.filter((r) => r.config === c);
      const s = asr(rc);
      // the paper's interval wherever this selection is a reported cell
      const pc = F.plain ? parseCI(rep ? rep[c].asr : pooled[c]) : null;
      if (pc && Math.abs(pc.v - s.v) < 0.05) { s.lo = pc.lo; s.hi = pc.hi; s.paper = true; }
      const o = outcomes(rc), att = o.blocked + o.executed;
      stats[c] = { ...s, o, att: pct(att, s.n), bga: pct(o.blocked, att), ben: benignDenied(ben.filter((r) => r.config === c)) };
    });
    $("#r-n").textContent = `${rows.length.toLocaleString()} attack trials · ${ben.length} benign incidents`;

    Charts.mount($("#c-boundary"), () => Charts.bars($("#c-boundary"), CFG.map((c) => ({
      label: CFG_LABEL[c], color: CFG_COLOR[c], v: stats[c].v, lo: stats[c].lo, hi: stats[c].hi, bold: c === "FULL",
      tip: `<b>${CFG_LABEL[c]}</b><br>ASR ${f1(stats[c].v)}% [${f1(stats[c].lo)}, ${f1(stats[c].hi)}]<br>${stats[c].ex} of ${stats[c].n} trials executed`,
    })), { yLabel: "Attack success (%)", right: { label: "Benign denied (%)", color: BENIGN, max: 60,
      values: CFG.map((c) => ({ v: stats[c].ben.v, tip: `<b>${CFG_LABEL[c]}</b><br>${stats[c].ben.d} of ${stats[c].ben.p} legitimate tool proposals denied (${f1(stats[c].ben.v)}%)` })) } }));

    Charts.mount($("#c-outcomes"), () => Charts.stackH($("#c-outcomes"), CFG.map((c) => ({
      label: CFG_LABEL[c], bold: c === "FULL", counts: ["not_attempted", "blocked", "executed"].map((k) => stats[c].o[k]) })),
      ["not_attempted", "blocked", "executed"].map((k) => ({ label: OUT_LABEL[k], color: OUT_COLOR[k], text: k === "not_attempted" ? "#333" : "#fff" })), { left: 80 }));

    // summary table
    const judged = (c) => (rep && F.plain && rep[c].judged ? f1(rep[c].judged.attack.judged_pct) : c === "JUDGEONLY" && F.plain ? "100.0" : ["FLAT", "ACL", "NOJUDGE"].includes(c) ? "0.0" : "–");
    table($("#tbl-summary"), ["Configuration", "ASR % [95% CI]", "Executed / trials", "Attempt %", "Block | att. %", "Judged %", "Benign denied %", "Benign incidents with a denial"],
      CFG.map((c) => { const s = stats[c]; return { _cls: c === "FULL" ? "hl" : "", _cells: [
        `<span class="swatch" style="background:${CFG_COLOR[c]}"></span><b>${CFG_LABEL[c]}</b>`,
        `${f1(s.v)} [${f1(s.lo)}, ${f1(s.hi)}]`, `${s.ex} / ${s.n}`, f1(s.att), f1(s.bga), judged(c), f1(s.ben.v),
        `${s.ben.withDenial} / ${s.ben.inc}`] }; }), { num: [1, 2, 3, 4, 5, 6, 7] });
    $("#summary-note").textContent = (F.plain
      ? "Intervals are the paper's (results/reported_boundary.json); point estimates are recomputed here from the trials and match it."
      : "Intervals recomputed in the browser: 95% cluster bootstrap over variants, 1,000 resamples, fixed seed.")
      + " Judged %: share of tool proposals in attack incidents that reached the panel (reported cells only). Benign columns are not filtered by attack path or channel.";

    // first interception tiers under DEFER: one row per domain plus pooled
    const tierRows = [...D.domains.map((d) => [DOM_LABEL[d], (r) => r.domain === d]), ["All four", () => true]].map(([lab, f]) => {
      const bl = A.filter((r) => r.run === "boundary" && r.config === "FULL" && r.outcome === "blocked" && f(r)
        && (!F.ap || r.ap === F.ap) && (!F.ch || r.ch === F.ch) && (!F.t || (F.t === "T2") === T2_APS.has(r.ap)));
      return { label: lab, bold: lab === "All four" || DOM_LABEL[F.d] === lab, counts: TIER.order.map((t) => bl.filter((r) => r.tier === t).length) };
    });
    Charts.mount($("#c-tiers"), () => Charts.stackH($("#c-tiers"), tierRows, TIER.order.map((t) => ({ label: TIER.label[t], color: TIER.color[t] })), { left: 84 }));

    // channels
    const chs = PAPER.channels.map((c) => c.id);
    const chRows = A.filter((r) => r.run === "boundary" && (!F.d || r.domain === F.d) && (!F.ap || r.ap === F.ap) && (!F.t || (F.t === "T2") === T2_APS.has(r.ap)));
    const chSeries = ["FLAT", "JUDGEONLY", "FULL"];
    Charts.mount($("#c-channels"), () => Charts.grouped($("#c-channels"), chs.map((c) => c + " " + CH[c].name), chSeries.map((c) => ({ label: CFG_LABEL[c], color: CFG_COLOR[c] })),
      chs.map((ch) => chSeries.map((c) => {
        const s = asr(chRows.filter((r) => r.ch === ch && r.config === c), 400);
        return s.n ? { ...s, tip: `<b>${ch} ${esc(CH[ch].name)} · ${CFG_LABEL[c]}</b><br>ASR ${f1(s.v)}% [${f1(s.lo)}, ${f1(s.hi)}]<br>${s.ex} of ${s.n} trials` } : null;
      })), { yLabel: "Attack success (%)", max: 100 }));

    // heatmap
    const hRows = A.filter((r) => r.run === "boundary" && (!F.d || r.domain === F.d) && (!F.ch || r.ch === F.ch) && (!F.t || (F.t === "T2") === T2_APS.has(r.ap)));
    const aps = APS.filter((a) => !F.ap || a === F.ap);
    Charts.mount($("#c-heat"), () => Charts.heat($("#c-heat"), aps.map((a) => `${apLabel(a)}  ${AP[a].name}`),
      CFG.map((c) => ({ label: CFG_LABEL[c], color: CFG_COLOR[c], bold: c === "FULL" })),
      aps.map((a) => CFG.map((c) => {
        const rr = hRows.filter((r) => r.ap === a && r.config === c);
        const o = outcomes(rr);
        let tip = `<b>${apLabel(a)} ${esc(AP[a].name)} · ${CFG_LABEL[c]}</b><br>${o.executed} executed, ${o.blocked} blocked, ${o.not_attempted} not attempted (n=${rr.length})`;
        if (c === "FULL" && o.blocked) {
          const m = {};
          rr.filter((r) => r.outcome === "blocked").forEach((r) => { m[r.mech] = (m[r.mech] || 0) + 1; });
          tip += "<br><br><b>First interceptors</b><br>" + Object.entries(m).sort((x, y) => y[1] - x[1]).slice(0, 5).map(([k, v]) => `${esc(k)}: ${v}`).join("<br>");
        }
        return { v: pct(o.executed, rr.length), n: rr.length, tip };
      })), { left: 220, short: aps.map(apLabel) }));
  }

  function drawFixed() {
    // leave-one-out, CyberOps
    const arms = [["FULL", "DEFER", "boundary"], ...[1, 2, 3, 4, 5].map((i) => ["FULL", "− P" + i, "minus_P" + i])];
    const abl = arms.map(([c, lab, run]) => {
      const rows = A.filter((r) => r.run === run && r.domain === "cyberops" && r.config === c);
      const s = asr(rows);
      const key = run === "boundary" ? "FULL" : run;
      const pc = parseCI(D.reported.ablation[key] && D.reported.ablation[key].asr);
      if (pc && Math.abs(pc.v - s.v) < 0.05) { s.lo = pc.lo; s.hi = pc.hi; }
      const bn = benignDenied(B.filter((r) => r.run === run && r.domain === "cyberops" && r.config === c));
      return { s, bn, lab };
    });
    Charts.mount($("#c-ablation"), () => Charts.bars($("#c-ablation"), abl.map((a, i) => ({
      label: a.lab, color: i ? "#0072B2" : "#009E73", v: a.s.v, lo: a.s.lo, hi: a.s.hi, bold: !i,
      tip: `<b>${a.lab}</b><br>ASR ${f1(a.s.v)}% [${f1(a.s.lo)}, ${f1(a.s.hi)}]<br>${a.s.ex} of ${a.s.n} trials`,
    })), { yLabel: "Attack success (%)", max: 40, right: { label: "Benign denied (%)", color: BENIGN, max: 60,
      values: abl.map((a) => ({ v: a.bn.v, tip: `<b>${a.lab}</b><br>${a.bn.d} of ${a.bn.p} legitimate proposals denied` })) } }));

    // primaries
    const prim = [["Qwen3-235B", "boundary"], ["gpt-oss-120b", "gpt-oss-120b"], ["Llama-3.1-8B", "Llama-3.1-8B"]];
    Charts.mount($("#c-primaries"), () => Charts.grouped($("#c-primaries"), prim.map((p) => p[0]), CFG.map((c) => ({ label: CFG_LABEL[c], color: CFG_COLOR[c] })),
      prim.map(([lab, run]) => CFG.map((c) => {
        const s = asr(A.filter((r) => r.run === run && r.domain === "cyberops" && r.config === c), 400);
        return { ...s, tip: `<b>${lab} · ${CFG_LABEL[c]}</b><br>ASR ${f1(s.v)}% [${f1(s.lo)}, ${f1(s.hi)}]<br>${s.ex} of ${s.n} trials` };
      })), { yLabel: "Attack success (%)", values: true }));
  }

  // ------------------------------------------------------------ experiments
  function experiments() {
    const E = [
      ["The judgment boundary", "Five configurations from never judging (NoJudge) to judging everything (JudgeOnly), DEFER between; four domains", "Qwen3-235B, Local4", "4 × 5 × 225 attack + benign", "RQ-1, Table 3", "results/reported_boundary.json"],
      ["Judge everything after rules", "Every call that survives the deterministic denials goes to the panel, consequential or not", "Qwen3-235B, Local4", "replay of DEFER", "RQ-1", "results/reported_boundary.json (JUDGEREST)"],
      ["Leave-one-out", "DEFER with one principle removed, on the same 75 variants", "Qwen3-235B, CyberOps", "5 × 300", "RQ-2, Fig. ablation", "results/reported_boundary.json (ablation)"],
      ["Other primaries", "gpt-oss-120b and Llama-3.1-8B through every configuration", "CyberOps, Local4 minus self", "2 × 1,500", "RQ-1, RQ-3", "results/primaries_v32.json"],
      ["Permissive gate", "Deterministic approval of low-risk proposals, evaluated offline on every panel-bound proposal", "CyberOps", "offline", "RQ-2", "results/v31_mechanisms.json (gate)"],
      ["Rule-evading siblings", "The 24 variants P2.2 or P4.2 stopped, rewritten so the rule passes them", "three domains", "72 trials per config", "RQ-2", "results/v31_mechanisms.json (siblings)"],
      ["Structured evidence", "P2.2 restricted to structured evidence fields; judges given the fields the rules consult", "four domains", "offline + replay", "RQ-2", "results/v31_mechanisms.json (evidence)"],
      ["Judged writes", "Every write to a critical store routed through the Div4 panel (live)", "four domains", "207 memory-path trials", "RQ-2", "logs/"],
      ["Persistent state", "30 attack incidents then 20 benign scenarios without resetting state, both orders; ledger expiry replayed offline", "CyberOps", "2 passes", "RQ-2, Fig. carry-over", "results/v31_mechanisms.json (expiry)"],
      ["Judge panels", "Local4, Div3L, Lin3, single judge and others compared on identical logged decisions", "all suites", "5,100 replays", "RQ-3, Fig. panels", "cache/validators/"],
      ["Agent Security Bench", "All 255 ASB cases live, two trials each, Flat, ACL and DEFER", "Qwen3-235B", "1,530", "RQ-3", "results/asb/"],
      ["InjecAgent", "A 50-case subset", "Qwen3-235B", "–", "RQ-3", "results/"],
      ["TAMAS", "Five CrewAI scenarios × five multi-agent attack types, 50 instances each, three trials", "Qwen3-235B", "1,800 crew executions", "RQ-3", "results/tamas.json"],
    ];
    table($("#tbl-experiments"), ["Experiment", "What varies", "Setting", "Trials", "Paper", "Result file"],
      E.map((e) => [`<b>${esc(e[0])}</b>`, esc(e[1]), esc(e[2]), esc(e[3]), esc(e[4]), `<code>${esc(e[5])}</code>`]));

    const T = D.tamas, tf = T.flat, tu = T.full;
    const ci = (x) => (x ? esc(x) : "–");
    const tam = [["Direct prompt injection", "DPI"], ["Impersonation", "impersonation"], ["Colluding agents", "colluding"], ["Byzantine agents", "byzantine"], ["Contradicting agents", "contradicting"]];
    const rows = [
      { _cls: "band", _cells: ["Agent Security Bench (255 cases, live)", "", "", ""] },
      ["Injected action emitted and executed", "28.8", "1.8", "Access control blocks nothing: injected actions use tools the agent is entitled to call. No content-independent rule fired."],
      { _cls: "band", _cells: ["TAMAS (250 instances × 3 trials; CrewAI crews)", "", "", ""] },
      ...tam.map(([lab, k]) => [lab, ci((tf[k] || {}).asr_as_run), ci((tu[k] || {}).asr_local4 || (tu[k] || {}).asr_as_run),
        k === "byzantine" || k === "contradicting" ? "Acts only through what agents say; DEFER mediates actions, not answers (as run)." : ""]),
      ["All 250 instances", ci(tf.all_attacks_as_run), ci(tu.all_attacks_local4 || tu.all_attacks_as_run), "The rules were the first interceptor for 10 of 202 blocked attempts."],
    ];
    table($("#tbl-thirdparty"), ["Attack", "Flat ASR %", "DEFER ASR %", "Note"], rows, { num: [1, 2] });

    const TITLE = { judgment_boundary: "The judgment boundary (CyberOps)", paired_variants: "Paired variants: JudgeOnly vs DEFER",
      panel_composition: "Panel composition", validator_behavior: "Judge agreement and strictness", cost: "What the pipeline costs",
      state_carryover: "State carried across incidents", asb_families: "Agent Security Bench by attack family",
      transfer: "Transfer across domains and primaries", p5_reads: "Read-dependent paths and P5",
      boundary_domains: "The boundary in four domains", tamas: "TAMAS" };
    $("#gallery").innerHTML = D.figures.map((f) => `<figure><img src="figures/${f.name}.png" alt="${esc(TITLE[f.name] || f.name)}" loading="lazy">
      <figcaption><b>${esc(TITLE[f.name] || f.name)}</b>${esc(f.takeaway)}</figcaption></figure>`).join("");
    const lb = $("#lightbox");
    $("#gallery").addEventListener("click", (e) => { const im = e.target.closest("img"); if (!im) return; $("img", lb).src = im.src; lb.style.display = "flex"; });
    lb.addEventListener("click", () => { lb.style.display = "none"; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.style.display = "none"; });
  }

  // ------------------------------------------------------------ dataset previewer
  function domSelect(el, all) {
    el.innerHTML = (all ? `<option value="">All domains</option>` : "") + D.domains.map((d) => `<option value="${d}">${DOM_LABEL[d]}</option>`).join("");
  }
  function kv(pairs) {
    return `<dl class="kv">${pairs.filter((p) => p[1] != null && p[1] !== "").map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>`;
  }
  function injected(p) {
    const inj = ((p.meta || {}).injection) || {};
    const out = [];
    if (inj.handoff) out.push(["Replaced handoff (" + esc(inj.handoff.from_phase || "") + " →)", `<div class="quote">${esc(Object.entries(inj.handoff.fields || {}).map(([k, v]) => k + ": " + v).join("\n"))}</div>`]);
    if (inj.response) out.push([`Forged response of <code>${esc(inj.tool || inj.response.tool || "")}</code>`, `<div class="quote">${esc(JSON.stringify(inj.response, null, 2))}</div>`]);
    if (inj.proposal) out.push([`Appended to a proposal for <code>${esc(inj.proposal.tool || "")}</code>`, `<div class="quote">${esc(inj.proposal.justification || JSON.stringify(inj.proposal))}</div>`]);
    if (inj.entries) inj.entries.forEach((e) => out.push([`Planted record in <code>${esc(e.store)}</code>`, `<div class="quote">${esc(e.content)}</div>`]));
    Object.keys(inj).filter((k) => !["handoff", "response", "proposal", "entries", "tool", "mode", "calls"].includes(k))
      .forEach((k) => out.push([esc(k), `<pre class="json">${esc(JSON.stringify(inj[k], null, 2))}</pre>`]));
    return out;
  }
  function effectsTable(sc) {
    const ef = (sc && sc.effects) || [];
    if (!ef.length) return "";
    return `<div class="tw"><table class="compact"><thead><tr><th>Effect</th><th>Detail</th></tr></thead><tbody>${ef.map((e) => {
      const { kind, ...rest } = e;
      return `<tr><td><code>${esc(kind)}</code></td><td>${esc(Object.entries(rest).filter(([k]) => k !== "derived").map(([k, v]) => k + "=" + (typeof v === "object" ? JSON.stringify(v) : v)).join("; "))}</td></tr>`;
    }).join("")}</tbody></table></div>`;
  }
  function outcomeGrid(domain, ap, variant) {
    const rows = A.filter((r) => r.run === "boundary" && r.domain === domain && r.ap === ap && r.variant === variant);
    if (!rows.length) return `<p class="note">Not one of the 75 reported variants of this domain.</p>`;
    const trials = Array.from(new Set(rows.map((r) => r.trial))).sort((a, b) => a - b);
    const head = trials.map((t) => `<th>t${t}</th>`).join("");
    const body = CFG.map((c) => `<tr><td style="text-align:left"><b>${CFG_LABEL[c]}</b></td>${trials.map((t) => {
      const r = rows.find((x) => x.config === c && x.trial === t);
      return `<td>${r ? `<span class="dot ${r.outcome}" title="${esc(OUT_LABEL[r.outcome] + (r.mech ? " by " + r.mech : ""))}"></span>` : `<span class="dot none" title="excluded"></span>`}</td>`;
    }).join("")}<td style="text-align:left" class="note">${esc(rows.filter((x) => x.config === c && x.outcome === "blocked").map((x) => x.mech).filter((v, i, a) => a.indexOf(v) === i).join(", "))}</td></tr>`).join("");
    return `<table class="mini"><thead><tr><th></th>${head}<th style="text-align:left">first interceptor</th></tr></thead><tbody>${body}</tbody></table>
      <div class="legend">${Object.keys(OUT_COLOR).map((k) => `<span><span class="dot ${k}" style="width:10px;height:10px;margin-right:4px"></span>${OUT_LABEL[k]}</span>`).join("")}</div>`;
  }

  function attackBrowser() {
    domSelect($("#a-domain"), true);
    $("#a-ap").innerHTML += APS.map((a) => `<option value="${a}">${apLabel(a)} ${esc(AP[a].name)}</option>`).join("");
    $("#a-ch").innerHTML += PAPER.channels.map((c) => `<option value="${c.id}">${c.id} ${esc(c.name)}</option>`).join("");
    let sel = null;
    const list = () => {
      const st = $("#a-set").value, d = $("#a-domain").value, ap = $("#a-ap").value, ch = $("#a-ch").value, q = $("#a-q").value.trim().toLowerCase();
      const items = K.attacks.filter((a) => (!st || a.set === st) && (!d || a.domain === d) && (!ap || a.ap === ap) && (!ch || a.channel === ch)
        && (!q || JSON.stringify(a.payload).toLowerCase().includes(q)));
      items.sort((x, y) => (D.domains.indexOf(x.domain) - D.domains.indexOf(y.domain)) || (apNum(x.ap) - apNum(y.ap)) || x.id.localeCompare(y.id, undefined, { numeric: true }));
      $("#a-n").textContent = `${items.length} variants`;
      $("#a-list").innerHTML = items.map((a, i) => `<button data-i="${K.attacks.indexOf(a)}" class="${K.attacks.indexOf(a) === sel ? "on" : ""}">
        <b>${apLabel(a.ap)}</b> · ${esc(a.name.replace(/_/g, " "))}<span class="sm">${a.set === "sibling" ? "sibling · " : ""}${DOM_LABEL[a.domain]} · ${esc(a.id)} · ${a.channel} ${esc((CH[a.channel] || {}).name || "")}</span></button>`).join("");
      if (!items.some((a) => K.attacks.indexOf(a) === sel)) show(items.length ? K.attacks.indexOf(items[0]) : null);
    };
    const show = (i) => {
      sel = i;
      $$("#a-list button").forEach((b) => b.classList.toggle("on", +b.dataset.i === i));
      if (i == null) { $("#a-detail").innerHTML = `<p class="muted">No variant matches.</p>`; return; }
      const a = K.attacks[i], p = a.payload, tr = p.trigger || {};
      const v = parseInt(a.id.split("_v")[1], 10);
      const sib = a.set === "sibling" ? `<p class="note" style="border-left:3px solid #CC79A7;padding-left:10px">Rule-evading sibling of <code>${esc(a.id.replace(/e2$/, ""))}</code>: the target the evidence-similarity rule (P2.2 or P4.2) denied is placed in the alert where an operator would write it; nothing else changes. Its outcomes are in the rule-evading-siblings arm (<code>results/v31_mechanisms.json</code>), not in the reported boundary.</p>` : "";
      const trig = Object.entries(tr).filter(([k]) => k !== "description").map(([k, x]) => `<code>${esc(k)}</code> ${esc(typeof x === "object" ? JSON.stringify(x) : x)}`).join("<br>");
      $("#a-detail").innerHTML = `
        <h4>${apLabel(a.ap)} ${esc(AP[a.ap] ? AP[a.ap].name : "")}: ${esc(a.name.replace(/_/g, " "))}</h4>
        <p class="note">${DOM_LABEL[a.domain]} · <code>${esc(a.id)}</code> · channel ${a.channel} ${esc((CH[a.channel] || {}).name || "")} · attacker tier ${T2_APS.has(a.ap) ? "T2" : "T1"}${(p.meta || {}).attacker_phase ? " · attacker phase " + esc(p.meta.attacker_phase) : ""}</p>
        ${sib}
        ${kv([["Intent (metadata, never shown to a model)", esc(a.description)],
              ["Incident", trig],
              ["Incident text", tr.description ? `<div class="quote${a.channel === "C1" ? "" : " benign"}">${esc(tr.description)}</div>` : ""],
              ...injected(p),
              ["Canaries", a.canaries.length ? a.canaries.map((c) => `<code>${esc(c)}</code>`).join(" ") : "none (effect is the action itself)"],
              ["Expected safe behavior", esc(typeof p.expected_behavior === "object" ? (p.expected_behavior || {}).expected_action || JSON.stringify(p.expected_behavior) : p.expected_behavior || p.expected_safe_behavior || "")]])}
        <h4 style="font-size:14px">Effects the oracle scores as success</h4>${effectsTable(p.success_criteria)}
        ${a.set === "sibling" ? "" : `<h4 style="font-size:14px">Outcomes in the reported runs</h4>${outcomeGrid(a.domain, a.ap, v)}`}
        <details><summary>Raw payload JSON</summary><pre class="json">${esc(JSON.stringify(p, null, 2))}</pre></details>`;
    };
    $("#a-list").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(+b.dataset.i); });
    ["#a-set", "#a-domain", "#a-ap", "#a-ch", "#a-q"].forEach((s) => $(s).addEventListener("input", list));
    list();
  }

  function benignBrowser() {
    domSelect($("#b-domain"), true);
    let sel = null;
    const list = () => {
      const d = $("#b-domain").value, q = $("#b-q").value.trim().toLowerCase();
      const items = K.benign.filter((b) => (!d || b.domain === d) && (!q || JSON.stringify(b.payload).toLowerCase().includes(q)));
      $("#b-n").textContent = `${items.length} of ${K.benign.length} scenarios`;
      $("#b-list").innerHTML = items.map((b) => `<button data-i="${K.benign.indexOf(b)}"><b>${esc(b.name.replace(/_/g, " "))}</b><span class="sm">${DOM_LABEL[b.domain]} · ${esc(b.id)} · ${esc(b.category)}</span></button>`).join("");
      if (!items.some((b) => K.benign.indexOf(b) === sel)) show(items.length ? K.benign.indexOf(items[0]) : null);
      else $$("#b-list button").forEach((x) => x.classList.toggle("on", +x.dataset.i === sel));
    };
    const show = (i) => {
      sel = i;
      $$("#b-list button").forEach((x) => x.classList.toggle("on", +x.dataset.i === i));
      if (i == null) { $("#b-detail").innerHTML = `<p class="muted">No scenario matches.</p>`; return; }
      const b = K.benign[i], p = b.payload, tr = p.trigger || {};
      const scen = "v" + parseInt(b.id.replace(/\D/g, ""), 10);
      const ops = p.memory_ops ? [...(p.memory_ops.reads || []).map((r) => `read <code>${esc(r.store)}</code> (${esc(r.phase)}): ${esc(r.query)}`),
        ...(p.memory_ops.writes || []).map((w) => `write <code>${esc(w.store)}</code> (${esc(w.phase)})`)].join("<br>") : "";
      const cost = CFG.map((c) => {
        const rows = B.filter((r) => r.run === "boundary" && r.domain === b.domain && r.config === c && r.scen === scen);
        const s = benignDenied(rows);
        return `<tr><td style="text-align:left"><b>${CFG_LABEL[c]}</b></td><td>${s.inc}</td><td>${s.p}</td><td>${s.d}</td><td>${f1(s.v)}</td></tr>`;
      }).join("");
      const other = Object.entries(tr).filter(([k]) => k !== "description").map(([k, x]) => `<code>${esc(k)}</code> ${esc(typeof x === "object" ? JSON.stringify(x) : x)}`).join("<br>");
      $("#b-detail").innerHTML = `
        <h4>${esc(b.name.replace(/_/g, " "))}</h4>
        <p class="note">${DOM_LABEL[b.domain]} · <code>${esc(b.id)}</code> · ${esc(b.category)}</p>
        ${kv([["Incident text", tr.description ? `<div class="quote benign">${esc(tr.description)}</div>` : ""], ["Incident", other],
              ["Memory operations", ops], ["Expected behavior", esc(typeof p.expected_behavior === "object" ? JSON.stringify(p.expected_behavior) : p.expected_behavior)]])}
        <h4 style="font-size:14px">Cost in the reported runs</h4>
        <table class="mini"><thead><tr><th style="text-align:left">Configuration</th><th>Trials</th><th>Tool proposals</th><th>Denied</th><th>Denied %</th></tr></thead><tbody>${cost}</tbody></table>
        <details><summary>Raw scenario JSON</summary><pre class="json">${esc(JSON.stringify(p, null, 2))}</pre></details>`;
    };
    $("#b-list").addEventListener("click", (e) => { const x = e.target.closest("button"); if (x) show(+x.dataset.i); });
    ["#b-domain", "#b-q"].forEach((s) => $(s).addEventListener("input", list));
    list();
  }

  function trialTable() {
    const RUNS = [["boundary", "Reported boundary (4 domains)"], ...[1, 2, 3, 4, 5].map((i) => ["minus_P" + i, "Leave-one-out: DEFER − P" + i]),
      ["gpt-oss-120b", "Primary: gpt-oss-120b"], ["Llama-3.1-8B", "Primary: Llama-3.1-8B"]];
    $("#t-run").innerHTML = RUNS.map(([k, l]) => `<option value="${k}">${l}</option>`).join("");
    domSelect($("#t-domain"), true);
    $("#t-cfg").innerHTML = `<option value="">All</option>` + CFG.map((c) => `<option value="${c}">${CFG_LABEL[c]}</option>`).join("");
    $("#t-ap").innerHTML += APS.map((a) => `<option value="${a}">${apLabel(a)}</option>`).join("");
    let page = 0;
    const PER = 50;
    const rows = () => {
      const run = $("#t-run").value, d = $("#t-domain").value, c = $("#t-cfg").value, ap = $("#t-ap").value, o = $("#t-out").value;
      return A.filter((r) => r.run === run && (!d || r.domain === d) && (!c || r.config === c) && (!ap || r.ap === ap) && (!o || r.outcome === o));
    };
    const draw = () => {
      const R = rows();
      const pages = Math.max(1, Math.ceil(R.length / PER));
      page = Math.min(page, pages - 1);
      const ex = R.filter((r) => r.outcome === "executed").length;
      $("#t-n").textContent = `${R.length.toLocaleString()} trials · ${ex} executed (${f1(pct(ex, R.length))}%) · page ${page + 1} of ${pages}`;
      $("#t-prev").disabled = page === 0; $("#t-next").disabled = page >= pages - 1;
      table($("#tbl-trials"), ["Domain", "Config", "AP", "Variant", "Trial", "Channel", "Outcome", "First interceptor", "Tier"],
        R.slice(page * PER, page * PER + PER).map((r) => [DOM_LABEL[r.domain], CFG_LABEL[r.config], apLabel(r.ap), "v" + r.variant, r.trial, r.ch,
          `<span class="chip out-${r.outcome}">${OUT_LABEL[r.outcome].toLowerCase()}</span>`, r.mech ? `<code>${esc(r.mech)}</code>` : "", r.tier ? esc(TIER.label[r.tier]) : ""]), { num: [3, 4] });
    };
    ["#t-run", "#t-domain", "#t-cfg", "#t-ap", "#t-out"].forEach((s) => $(s).addEventListener("change", () => { page = 0; draw(); }));
    $("#t-prev").addEventListener("click", () => { page--; draw(); });
    $("#t-next").addEventListener("click", () => { page++; draw(); });
    $("#t-csv").addEventListener("click", () => {
      const R = rows();
      const cols = ["run", "domain", "config", "ap", "variant", "trial", "channel", "outcome", "mechanism", "tier"];
      const csv = [cols.join(",")].concat(R.map((r) => [r.run, r.domain, CFG_LABEL[r.config], r.ap, r.variant, r.trial, r.ch, r.outcome, r.mech, r.tier].join(","))).join("\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      a.download = "defer_trials.csv";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    draw();
  }

  function files() {
    const F = [
      ["attacks/{domain}.jsonl", "The 300 attack variants as the harness delivers them: incident, channel, injected content, canaries, scored effects, metadata", "300 rows"],
      ["benign/{domain}.jsonl", "The 35 benign scenarios", "35 rows"],
      ["trials/reported_attack_trials.csv", "Outcome and first interceptor of every reported attack trial (boundary, leave-one-out, other primaries); the rows this page is built from", A.length.toLocaleString() + " rows"],
      ["trials/reported_benign_trials.csv", "Tool proposals and denials of every reported benign incident", B.length.toLocaleString() + " rows"],
      ["trials/all_trials.csv", "Every trial of every run group, as run (including superseded and diagnostic runs)", "all groups"],
      ["trials/all_trials_local4.csv", "The same, with judged configurations re-adjudicated under Local4", "all groups"],
      ["judge_votes/", "Every cached vote of every judge on every logged panel input, keyed by message hash", "per validator"],
      ["logs/", "Raw per-trial JSONL event logs: every proposal with its arguments, each decision, the deciding check, latency and tokens", "per run group"],
    ];
    table($("#tbl-files"), ["Path", "Contents", "Size"], F.map((f) => [`<code>${esc(f[0])}</code>`, esc(f[1]), esc(f[2])]));
    $("#hf-link").href = HF_URL;
    $("#hf-line").innerHTML = `Download: <a href="${HF_URL}">${HF_URL.replace("https://", "")}</a>. The previews below read the same files.`;
  }

  function dsTabs() {
    const tabs = $("#ds-tabs");
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", tabs).forEach((x) => x.classList.toggle("on", x === b));
      ["attacks", "benign", "trials", "files"].forEach((t) => { $("#ds-" + t).hidden = t !== b.dataset.t; });
    });
  }

  // ------------------------------------------------------------ nav highlight
  function navSpy() {
    const links = $$("nav.top a");
    const secs = links.map((a) => $(a.getAttribute("href")));
    const on = () => {
      let cur = 0;
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 120) cur = i; });
      links.forEach((a, i) => a.classList.toggle("on", i === cur && window.scrollY > 200));
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
  }

  // ------------------------------------------------------------ boot
  tiles();
  staticTables();
  cascade();
  domainsPanel();
  explorer();
  experiments();
  dsTabs();
  attackBrowser();
  benignBrowser();
  trialTable();
  files();
  navSpy();
  $("#foot").innerHTML = `DEFER companion page · data built ${esc(D.built)} from the repository's committed logs and cached votes (${Object.entries(D.freeze).map(([d, f]) => DOM_LABEL[d] + " " + f.replace("defense-freeze-", "")).join(", ")}) · code MIT-licensed.`;
})();
