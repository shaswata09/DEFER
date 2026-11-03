/* Minimal SVG charts in the style of the paper's figures (analysis/figstyle.py):
   thin black axes, light grey y-grid, 2 pt error-bar caps, no chart junk.
   Each chart renders at its container's pixel width and re-renders on resize. */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const GRID = "#e6e6e6", INK = "#111111", MUTED = "#555555";

  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function text(parent, x, y, s, attrs) {
    const t = el("text", Object.assign({ x, y, "font-size": 11 }, attrs || {}), parent);
    t.textContent = s;
    return t;
  }

  // ------------------------------------------------------------ tooltip
  let tip;
  function tipShow(ev, html) {
    if (!tip) { tip = document.createElement("div"); tip.className = "tip"; document.body.appendChild(tip); }
    tip.innerHTML = html;
    tip.style.display = "block";
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let x = ev.clientX + 14, y = ev.clientY + 14;
    if (x + w > window.innerWidth - 8) x = ev.clientX - w - 14;
    if (y + h > window.innerHeight - 8) y = ev.clientY - h - 14;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  function tipHide() { if (tip) tip.style.display = "none"; }
  function hover(node, html) {
    node.style.cursor = "default";
    node.addEventListener("mousemove", (e) => tipShow(e, typeof html === "function" ? html() : html));
    node.addEventListener("mouseleave", tipHide);
  }

  // ------------------------------------------------------------ helpers
  function niceMax(v) {
    if (!(v > 0)) return 10;
    const steps = [5, 10, 20, 25, 40, 50, 60, 75, 100];
    for (const s of steps) if (v <= s) return s;
    return Math.ceil(v / 20) * 20;
  }
  function ticks(max) {
    const step = max <= 10 ? 2 : max <= 25 ? 5 : max <= 60 ? 10 : 20;
    const out = [];
    for (let t = 0; t <= max + 1e-9; t += step) out.push(t);
    return out;
  }
  function svgFor(container, height) {
    container.innerHTML = "";
    const w = Math.max(280, container.clientWidth || 520);
    const svg = el("svg", { viewBox: `0 0 ${w} ${height}`, width: w, height, role: "img" }, container);
    return { svg, w };
  }
  function yAxis(g, x0, x1, y, max, label, h, opts) {
    opts = opts || {};
    for (const t of ticks(max)) {
      const yy = y(t);
      if (!opts.noGrid) el("line", { x1: x0, x2: x1, y1: yy, y2: yy, stroke: GRID, "stroke-width": 1 }, g);
      text(g, x0 - 6, yy + 3.5, String(t), { "text-anchor": "end", "font-size": 10 });
    }
    el("line", { x1: x0, x2: x0, y1: y(0), y2: y(max), stroke: INK, "stroke-width": 0.8 }, g);
    if (label) {
      const t = text(g, 0, 0, label, { "text-anchor": "middle", "font-size": 11, transform: `translate(12 ${(y(0) + y(max)) / 2}) rotate(-90)` });
      t.setAttribute("fill", opts.color || INK);
    }
  }
  function errbar(g, x, lo, hi) {
    el("line", { x1: x, x2: x, y1: lo, y2: hi, stroke: INK, "stroke-width": 0.9 }, g);
    el("line", { x1: x - 3, x2: x + 3, y1: lo, y2: lo, stroke: INK, "stroke-width": 0.9 }, g);
    el("line", { x1: x - 3, x2: x + 3, y1: hi, y2: hi, stroke: INK, "stroke-width": 0.9 }, g);
  }
  function wrapLabel(g, x, y, s, maxChars, attrs) {
    const words = String(s).split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; }
      else cur = (cur + " " + w).trim();
    }
    if (cur) lines.push(cur);
    lines.forEach((ln, i) => text(g, x, y + i * 12, ln, attrs));
    return lines.length;
  }

  // ------------------------------------------------------------ bars
  /* cats: [{label, color, v, lo, hi, tip, bold}], opts: {yLabel, max, right: {label, color, values:[{v,tip}]}} */
  function bars(container, cats, opts) {
    opts = opts || {};
    const H = opts.height || 260;
    const { svg, w } = svgFor(container, H);
    const m = { l: 44, r: opts.right ? 46 : 10, t: 18, b: 40 };
    const max = opts.max || niceMax(Math.max(...cats.map((c) => Math.max(c.hi ?? c.v ?? 0, c.v ?? 0))) * 1.12);
    const y = (v) => H - m.b - (v / max) * (H - m.t - m.b);
    const g = el("g", {}, svg);
    yAxis(g, m.l, w - m.r, y, max, opts.yLabel, H);
    const band = (w - m.l - m.r) / cats.length;
    const bw = Math.min(64, band * 0.62);
    cats.forEach((c, i) => {
      const cx = m.l + band * (i + 0.5);
      if (c.v != null && !isNaN(c.v)) {
        const r = el("rect", { x: cx - bw / 2, y: y(c.v), width: bw, height: Math.max(0, y(0) - y(c.v)), fill: c.color }, g);
        if (c.tip) hover(r, c.tip);
        if (c.lo != null && c.hi != null) errbar(g, cx, y(c.lo), y(c.hi));
        text(g, cx, Math.min(y(c.hi ?? c.v), y(c.v)) - 5, c.v.toFixed(1), { "text-anchor": "middle", "font-size": 10.5 });
      } else {
        text(g, cx, y(0) - 6, "n/a", { "text-anchor": "middle", "font-size": 10, fill: MUTED });
      }
      const lab = wrapLabel(g, cx, H - m.b + 15, c.label, Math.max(6, Math.floor(band / 6.5)),
        { "text-anchor": "middle", "font-size": 11, "font-weight": c.bold ? 700 : 400, fill: c.bold ? c.color : INK });
    });
    el("line", { x1: m.l, x2: w - m.r, y1: y(0), y2: y(0), stroke: INK, "stroke-width": 0.8 }, g);
    if (opts.right) {
      const R = opts.right, rmax = R.max || 100;
      const yr = (v) => H - m.b - (v / rmax) * (H - m.t - m.b);
      el("line", { x1: w - m.r, x2: w - m.r, y1: yr(0), y2: yr(rmax), stroke: R.color, "stroke-width": 0.8 }, g);
      for (const t of ticks(rmax)) text(g, w - m.r + 6, yr(t) + 3.5, String(t), { "font-size": 10, fill: R.color });
      const t = text(g, 0, 0, R.label, { "text-anchor": "middle", "font-size": 11, fill: R.color,
        transform: `translate(${w - 8} ${(yr(0) + yr(rmax)) / 2}) rotate(90)` });
      R.values.forEach((rv, i) => {
        if (rv == null || rv.v == null) return;
        const cx = m.l + band * (i + 0.5);
        const d = el("path", { d: `M${cx} ${yr(rv.v) - 5} l5 5 l-5 5 l-5 -5 z`, fill: "#fff", stroke: R.color, "stroke-width": 1.6 }, g);
        if (rv.tip) hover(d, rv.tip);
      });
    }
    return svg;
  }

  // ------------------------------------------------------------ grouped bars
  /* groups: [label], series: [{label,color}], values[g][s] = {v,lo,hi,tip} */
  function grouped(container, groups, series, values, opts) {
    opts = opts || {};
    const H = opts.height || 260;
    const { svg, w } = svgFor(container, H);
    const m = { l: 44, r: 10, t: 18, b: 40 };
    let hi = 0;
    values.forEach((row) => row.forEach((c) => { if (c) hi = Math.max(hi, c.hi ?? c.v ?? 0, c.v ?? 0); }));
    const max = opts.max || niceMax(hi * 1.1);
    const y = (v) => H - m.b - (v / max) * (H - m.t - m.b);
    const g = el("g", {}, svg);
    yAxis(g, m.l, w - m.r, y, max, opts.yLabel, H);
    const band = (w - m.l - m.r) / groups.length;
    const inner = band * 0.8, bw = inner / series.length;
    groups.forEach((lab, gi) => {
      const x0 = m.l + band * gi + (band - inner) / 2;
      series.forEach((s, si) => {
        const c = values[gi][si];
        if (!c || c.v == null || isNaN(c.v)) return;
        const x = x0 + bw * si;
        const r = el("rect", { x: x + 0.5, y: y(c.v), width: Math.max(1, bw - 1), height: Math.max(0, y(0) - y(c.v)), fill: s.color }, g);
        if (c.tip) hover(r, c.tip);
        if (c.lo != null && c.hi != null && opts.err !== false) errbar(g, x + bw / 2, y(c.lo), y(c.hi));
        if (opts.values && bw > 18) text(g, x + bw / 2, y(c.hi ?? c.v) - 4, c.v.toFixed(0), { "text-anchor": "middle", "font-size": 9.5 });
      });
      wrapLabel(g, m.l + band * (gi + 0.5), H - m.b + 15, lab, Math.max(6, Math.floor(band / 6.5)), { "text-anchor": "middle", "font-size": 11 });
    });
    el("line", { x1: m.l, x2: w - m.r, y1: y(0), y2: y(0), stroke: INK, "stroke-width": 0.8 }, g);
    return svg;
  }

  // ------------------------------------------------------------ 100% stacked horizontal
  /* rows: [{label, counts:[...], n, bold}], parts: [{label,color}] */
  function stackH(container, rows, parts, opts) {
    opts = opts || {};
    const rh = 24, gap = 8;
    const m = { l: opts.left || 110, r: 54, t: 6, b: 26 };
    const H = m.t + m.b + rows.length * (rh + gap);
    const { svg, w } = svgFor(container, H);
    const x = (p) => m.l + (p / 100) * (w - m.l - m.r);
    const g = el("g", {}, svg);
    for (const t of [0, 25, 50, 75, 100]) {
      el("line", { x1: x(t), x2: x(t), y1: m.t, y2: H - m.b, stroke: GRID }, g);
      text(g, x(t), H - m.b + 14, t + "%", { "text-anchor": "middle", "font-size": 10 });
    }
    rows.forEach((r, i) => {
      const yy = m.t + i * (rh + gap);
      const tot = r.counts.reduce((a, b) => a + b, 0);
      let acc = 0;
      text(g, m.l - 8, yy + rh / 2 + 4, r.label, { "text-anchor": "end", "font-size": 11, "font-weight": r.bold ? 700 : 400 });
      parts.forEach((p, pi) => {
        const c = r.counts[pi];
        if (!tot || !c) return;
        const a = (100 * acc) / tot, b = (100 * (acc + c)) / tot;
        const rect = el("rect", { x: x(a), y: yy, width: Math.max(0, x(b) - x(a)), height: rh, fill: p.color }, g);
        hover(rect, `<b>${r.label}</b><br>${p.label}: ${c} of ${tot} (${(100 * c / tot).toFixed(1)}%)`);
        if (x(b) - x(a) > 28) text(g, (x(a) + x(b)) / 2, yy + rh / 2 + 4, Math.round(100 * c / tot) + "", {
          "text-anchor": "middle", "font-size": 10, "font-weight": 700, fill: p.text || "#fff" });
        acc += c;
      });
      text(g, w - m.r + 6, yy + rh / 2 + 4, tot ? "n=" + tot : "none", { "font-size": 10, fill: MUTED });
    });
    return svg;
  }

  // ------------------------------------------------------------ heatmap
  /* rows: [label], cols: [{label, color?, bold?}], cells[r][c] = {v, n, tip} */
  function heat(container, rows, cols, cells, opts) {
    opts = opts || {};
    const ch = 22;
    const narrow = (container.clientWidth || 520) < 560;
    if (narrow && opts.short) rows = opts.short;
    const m = { l: narrow ? 64 : opts.left || 190, r: 8, t: 34, b: 8 };
    const H = m.t + m.b + rows.length * ch;
    const { svg, w } = svgFor(container, H);
    const cw = (w - m.l - m.r) / cols.length;
    const g = el("g", {}, svg);
    const hot = opts.color || "#D55E00";
    const mix = (t) => {
      const a = [255, 255, 255], b = [parseInt(hot.slice(1, 3), 16), parseInt(hot.slice(3, 5), 16), parseInt(hot.slice(5, 7), 16)];
      return `rgb(${a.map((x, i) => Math.round(x + (b[i] - x) * t)).join(",")})`;
    };
    cols.forEach((c, ci) => wrapLabel(g, m.l + cw * (ci + 0.5), 12, c.label, Math.max(5, Math.floor(cw / 6.5)),
      { "text-anchor": "middle", "font-size": 11, "font-weight": c.bold ? 700 : 400, fill: c.bold ? c.color : INK }));
    rows.forEach((r, ri) => {
      const yy = m.t + ri * ch;
      text(g, m.l - 8, yy + ch / 2 + 4, r, { "text-anchor": "end", "font-size": 11 });
      cols.forEach((c, ci) => {
        const cell = cells[ri][ci];
        const v = cell && cell.n ? cell.v : null;
        const rect = el("rect", { x: m.l + cw * ci + 1, y: yy + 1, width: cw - 2, height: ch - 2,
          fill: v == null ? "#f4f4f4" : mix(Math.min(1, v / 100)) }, g);
        if (cell && cell.tip) hover(rect, cell.tip);
        text(g, m.l + cw * (ci + 0.5), yy + ch / 2 + 4, v == null ? "–" : v.toFixed(0), {
          "text-anchor": "middle", "font-size": 10.5, fill: v != null && v > 55 ? "#fff" : v == null ? "#aaa" : INK });
      });
    });
    el("rect", { x: m.l, y: m.t, width: w - m.l - m.r, height: rows.length * ch, fill: "none", stroke: INK, "stroke-width": 0.8 }, g);
    return svg;
  }

  // ------------------------------------------------------------ registry / resize
  const live = new Map();
  function mount(container, draw) {
    live.set(container, draw);
    draw();
  }
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => live.forEach((draw, c) => { if (document.body.contains(c)) draw(); else live.delete(c); }), 120);
  });

  window.Charts = { bars, grouped, stackH, heat, mount, hover, tipHide };
})();
