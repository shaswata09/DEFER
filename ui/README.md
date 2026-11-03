# Companion page

A static page that walks through the paper end to end. It covers the problem and threat model, the five principles and 28 checks, the testbed, a results explorer, every executed experiment, the findings, and a previewer for the dataset.

Open `index.html` in a browser; it also works straight from a checkout (`file://`). To host it, serve this folder as is (GitHub Pages, a static Hugging Face Space, or `python -m http.server -d ui`). There is no build step and no external request: the charts are inline SVG, and the data are two script files.

| File | What it is |
|---|---|
| `index.html`, `style.css` | The page; palette and type follow the paper's figures (`analysis/figstyle.py`) |
| `charts.js` | Small SVG chart helpers (bars with intervals, grouped and stacked bars, heatmap) |
| `app.js` | Computes every rate in the browser from the per-trial rows and renders the page |
| `data/defer-data.js` | Per-trial outcomes of the reported runs, paper tables, domain configurations, summary results |
| `data/catalog.js` | The attack variants and benign scenarios, as the harness delivers them |
| `figures/` | Paper figure previews written by `make figures` |
| `build_data.py` | Writes `data/` and `figures/` |

## Rebuild after the results change

```
make figures   # if the paper figures changed
make ui        # python -m ui.build_data --check
```

`--check` compares the page's attack success for each domain and configuration with `results/reported_boundary.json`. It exits non-zero on any mismatch. The page uses the paper's intervals wherever a selection is a reported cell. For any other selection it computes a 95% cluster bootstrap over variants in the browser.

The prose follows `paper/main.tex`. The tables of checks, attack paths, channels and the vector inventory are parsed from it at build time, so they track the paper. The findings text and the experiment list are written into `index.html` and `app.js`, so update them by hand when the paper's wording changes.

The Dataset button points to `HF_URL` at the top of `app.js`.
