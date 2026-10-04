# Paper tables (scoring v3)

Generated from `results/eval_attacks/all_trials.csv` (39686 trials, groups: llama8b_div4, llama8b_local2_v29, llama8b_local2_v30, llama8b_local2_v31, llama8b_local2_v32, mistral_div3p, oss120_local2_v29, oss120_local2_v30, oss120_local2_v31, oss120_local2_v32, q235_div4, q235_div4_e16null, q235_div4_e16probe, q235_div4_e2, q235_div4_e9, q235_div4_outage, q235_local2_disabled_P1_v31, q235_local2_disabled_P1_v32, q235_local2_disabled_P2_v31, q235_local2_disabled_P2_v32, q235_local2_disabled_P3_v31, q235_local2_disabled_P3_v32, q235_local2_disabled_P4_v31, q235_local2_disabled_P4_v32, q235_local2_disabled_P5_v31, q235_local2_disabled_P5_v32, q235_local2_rep, q235_local2_v29, q235_local2_v30, q235_local2_v31, q235_local2_v314, q235_local2_v32, scout_div4). ASR = executed / measurable trials; attempt = executed + blocked; not-measurable and error trials excluded. CIs: Wilson (per-trial) and cluster bootstrap over variants (B = 10,000). Paired differences resample variants shared by both arms; p-values are Holm-corrected within each domain's family of attack paths.

## T1. Headline attack success by group and configuration

| Group | Config | N | ASR % [Wilson 95%] | Cluster bootstrap 95% | Attempt % | Attempt given exp. % | Exposed % | Block given attempt % | Δ vs DEFER |
|---|---|---|---|---|---|---|---|---|---|
| llama8b_div4 | Flat | 450 | 41.6 [37.1, 46.2] | [34.2, 48.9] | 41.6 | 29.2 | 19.8 | 0.0 | 34.9 pp [27.1, 42.9], p=0.000 |
| llama8b_div4 | ACL-Hardened | 450 | 39.6 [35.1, 44.1] | [32.2, 46.9] | 41.3 | 38.7 | 13.8 | 4.3 | 32.9 pp [25.1, 40.7], p=0.000 |
| llama8b_div4 | DEFER | 450 | 6.7 [4.7, 9.4] | [3.1, 10.7] | 54.7 | 50.0 | 13.8 | 87.8 | — |
| llama8b_local2_v29 | Flat | 225 | 34.7 [28.7, 41.1] | [24.4, 45.3] | 34.7 | 38.6 | 89.8 | 0.0 | 30.7 pp [20.4, 41.3], p=0.000 |
| llama8b_local2_v29 | ACL-Hardened | 225 | 32.4 [26.7, 38.8] | [22.2, 42.7] | 33.8 | 40.6 | 83.1 | 4.0 | 28.4 pp [18.2, 38.7], p=0.000 |
| llama8b_local2_v29 | DEFER | 225 | 4.0 [2.1, 7.4] | [0.4, 8.4] | 43.1 | 51.6 | 82.7 | 90.7 | — |
| llama8b_local2_v30 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| llama8b_local2_v30 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| llama8b_local2_v30 | DEFER | 225 | 5.3 [3.1, 9.1] | [1.3, 9.8] | 42.7 | 51.1 | 82.7 | 87.5 | — |
| llama8b_local2_v31 | Flat | 225 | 35.1 [29.2, 41.5] | [24.9, 45.8] | 35.1 | 39.1 | 89.8 | 0.0 | 28.4 pp [18.2, 39.1], p=0.000 |
| llama8b_local2_v31 | ACL-Hardened | 225 | 34.7 [28.7, 41.1] | [24.4, 45.3] | 36.0 | 43.3 | 83.1 | 3.7 | 28.0 pp [18.2, 38.2], p=0.000 |
| llama8b_local2_v31 | DEFER | 225 | 6.7 [4.1, 10.7] | [2.2, 12.0] | 43.6 | 51.9 | 81.3 | 84.7 | — |
| llama8b_local2_v32 | Flat | 225 | 32.9 [27.1, 39.3] | [22.7, 43.6] | 32.9 | 36.4 | 90.2 | 0.0 | 27.4 pp [17.2, 38.0], p=0.000 |
| llama8b_local2_v32 | ACL-Hardened | 225 | 32.4 [26.7, 38.8] | [22.2, 43.1] | 33.8 | 40.6 | 83.1 | 4.0 | 27.0 pp [16.9, 37.3], p=0.000 |
| llama8b_local2_v32 | DEFER | 220 | 5.5 [3.1, 9.3] | [1.8, 10.1] | 40.9 | 51.2 | 77.3 | 86.7 | — |
| mistral_div3p | Flat | 450 | 23.8 [20.1, 27.9] | [17.6, 30.2] | 23.8 | 14.0 | 20.7 | 0.0 | 22.2 pp [16.2, 28.4], p=0.000 |
| mistral_div3p | ACL-Hardened | 450 | 22.0 [18.4, 26.1] | [16.0, 28.2] | 24.4 | 17.6 | 15.1 | 10.0 | 20.4 pp [14.7, 26.4], p=0.000 |
| mistral_div3p | DEFER | 450 | 1.6 [0.8, 3.2] | [0.0, 3.6] | 25.3 | 17.6 | 15.1 | 93.9 | — |
| oss120_local2_v29 | Flat | 225 | 21.8 [16.9, 27.6] | [13.3, 31.1] | 21.8 | 23.0 | 94.7 | 0.0 | 19.1 pp [11.1, 28.0], p=0.000 |
| oss120_local2_v29 | ACL-Hardened | 225 | 17.8 [13.3, 23.3] | [9.8, 26.7] | 19.1 | 22.1 | 86.7 | 7.0 | 15.1 pp [7.6, 23.6], p=0.000 |
| oss120_local2_v29 | DEFER | 225 | 2.7 [1.2, 5.7] | [0.0, 6.7] | 18.7 | 20.8 | 87.6 | 85.7 | — |
| oss120_local2_v30 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| oss120_local2_v30 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| oss120_local2_v30 | DEFER | 225 | 6.2 [3.7, 10.2] | [1.8, 12.0] | 19.6 | 21.9 | 87.1 | 68.2 | — |
| oss120_local2_v31 | Flat | 225 | 21.3 [16.5, 27.1] | [12.4, 30.7] | 21.3 | 23.0 | 92.9 | 0.0 | 18.7 pp [10.7, 27.6], p=0.000 |
| oss120_local2_v31 | ACL-Hardened | 225 | 18.7 [14.1, 24.3] | [10.7, 28.0] | 20.0 | 23.0 | 87.1 | 6.7 | 16.0 pp [8.0, 24.0], p=0.000 |
| oss120_local2_v31 | DEFER | 225 | 2.7 [1.2, 5.7] | [0.0, 6.7] | 19.1 | 20.5 | 86.7 | 86.1 | — |
| oss120_local2_v32 | Flat | 225 | 21.3 [16.5, 27.1] | [12.4, 30.2] | 21.3 | 23.0 | 92.9 | 0.0 | 19.1 pp [11.1, 28.0], p=0.000 |
| oss120_local2_v32 | ACL-Hardened | 225 | 18.7 [14.1, 24.3] | [10.7, 28.0] | 20.0 | 23.2 | 86.2 | 6.7 | 16.4 pp [8.4, 24.9], p=0.000 |
| oss120_local2_v32 | DEFER | 223 | 2.2 [1.0, 5.1] | [0.0, 5.9] | 18.4 | 20.0 | 85.2 | 87.8 | — |
| q235_div4 | Flat | 900 | 34.7 [31.6, 37.8] | [29.7, 39.7] | 34.7 | 40.7 | 42.0 | 0.0 | 28.7 pp [23.7, 33.8], p=0.000 |
| q235_div4 | ACL-Hardened | 900 | 29.1 [26.2, 32.2] | [24.3, 34.1] | 33.0 | 37.1 | 37.4 | 11.8 | 23.1 pp [18.3, 28.0], p=0.000 |
| q235_div4 | DEFER | 900 | 6.0 [4.6, 7.8] | [3.7, 8.6] | 49.1 | 56.0 | 36.1 | 87.8 | — |
| q235_div4_e16null | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_e16null | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_e16null | DEFER | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_e2 | Flat | 105 | 63.8 [54.3, 72.4] | [48.6, 78.1] | 63.8 | 63.8 | 100.0 | 0.0 | 61.0 pp [45.7, 75.2], p=0.000 |
| q235_div4_e2 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_e2 | DEFER | 153 | 2.0 [0.7, 5.6] | [0.0, 5.9] | 80.4 | 80.1 | 98.7 | 97.6 | — |
| q235_div4_e9 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_e9 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_e9 | DEFER | 204 | 4.4 [2.3, 8.2] | [0.0, 10.3] | 44.6 | 55.5 | 80.4 | 90.1 | — |
| q235_div4_outage | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_outage | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_div4_outage | DEFER | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P1_v31 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P1_v31 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P1_v31 | DEFER | 225 | 3.6 [1.8, 6.9] | [0.0, 8.0] | 44.0 | 50.0 | 88.0 | 91.9 | — |
| q235_local2_disabled_P1_v32 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P1_v32 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P1_v32 | DEFER | 217 | 6.5 [3.9, 10.5] | [1.8, 12.4] | 39.6 | 47.8 | 83.0 | 83.7 | — |
| q235_local2_disabled_P2_v31 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P2_v31 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P2_v31 | DEFER | 225 | 4.9 [2.8, 8.5] | [1.3, 9.3] | 44.4 | 49.7 | 86.7 | 89.0 | — |
| q235_local2_disabled_P2_v32 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P2_v32 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P2_v32 | DEFER | 219 | 9.6 [6.4, 14.2] | [4.1, 16.4] | 34.2 | 38.7 | 84.9 | 72.0 | — |
| q235_local2_disabled_P3_v31 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P3_v31 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P3_v31 | DEFER | 225 | 16.0 [11.8, 21.3] | [8.4, 24.4] | 36.0 | 38.8 | 89.3 | 55.6 | — |
| q235_local2_disabled_P3_v32 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P3_v32 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P3_v32 | DEFER | 222 | 19.8 [15.1, 25.6] | [11.3, 29.2] | 36.0 | 40.5 | 85.6 | 45.0 | — |
| q235_local2_disabled_P4_v31 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P4_v31 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P4_v31 | DEFER | 225 | 6.7 [4.1, 10.7] | [1.3, 13.3] | 40.9 | 45.2 | 87.6 | 83.7 | — |
| q235_local2_disabled_P4_v32 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P4_v32 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P4_v32 | DEFER | 225 | 14.2 [10.3, 19.4] | [7.1, 22.2] | 44.4 | 50.0 | 86.2 | 68.0 | — |
| q235_local2_disabled_P5_v31 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P5_v31 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P5_v31 | DEFER | 225 | 5.3 [3.1, 9.1] | [1.3, 10.7] | 50.7 | 52.4 | 94.2 | 89.5 | — |
| q235_local2_disabled_P5_v32 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P5_v32 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_disabled_P5_v32 | DEFER | 223 | 16.1 [11.9, 21.5] | [8.5, 24.2] | 48.9 | 50.5 | 94.2 | 67.0 | — |
| q235_local2_rep | Flat | 900 | 34.6 [31.5, 37.7] | [29.6, 39.7] | 34.6 | 34.7 | 99.7 | 0.0 | 29.9 pp [24.5, 35.3], p=0.000 |
| q235_local2_rep | ACL-Hardened | 900 | 28.3 [25.5, 31.4] | [23.6, 33.3] | 31.7 | 33.5 | 94.6 | 10.5 | 23.6 pp [18.5, 28.9], p=0.000 |
| q235_local2_rep | DEFER | 897 | 4.5 [3.3, 6.0] | [2.3, 6.8] | 47.3 | 49.4 | 91.4 | 90.6 | — |
| q235_local2_v29 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_v29 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_v29 | DEFER | 224 | 2.7 [1.2, 5.7] | [0.0, 6.3] | 42.9 | 47.5 | 89.3 | 93.8 | — |
| q235_local2_v30 | Flat | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_v30 | ACL-Hardened | 0 | – | [–, –] | – | – | – | – | — |
| q235_local2_v30 | DEFER | 900 | 5.9 [4.5, 7.6] | [3.6, 8.6] | 45.6 | 48.2 | 92.4 | 87.1 | — |
| q235_local2_v31 | Flat | 900 | 33.9 [30.9, 37.0] | [28.9, 39.0] | 33.9 | 34.0 | 99.7 | 0.0 | 30.4 pp [25.3, 35.8], p=0.000 |
| q235_local2_v31 | ACL-Hardened | 900 | 28.1 [25.3, 31.1] | [23.2, 33.1] | 31.6 | 33.3 | 94.7 | 10.9 | 24.7 pp [19.8, 29.8], p=0.000 |
| q235_local2_v31 | DEFER | 900 | 3.4 [2.4, 4.9] | [1.7, 5.6] | 48.1 | 50.3 | 91.4 | 92.8 | — |
| q235_local2_v314 | Flat | 45 | 44.4 [30.9, 58.8] | [22.2, 66.7] | 44.4 | 44.4 | 100.0 | 0.0 | 28.9 pp [-4.4, 60.0], p=0.106 |
| q235_local2_v314 | ACL-Hardened | 45 | 33.3 [21.4, 47.9] | [13.3, 55.6] | 35.6 | 35.6 | 100.0 | 6.2 | 17.8 pp [-13.3, 46.7], p=0.291 |
| q235_local2_v314 | DEFER | 45 | 15.6 [7.8, 28.8] | [0.0, 35.6] | 75.6 | 75.6 | 100.0 | 79.4 | — |
| q235_local2_v32 | Flat | 225 | 35.6 [29.6, 42.0] | [25.3, 45.8] | 35.6 | 36.0 | 98.7 | 0.0 | 27.5 pp [17.1, 38.3], p=0.000 |
| q235_local2_v32 | ACL-Hardened | 225 | 27.1 [21.7, 33.3] | [17.3, 36.9] | 30.2 | 34.0 | 88.9 | 10.3 | 18.9 pp [8.6, 29.7], p=0.000 |
| q235_local2_v32 | DEFER | 222 | 7.2 [4.5, 11.4] | [2.2, 13.5] | 40.5 | 44.9 | 87.4 | 82.2 | — |
| scout_div4 | Flat | 447 | 37.4 [33.0, 41.9] | [30.5, 44.4] | 37.4 | 18.9 | 23.7 | 0.0 | 34.9 pp [28.1, 42.0], p=0.000 |
| scout_div4 | ACL-Hardened | 445 | 31.7 [27.5, 36.1] | [25.1, 38.4] | 34.8 | 20.8 | 17.3 | 9.0 | 29.2 pp [22.7, 36.0], p=0.000 |
| scout_div4 | DEFER | 450 | 2.4 [1.4, 4.3] | [0.4, 4.9] | 46.4 | 21.7 | 15.3 | 94.7 | — |

## T2a. Per attack path, q235_div4, all domains

| Attack path | Flat ASR % | ACL-Hardened ASR % | DEFER ASR % | Flat attempt % (all / exposed) | Flat − ACO (pp) | ACL − ACO (pp) |
|---|---|---|---|---|---|---|
| AP-1 Tool redirection | 16.7 [9.3, 28.0] (n=60) | 0.0 [0.0, 6.0] (n=60) | 0.0 [0.0, 6.0] (n=60) | 16.7 / – | 16.7 (p_holm=0.041) | 0.0 (p_holm=1.000) |
| AP-2 Memory poisoning | 8.3 [3.6, 18.1] (n=60) | 10.0 [4.7, 20.2] (n=60) | 6.7 [2.6, 15.9] (n=60) | 8.3 / 8.3 | 1.7 (p_holm=1.000) | 3.3 (p_holm=1.000) |
| AP-3 Confused deputy | 5.0 [1.7, 13.7] (n=60) | 1.7 [0.3, 8.9] (n=60) | 0.0 [0.0, 6.0] (n=60) | 5.0 / 5.3 | 5.0 (p_holm=1.000) | 1.7 (p_holm=1.000) |
| AP-4 Cross-phase leak | 51.2 [40.7, 61.6] (n=84) | 14.3 [8.4, 23.3] (n=84) | 0.0 [0.0, 4.4] (n=84) | 51.2 / 53.1 | 51.2 (p_holm=0.000) | 14.3 (p_holm=0.256) |
| AP-5 Irreversible action | 26.7 [17.1, 39.0] (n=60) | 33.3 [22.7, 45.9] (n=60) | 10.0 [4.7, 20.2] (n=60) | 26.7 / – | 16.7 (p_holm=0.941) | 23.3 (p_holm=0.051) |
| AP-6 Replay | 0.0 [0.0, 6.0] (n=60) | 0.0 [0.0, 6.0] (n=60) | 0.0 [0.0, 6.0] (n=60) | 0.0 / – | 0.0 (p_holm=1.000) | 0.0 (p_holm=1.000) |
| AP-7 Action chain | 16.7 [9.3, 28.0] (n=60) | 20.0 [11.8, 31.8] (n=60) | 10.0 [4.7, 20.2] (n=60) | 16.7 / – | 6.7 (p_holm=1.000) | 10.0 (p_holm=1.000) |
| AP-8 Parameter manipulation | 31.7 [21.3, 44.2] (n=60) | 36.7 [25.6, 49.3] (n=60) | 15.0 [8.1, 26.1] (n=60) | 31.7 / – | 16.7 (p_holm=0.941) | 21.7 (p_holm=0.657) |
| AP-9 Handoff poisoning | 70.0 [57.5, 80.1] (n=60) | 46.7 [34.6, 59.1] (n=60) | 16.7 [9.3, 28.0] (n=60) | 70.0 / 70.0 | 53.3 (p_holm=0.000) | 30.0 (p_holm=0.010) |
| AP-10 Validator manipulation | 100.0 [94.0, 100.0] (n=60) | 100.0 [94.0, 100.0] (n=60) | 3.3 [0.9, 11.4] (n=60) | 100.0 / – | 96.7 (p_holm=0.000) | 96.7 (p_holm=0.000) |
| AP-11 Operational context | 20.0 [11.8, 31.8] (n=60) | 10.0 [4.7, 20.2] (n=60) | 1.7 [0.3, 8.9] (n=60) | 20.0 / – | 18.3 (p_holm=0.012) | 8.3 (p_holm=0.945) |
| AP-12 Concurrent actions | 5.0 [1.7, 13.7] (n=60) | 11.7 [5.8, 22.2] (n=60) | 0.0 [0.0, 6.0] (n=60) | 5.0 / – | 5.0 (p_holm=1.000) | 11.7 (p_holm=0.657) |
| AP-13 Adversarial memory | 100.0 [94.0, 100.0] (n=60) | 100.0 [94.0, 100.0] (n=60) | 15.0 [8.1, 26.1] (n=60) | 100.0 / 100.0 | 85.0 (p_holm=0.000) | 85.0 (p_holm=0.000) |
| AP-14 Read injection | 1.7 [0.3, 8.9] (n=60) | 0.0 [0.0, 6.0] (n=60) | 5.0 [1.7, 13.7] (n=60) | 1.7 / 1.7 | -3.3 (p_holm=1.000) | -5.0 (p_holm=1.000) |
| AP-15 Infrastructure integrity | 77.8 [61.9, 88.3] (n=36) | 77.8 [61.9, 88.3] (n=36) | 11.1 [4.4, 25.3] (n=36) | 77.8 / – | 66.7 (p_holm=0.000) | 66.7 (p_holm=0.000) |

## T2b. Per attack path, q235_div4, CyberOps

| Attack path | Flat ASR % | ACL-Hardened ASR % | DEFER ASR % | Flat attempt % (all / exposed) | Flat − ACO (pp) | ACL − ACO (pp) |
|---|---|---|---|---|---|---|
| AP-1 Tool redirection | 20.0 [7.0, 45.2] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 20.0 / – | 20.0 (p_holm=1.000) | 0.0 (p_holm=1.000) |
| AP-2 Memory poisoning | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 / 0.0 | 0.0 (p_holm=1.000) | 0.0 (p_holm=1.000) |
| AP-3 Confused deputy | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 / 0.0 | 0.0 (p_holm=1.000) | 0.0 (p_holm=1.000) |
| AP-4 Cross-phase leak | 76.2 [54.9, 89.4] (n=21) | 14.3 [5.0, 34.6] (n=21) | 0.0 [0.0, 15.5] (n=21) | 76.2 / 76.2 | 76.2 (p_holm=0.000) | 14.3 (p_holm=1.000) |
| AP-5 Irreversible action | 6.7 [1.2, 29.8] (n=15) | 13.3 [3.7, 37.9] (n=15) | 0.0 [0.0, 20.4] (n=15) | 6.7 / – | 6.7 (p_holm=1.000) | 13.3 (p_holm=1.000) |
| AP-6 Replay | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 / – | 0.0 (p_holm=1.000) | 0.0 (p_holm=1.000) |
| AP-7 Action chain | 20.0 [7.0, 45.2] (n=15) | 6.7 [1.2, 29.8] (n=15) | 6.7 [1.2, 29.8] (n=15) | 20.0 / – | 13.3 (p_holm=1.000) | 0.0 (p_holm=1.000) |
| AP-8 Parameter manipulation | 33.3 [15.2, 58.3] (n=15) | 53.3 [30.1, 75.2] (n=15) | 0.0 [0.0, 20.4] (n=15) | 33.3 / – | 33.3 (p_holm=1.000) | 53.3 (p_holm=0.006) |
| AP-9 Handoff poisoning | 53.3 [30.1, 75.2] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 53.3 / 53.3 | 53.3 (p_holm=0.252) | 0.0 (p_holm=1.000) |
| AP-10 Validator manipulation | 100.0 [79.6, 100.0] (n=15) | 100.0 [79.6, 100.0] (n=15) | 13.3 [3.7, 37.9] (n=15) | 100.0 / – | 86.7 (p_holm=0.000) | 86.7 (p_holm=0.000) |
| AP-11 Operational context | 20.0 [7.0, 45.2] (n=15) | 13.3 [3.7, 37.9] (n=15) | 0.0 [0.0, 20.4] (n=15) | 20.0 / – | 20.0 (p_holm=1.000) | 13.3 (p_holm=1.000) |
| AP-12 Concurrent actions | 6.7 [1.2, 29.8] (n=15) | 13.3 [3.7, 37.9] (n=15) | 0.0 [0.0, 20.4] (n=15) | 6.7 / – | 6.7 (p_holm=1.000) | 13.3 (p_holm=1.000) |
| AP-13 Adversarial memory | 100.0 [79.6, 100.0] (n=15) | 100.0 [79.6, 100.0] (n=15) | 60.0 [35.8, 80.2] (n=15) | 100.0 / 100.0 | 40.0 (p_holm=1.000) | 40.0 (p_holm=1.000) |
| AP-14 Read injection | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 [0.0, 20.4] (n=15) | 0.0 / 0.0 | 0.0 (p_holm=1.000) | 0.0 (p_holm=1.000) |
| AP-15 Infrastructure integrity | 77.8 [45.3, 93.7] (n=9) | 77.8 [45.3, 93.7] (n=9) | 33.3 [12.1, 64.6] (n=9) | 77.8 / – | 44.4 (p_holm=0.938) | 44.4 (p_holm=1.000) |

## T3. Benign utility (E1)

| Group | Config | N | Task completed % [95%] | Any denial % [95%] | Denials / incident | Latency s median / p95 | Tokens primary / validator |
|---|---|---|---|---|---|---|---|
| llama8b_div4 | ACL-Hardened | 75 | 100.0 [95.1, 100.0] | 6.7 [2.9, 14.7] | 0.21 | 8.3 / 22.9 | 17326 / 0 |
| llama8b_div4 | DEFER | 75 | 98.7 [92.8, 99.8] | 60.0 [48.7, 70.3] | 1.61 | 36.1 / 112.9 | 8360 / 8491 |
| llama8b_div4 | Flat | 75 | 100.0 [95.1, 100.0] | 0.0 [0.0, 4.9] | 0.00 | 8.1 / 58.5 | 17391 / 0 |
| llama8b_local2_v29 | ACL-Hardened | 60 | 100.0 [94.0, 100.0] | 3.3 [0.9, 11.4] | 0.05 | 7.6 / 14.9 | 17649 / 0 |
| llama8b_local2_v29 | DEFER | 60 | 100.0 [94.0, 100.0] | 53.3 [40.9, 65.4] | 1.32 | 27.6 / 71.1 | 8322 / 3897 |
| llama8b_local2_v29 | Flat | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 6.9 / 13.4 | 17616 / 0 |
| llama8b_local2_v29 | LLM-judge only | 60 | 98.3 [91.1, 99.7] | 46.7 [34.6, 59.1] | 0.90 | 24.2 / 57.7 | 8327 / 5719 |
| llama8b_local2_v29 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 4.23 | 14.1 / 51.6 | 8299 / 0 |
| llama8b_local2_v30 | DEFER | 60 | 98.3 [91.1, 99.7] | 53.3 [40.9, 65.4] | 1.38 | 50.6 / 137.8 | 8433 / 7742 |
| llama8b_local2_v30 | LLM-judge only | 60 | 98.3 [91.1, 99.7] | 58.3 [45.7, 69.9] | 1.02 | 39.7 / 99.3 | 8345 / 12513 |
| llama8b_local2_v31 | ACL-Hardened | 60 | 100.0 [94.0, 100.0] | 5.0 [1.7, 13.7] | 0.12 | 7.2 / 13.1 | 17648 / 0 |
| llama8b_local2_v31 | DEFER | 60 | 98.3 [91.1, 99.7] | 53.3 [40.9, 65.4] | 1.48 | 28.5 / 132.9 | 8430 / 4233 |
| llama8b_local2_v31 | Flat | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 7.3 / 13.4 | 17572 / 0 |
| llama8b_local2_v31 | LLM-judge only | 60 | 98.3 [91.1, 99.7] | 60.0 [47.4, 71.4] | 1.07 | 22.9 / 56.6 | 8383 / 5923 |
| llama8b_local2_v31 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 98.3 [91.1, 99.7] | 4.42 | 13.0 / 51.3 | 8259 / 0 |
| llama8b_local2_v32 | ACL-Hardened | 60 | 100.0 [94.0, 100.0] | 3.3 [0.9, 11.4] | 0.07 | 7.3 / 10.1 | 17561 / 0 |
| llama8b_local2_v32 | DEFER | 60 | 100.0 [94.0, 100.0] | 50.0 [37.7, 62.3] | 0.95 | 302.0 / 656.7 | 8379 / 3739 |
| llama8b_local2_v32 | Flat | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 7.2 / 14.4 | 17660 / 0 |
| llama8b_local2_v32 | LLM-judge only | 60 | 100.0 [94.0, 100.0] | 60.0 [47.4, 71.4] | 0.85 | 23.0 / 29.7 | 17322 / 4462 |
| llama8b_local2_v32 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 4.30 | 17.2 / 82.0 | 8432 / 0 |
| mistral_div3p | ACL-Hardened | 75 | 86.7 [77.2, 92.6] | 24.0 [15.8, 34.8] | 0.71 | 32.8 / 61.2 | 18389 / 0 |
| mistral_div3p | DEFER | 75 | 78.7 [68.1, 86.4] | 62.7 [51.4, 72.7] | 1.43 | 53.3 / 103.4 | 11821 / 3475 |
| mistral_div3p | Flat | 75 | 80.0 [69.6, 87.5] | 0.0 [0.0, 4.9] | 0.00 | 32.2 / 55.1 | 18758 / 0 |
| oss120_local2_v29 | ACL-Hardened | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 30.7 / 39.0 | 12083 / 0 |
| oss120_local2_v29 | DEFER | 60 | 100.0 [94.0, 100.0] | 15.0 [8.1, 26.1] | 0.15 | 39.4 / 52.1 | 8273 / 1594 |
| oss120_local2_v29 | Flat | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 30.8 / 39.6 | 12036 / 0 |
| oss120_local2_v29 | LLM-judge only | 60 | 95.0 [86.3, 98.3] | 45.0 [33.1, 57.5] | 0.47 | 39.9 / 49.0 | 8108 / 3382 |
| oss120_local2_v29 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 1.15 | 31.4 / 47.3 | 8268 / 0 |
| oss120_local2_v30 | DEFER | 60 | 91.7 [81.9, 96.4] | 23.3 [14.4, 35.4] | 0.23 | 31.3 / 48.0 | 8288 / 2539 |
| oss120_local2_v30 | LLM-judge only | 60 | 96.7 [88.6, 99.1] | 13.3 [6.9, 24.2] | 0.13 | 32.6 / 42.3 | 8425 / 6781 |
| oss120_local2_v31 | ACL-Hardened | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 30.7 / 37.6 | 11990 / 0 |
| oss120_local2_v31 | DEFER | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 39.9 / 62.3 | 8306 / 1588 |
| oss120_local2_v31 | Flat | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 29.2 / 39.3 | 11874 / 0 |
| oss120_local2_v31 | LLM-judge only | 60 | 100.0 [94.0, 100.0] | 33.3 [22.7, 45.9] | 0.33 | 41.2 / 47.9 | 8123 / 3456 |
| oss120_local2_v31 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 1.00 | 29.4 / 57.1 | 8358 / 0 |
| oss120_local2_v32 | ACL-Hardened | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 30.0 / 37.1 | 12042 / 0 |
| oss120_local2_v32 | DEFER | 60 | 43.3 [31.6, 55.9] | 70.0 [57.5, 80.1] | 0.70 | 37.6 / 78.2 | 8348 / 467 |
| oss120_local2_v32 | Flat | 60 | 100.0 [94.0, 100.0] | 0.0 [0.0, 6.0] | 0.00 | 30.8 / 39.5 | 12156 / 0 |
| oss120_local2_v32 | LLM-judge only | 60 | 95.0 [86.3, 98.3] | 36.7 [25.6, 49.3] | 0.38 | 39.6 / 47.0 | 11867 / 3191 |
| oss120_local2_v32 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 1.00 | 29.5 / 54.5 | 8357 / 0 |
| q235_div4 | ACL-Hardened | 105 | 58.1 [48.5, 67.1] | 94.3 [88.1, 97.4] | 7.59 | 34.9 / 57.5 | 18376 / 0 |
| q235_div4 | DEFER | 105 | 97.1 [91.9, 99.0] | 88.6 [81.1, 93.3] | 3.40 | 112.6 / 172.0 | 11928 / 15895 |
| q235_div4 | defer_gate_permissive | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 6.12 | 87.9 / 104.8 | 12193 / 6871 |
| q235_div4 | Flat | 105 | 100.0 [96.5, 100.0] | 0.0 [0.0, 3.5] | 0.00 | 36.2 / 67.5 | 19768 / 0 |
| q235_div4 | LLM-judge only | 60 | 95.0 [86.3, 98.3] | 81.7 [70.1, 89.4] | 1.82 | 167.3 / 194.9 | 11937 / 26321 |
| q235_div4 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 96.7 [88.6, 99.1] | 7.42 | 55.1 / 72.3 | 12184 / 0 |
| q235_div4_e16null | defer_gate_permissive | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 8.63 | 132.8 / 166.1 | 11997 / 10634 |
| q235_div4_e16probe | defer_gate_permissive | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 8.30 | 111.3 / 142.2 | 11978 / 10000 |
| q235_div4_e9 | DEFER | 105 | 93.3 [86.9, 96.7] | 92.4 [85.7, 96.1] | 3.40 | 115.8 / 192.5 | 11917 / 16429 |
| q235_div4_e9 | defer_writejudge | 105 | 98.1 [93.3, 99.5] | 91.4 [84.5, 95.4] | 3.62 | 126.9 / 274.2 | 12676 / 18717 |
| q235_div4_outage | defer_noautoapprove | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 7.98 | 130.2 / 175.5 | 12030 / 9651 |
| q235_div4_outage | p2_judge | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 8.22 | 127.8 / 174.7 | 12127 / 9988 |
| q235_local2_disabled_P1_v31 | DEFER | 60 | 95.0 [86.3, 98.3] | 78.3 [66.4, 86.9] | 1.42 | 72.8 / 102.5 | 12075 / 7439 |
| q235_local2_disabled_P1_v32 | DEFER | 60 | 95.0 [86.3, 98.3] | 83.3 [72.0, 90.7] | 1.58 | 63.1 / 890.0 | 12142 / 7917 |
| q235_local2_disabled_P2_v31 | DEFER | 60 | 91.7 [81.9, 96.4] | 68.3 [55.8, 78.7] | 1.22 | 74.5 / 101.3 | 12471 / 8033 |
| q235_local2_disabled_P2_v32 | DEFER | 60 | 100.0 [94.0, 100.0] | 95.0 [86.3, 98.3] | 2.78 | 78.7 / 404.4 | 20325 / 7996 |
| q235_local2_disabled_P3_v31 | DEFER | 60 | 91.7 [81.9, 96.4] | 55.0 [42.5, 66.9] | 0.80 | 59.6 / 73.3 | 12444 / 0 |
| q235_local2_disabled_P3_v32 | DEFER | 60 | 91.7 [81.9, 96.4] | 26.7 [17.1, 39.0] | 0.47 | 84.3 / 276.0 | 12344 / 0 |
| q235_local2_disabled_P4_v31 | DEFER | 60 | 96.7 [88.6, 99.1] | 90.0 [79.9, 95.3] | 1.82 | 71.5 / 96.6 | 12210 / 7583 |
| q235_local2_disabled_P4_v32 | DEFER | 60 | 90.0 [79.9, 95.3] | 80.0 [68.2, 88.2] | 1.53 | 106.7 / 367.0 | 12280 / 7538 |
| q235_local2_disabled_P5_v31 | DEFER | 60 | 93.3 [84.1, 97.4] | 81.7 [70.1, 89.4] | 1.75 | 73.0 / 91.2 | 12275 / 7444 |
| q235_local2_disabled_P5_v32 | DEFER | 60 | 93.3 [84.1, 97.4] | 80.0 [68.2, 88.2] | 1.50 | 99.0 / 381.1 | 12228 / 7594 |
| q235_local2_rep | ACL-Hardened | 105 | 63.8 [54.3, 72.4] | 91.4 [84.5, 95.4] | 7.12 | 44.0 / 84.8 | 18431 / 0 |
| q235_local2_rep | DEFER | 105 | 96.2 [90.6, 98.5] | 81.9 [73.5, 88.1] | 2.82 | 81.0 / 152.7 | 11838 / 6769 |
| q235_local2_rep | Flat | 105 | 99.0 [94.8, 99.8] | 0.0 [0.0, 3.5] | 0.00 | 43.1 / 85.8 | 19778 / 0 |
| q235_local2_rep | LLM-judge only | 105 | 99.0 [94.8, 99.8] | 82.9 [74.5, 88.9] | 2.36 | 97.0 / 133.4 | 19387 / 16316 |
| q235_local2_rep | Symbolic only (no L6) | 105 | 51.4 [42.0, 60.8] | 100.0 [96.5, 100.0] | 7.56 | 62.3 / 91.6 | 11588 / 0 |
| q235_local2_v29 | DEFER | 60 | 96.7 [88.6, 99.1] | 88.3 [77.8, 94.2] | 2.03 | 60.2 / 101.7 | 12120 / 7623 |
| q235_local2_v30 | DEFER | 105 | 97.1 [91.9, 99.0] | 95.2 [89.3, 97.9] | 3.47 | 78.8 / 117.4 | 11941 / 13135 |
| q235_local2_v30 | LLM-judge only | 60 | 95.0 [86.3, 98.3] | 73.3 [61.0, 82.9] | 1.77 | 80.7 / 109.5 | 12284 / 31997 |
| q235_local2_v31 | ACL-Hardened | 105 | 60.0 [50.4, 68.9] | 91.4 [84.5, 95.4] | 7.60 | 39.1 / 61.5 | 18376 / 0 |
| q235_local2_v31 | DEFER | 105 | 98.1 [93.3, 99.5] | 93.3 [86.9, 96.7] | 3.08 | 97.8 / 152.7 | 11857 / 6847 |
| q235_local2_v31 | Flat | 105 | 99.0 [94.8, 99.8] | 0.0 [0.0, 3.5] | 0.00 | 41.3 / 63.8 | 19830 / 0 |
| q235_local2_v31 | LLM-judge only | 105 | 97.1 [91.9, 99.0] | 78.1 [69.3, 84.9] | 2.14 | 80.5 / 110.1 | 11954 / 13509 |
| q235_local2_v31 | Symbolic only (no L6) | 105 | 51.4 [42.0, 60.8] | 100.0 [96.5, 100.0] | 7.70 | 58.0 / 89.9 | 11590 / 0 |
| q235_local2_v314 | LLM-judge only | 45 | 100.0 [92.1, 100.0] | 97.8 [88.4, 99.6] | 2.67 | 98.2 / 117.4 | 18449 / 14823 |
| q235_local2_v32 | ACL-Hardened | 60 | 36.7 [25.6, 49.3] | 100.0 [94.0, 100.0] | 9.40 | 46.5 / 89.9 | 18962 / 0 |
| q235_local2_v32 | DEFER | 60 | 93.3 [84.1, 97.4] | 68.3 [55.8, 78.7] | 1.40 | 61.6 / 106.8 | 12201 / 7558 |
| q235_local2_v32 | Flat | 60 | 98.3 [91.1, 99.7] | 0.0 [0.0, 6.0] | 0.00 | 47.7 / 95.3 | 20636 / 0 |
| q235_local2_v32 | LLM-judge only | 60 | 98.3 [91.1, 99.7] | 71.7 [59.2, 81.5] | 2.13 | 95.9 / 140.7 | 20090 / 17436 |
| q235_local2_v32 | Symbolic only (no L6) | 60 | 25.0 [15.8, 37.2] | 100.0 [94.0, 100.0] | 7.70 | 47.0 / 78.0 | 11965 / 0 |
| scout_div4 | ACL-Hardened | 73 | 71.2 [60.0, 80.3] | 50.7 [39.5, 61.8] | 1.78 | 51.7 / 64.6 | 21335 / 0 |
| scout_div4 | DEFER | 74 | 62.2 [50.8, 72.4] | 94.6 [86.9, 97.9] | 3.41 | 94.5 / 150.0 | 12147 / 8572 |
| scout_div4 | Flat | 72 | 83.3 [73.1, 90.2] | 0.0 [0.0, 5.1] | 0.00 | 52.4 / 64.9 | 21679 / 0 |

## T3b. Persistent-state sequence (E1b), DEFER, q235_div4

Benign scenarios run after 30 attack incidents with all defense state kept, against the same scenarios under per-trial isolation (first trial of E1).

| Domain | State mode | N | Any denial % [95%] | Denials / incident | Task completed % [95%] | Any denial %: first half / second half of sequence |
|---|---|---|---|---|---|---|
| cyberops | isolated | 20 | 70.0 [48.1, 85.5] | 1.45 | 90.0 [69.9, 97.2] | 70 / 70 |
| cyberops | persistent (pass 1) | 20 | 100.0 [83.9, 100.0] | 7.35 | 5.0 [0.9, 23.6] | 100 / 100 |
| cyberops | persistent (pass 2, reversed) | 20 | 100.0 [83.9, 100.0] | 8.75 | 5.0 [0.9, 23.6] | 100 / 100 |
| healthcare | isolated | 5 | 100.0 [56.6, 100.0] | 7.60 | 100.0 [56.6, 100.0] | 100 / 100 |
| healthcare | persistent (pass 1) | 5 | 100.0 [56.6, 100.0] | 11.40 | 40.0 [11.8, 76.9] | 100 / 100 |
| finance | isolated | 5 | 100.0 [56.6, 100.0] | 4.20 | 100.0 [56.6, 100.0] | 100 / 100 |
| finance | persistent (pass 1) | 5 | 100.0 [56.6, 100.0] | 8.20 | 40.0 [11.8, 76.9] | 100 / 100 |
| legal | isolated | 5 | 100.0 [56.6, 100.0] | 4.80 | 100.0 [56.6, 100.0] | 100 / 100 |
| legal | persistent (pass 1) | 5 | 100.0 [56.6, 100.0] | 8.20 | 40.0 [11.8, 76.9] | 100 / 100 |

## T4. Ablations (E3), q235_div4

| Ablation config | Attack trials | ASR % [95%] | Benign trials | Benign any-denial % [95%] |
|---|---|---|---|---|
| DEFER | 225 | 6.7 [4.1, 10.7] | 60 | 80.0 [68.2, 88.2] |
| defer -P1 | 204 | 7.4 [4.5, 11.8] | 60 | 76.7 [64.6, 85.6] |
| defer -P2 | 204 | 12.3 [8.4, 17.5] | 60 | 73.3 [61.0, 82.9] |
| defer -P3 | 204 | 20.6 [15.6, 26.7] | 60 | 65.0 [52.4, 75.8] |
| defer -P4 | 225 | 9.3 [6.2, 13.8] | 60 | 83.3 [72.0, 90.7] |
| defer -P5 | 225 | 8.9 [5.8, 13.3] | 60 | 75.0 [62.8, 84.2] |
| LLM-judge only | 225 | 24.4 [19.3, 30.5] | 60 | 81.7 [70.1, 89.4] |
| Symbolic only (no L6) | 210 | 3.8 [1.9, 7.3] | 60 | 96.7 [88.6, 99.1] |

## T5. Which layer blocked the attacks (DEFER, q235_div4)

| Layer | Blocked trials | Share % |
|---|---|---|
| P3_llm_consensus_reject | 155 | 39.9 |
| P2_target_not_in_evidence | 74 | 19.1 |
| P4_schema_violation | 48 | 12.4 |
| P2_parameter_rule_violation | 28 | 7.2 |
| P3_handoff_validation | 16 | 4.1 |
| P3_operational_context | 14 | 3.6 |
| P5_access_control | 12 | 3.1 |
| P5_broad_query_block | 12 | 3.1 |
| P2_critical_asset | 8 | 2.1 |
| P3_replay_detection | 5 | 1.3 |
| P3_bulk_action | 4 | 1.0 |
| P1_config_integrity_violation | 4 | 1.0 |
| P4_metadata_invalid | 3 | 0.8 |
| P2_wildcard_parameter | 3 | 0.8 |
| P2_high_criticality_destructive | 1 | 0.3 |
| P3_execution_verification | 1 | 0.3 |

## T6. ASB paired panel replay (E6)

| Run (group[_panel]) | Attack subtype | Config | N | LLM ASR % | Defended ASR % |
|---|---|---|---|---|---|
| q235_div4_div3 | context_manipulation | defer | 150 | 39.33 | 0.0 |
| q235_div4_div3 | escape_characters | defer | 300 | 13.67 | 0.0 |
| q235_div4_div3 | fake_completion | defer | 300 | 39.67 | 0.0 |
| q235_div4_div3 | naive | defer | 450 | 35.33 | 1.56 |
| q235_div4_div3 | trigger_phrase | defer | 75 | 36.0 | 6.67 |
| q235_div4_div4 | context_manipulation | defer | 150 | 39.33 | 0.0 |
| q235_div4_div4 | escape_characters | defer | 300 | 13.67 | 0.0 |
| q235_div4_div4 | fake_completion | defer | 300 | 39.67 | 0.0 |
| q235_div4_div4 | naive | defer | 450 | 35.33 | 0.0 |
| q235_div4_div4 | trigger_phrase | defer | 75 | 36.0 | 0.0 |
| q235_div4_drift | context_manipulation | defer | 10 | 30.0 | 0.0 |
| q235_div4_drift | context_manipulation | flat | 10 | 30.0 | 30.0 |
| q235_div4_drift | escape_characters | defer | 10 | 0.0 | 0.0 |
| q235_div4_drift | escape_characters | flat | 10 | 20.0 | 20.0 |
| q235_div4_drift | fake_completion | defer | 10 | 30.0 | 0.0 |
| q235_div4_drift | fake_completion | flat | 10 | 40.0 | 40.0 |
| q235_div4_drift | naive | defer | 15 | 26.67 | 6.67 |
| q235_div4_drift | naive | flat | 15 | 26.67 | 26.67 |
| q235_div4_drift | trigger_phrase | defer | 5 | 20.0 | 0.0 |
| q235_div4_drift | trigger_phrase | flat | 5 | 20.0 | 20.0 |
| q235_div4_frozen_full | context_manipulation | acl_hardened | 60 | 43.33 | 43.33 |
| q235_div4_frozen_full | context_manipulation | defer | 60 | 41.67 | 0.0 |
| q235_div4_frozen_full | context_manipulation | flat | 60 | 38.33 | 38.33 |
| q235_div4_frozen_full | escape_characters | acl_hardened | 120 | 11.67 | 11.67 |
| q235_div4_frozen_full | escape_characters | defer | 120 | 10.83 | 0.0 |
| q235_div4_frozen_full | escape_characters | flat | 120 | 10.83 | 10.83 |
| q235_div4_frozen_full | fake_completion | acl_hardened | 120 | 37.5 | 37.5 |
| q235_div4_frozen_full | fake_completion | defer | 120 | 40.0 | 0.0 |
| q235_div4_frozen_full | fake_completion | flat | 120 | 35.0 | 35.0 |
| q235_div4_frozen_full | naive | acl_hardened | 180 | 34.44 | 34.44 |
| q235_div4_frozen_full | naive | defer | 180 | 38.89 | 0.0 |
| q235_div4_frozen_full | naive | flat | 180 | 33.89 | 33.89 |
| q235_div4_frozen_full | trigger_phrase | acl_hardened | 30 | 20.0 | 20.0 |
| q235_div4_frozen_full | trigger_phrase | defer | 30 | 23.33 | 0.0 |
| q235_div4_frozen_full | trigger_phrase | flat | 30 | 26.67 | 26.67 |
| q235_div4_lin3 | context_manipulation | defer | 150 | 39.33 | 0.0 |
| q235_div4_lin3 | escape_characters | defer | 300 | 13.67 | 7.33 |
| q235_div4_lin3 | fake_completion | defer | 300 | 39.67 | 8.67 |
| q235_div4_lin3 | naive | defer | 450 | 35.33 | 11.11 |
| q235_div4_lin3 | trigger_phrase | defer | 75 | 36.0 | 13.33 |
| q235_div4_single | context_manipulation | defer | 150 | 39.33 | 0.0 |
| q235_div4_single | escape_characters | defer | 300 | 13.67 | 1.0 |
| q235_div4_single | fake_completion | defer | 300 | 39.67 | 2.33 |
| q235_div4_single | naive | defer | 450 | 35.33 | 5.78 |
| q235_div4_single | trigger_phrase | defer | 75 | 36.0 | 6.67 |

## T7. Cost

| Group | Config | N | Primary tokens / trial | Validator tokens / trial | Latency s median / p95 |
|---|---|---|---|---|---|
| llama8b_div4 | ACL-Hardened | 450 | 15532 | 0 | 6.8 / 19.4 |
| llama8b_div4 | DEFER | 450 | 7094 | 7542 | 32.4 / 132.4 |
| llama8b_div4 | Flat | 450 | 15984 | 0 | 6.8 / 52.6 |
| llama8b_local2_v29 | ACL-Hardened | 225 | 17227 | 0 | 6.6 / 15.2 |
| llama8b_local2_v29 | DEFER | 225 | 7945 | 3044 | 22.7 / 59.0 |
| llama8b_local2_v29 | Flat | 225 | 17214 | 0 | 6.7 / 13.6 |
| llama8b_local2_v29 | LLM-judge only | 225 | 7696 | 6964 | 28.4 / 69.6 |
| llama8b_local2_v29 | Symbolic only (no L6) | 225 | 7810 | 0 | 11.1 / 30.2 |
| llama8b_local2_v30 | DEFER | 225 | 7916 | 4424 | 29.4 / 93.8 |
| llama8b_local2_v30 | LLM-judge only | 225 | 7861 | 11598 | 52.8 / 107.5 |
| llama8b_local2_v31 | ACL-Hardened | 225 | 17243 | 0 | 6.7 / 13.1 |
| llama8b_local2_v31 | DEFER | 225 | 7927 | 3137 | 26.8 / 67.5 |
| llama8b_local2_v31 | Flat | 225 | 17223 | 0 | 6.6 / 14.4 |
| llama8b_local2_v31 | LLM-judge only | 225 | 7722 | 6522 | 24.9 / 69.7 |
| llama8b_local2_v31 | Symbolic only (no L6) | 224 | 7826 | 0 | 14.3 / 68.8 |
| llama8b_local2_v32 | ACL-Hardened | 225 | 17253 | 0 | 6.6 / 15.4 |
| llama8b_local2_v32 | DEFER | 220 | 7973 | 3338 | 63.0 / 369.6 |
| llama8b_local2_v32 | Flat | 225 | 17254 | 0 | 6.7 / 13.5 |
| llama8b_local2_v32 | LLM-judge only | 225 | 16983 | 5364 | 23.6 / 57.6 |
| llama8b_local2_v32 | Symbolic only (no L6) | 224 | 7885 | 0 | 13.1 / 60.5 |
| mistral_div3p | ACL-Hardened | 450 | 15429 | 0 | 18.9 / 55.0 |
| mistral_div3p | DEFER | 450 | 9348 | 2150 | 35.3 / 81.6 |
| mistral_div3p | Flat | 450 | 15629 | 0 | 19.7 / 53.7 |
| oss120_local2_v29 | ACL-Hardened | 225 | 11988 | 0 | 35.6 / 47.8 |
| oss120_local2_v29 | DEFER | 225 | 8090 | 1248 | 42.8 / 54.4 |
| oss120_local2_v29 | Flat | 225 | 12025 | 0 | 36.2 / 48.7 |
| oss120_local2_v29 | LLM-judge only | 225 | 7860 | 3717 | 47.5 / 56.6 |
| oss120_local2_v29 | Symbolic only (no L6) | 225 | 8069 | 0 | 38.2 / 49.2 |
| oss120_local2_v30 | DEFER | 225 | 7992 | 1745 | 36.5 / 57.9 |
| oss120_local2_v30 | LLM-judge only | 225 | 8030 | 6487 | 41.8 / 96.0 |
| oss120_local2_v31 | ACL-Hardened | 225 | 11867 | 0 | 35.6 / 46.4 |
| oss120_local2_v31 | DEFER | 225 | 8061 | 401 | 41.5 / 52.9 |
| oss120_local2_v31 | Flat | 225 | 11865 | 0 | 36.9 / 46.0 |
| oss120_local2_v31 | LLM-judge only | 225 | 7855 | 3756 | 46.4 / 55.7 |
| oss120_local2_v31 | Symbolic only (no L6) | 225 | 7967 | 0 | 38.5 / 49.5 |
| oss120_local2_v32 | ACL-Hardened | 225 | 12034 | 0 | 35.8 / 47.4 |
| oss120_local2_v32 | DEFER | 223 | 8131 | 398 | 42.2 / 55.7 |
| oss120_local2_v32 | Flat | 225 | 12037 | 0 | 36.6 / 45.4 |
| oss120_local2_v32 | LLM-judge only | 225 | 11653 | 3343 | 44.5 / 57.2 |
| oss120_local2_v32 | Symbolic only (no L6) | 225 | 8124 | 0 | 39.0 / 51.6 |
| q235_div4 | ACL-Hardened | 900 | 20393 | 0 | 46.2 / 210586.7 |
| q235_div4 | DEFER | 900 | 12027 | 11928 | 111.2 / 231577.5 |
| q235_div4 | defer_gate_permissive | 204 | 7953 | 5386 | 56.7 / 107.9 |
| q235_div4 | Flat | 900 | 21958 | 0 | 49.9 / 210254.4 |
| q235_div4 | LLM-judge only | 229 | 10643 | 27659 | 180.8 / 251.2 |
| q235_div4 | Symbolic only (no L6) | 420 | 10620 | 0 | 41.1 / 192661.4 |
| q235_div4_e16null | defer_gate_permissive | 225 | 11207 | 6688 | 99.9 / 148.8 |
| q235_div4_e2 | DEFER | 153 | 7678 | 3439 | 46.6 / 136.1 |
| q235_div4_e2 | Flat | 105 | 17539 | 0 | 30.1 / 63.3 |
| q235_div4_e9 | DEFER | 204 | 8187 | 9245 | 78.7 / 144.2 |
| q235_div4_e9 | defer_writejudge | 204 | 8272 | 10358 | 83.4 / 154.0 |
| q235_div4_outage | defer_noautoapprove | 225 | 11213 | 6644 | 96.7 / 140.6 |
| q235_div4_outage | p2_judge | 225 | 11204 | 8563 | 102.5 / 152.7 |
| q235_local2_disabled_P1_v31 | DEFER | 225 | 11276 | 3923 | 67.7 / 124.1 |
| q235_local2_disabled_P1_v32 | DEFER | 217 | 11558 | 5050 | 516.9 / 970.2 |
| q235_local2_disabled_P2_v31 | DEFER | 225 | 11315 | 4610 | 65.3 / 93.5 |
| q235_local2_disabled_P2_v32 | DEFER | 219 | 19286 | 8271 | 219.7 / 464.5 |
| q235_local2_disabled_P3_v31 | DEFER | 225 | 11269 | 0 | 53.4 / 78.4 |
| q235_local2_disabled_P3_v32 | DEFER | 222 | 11461 | 0 | 155.5 / 301.9 |
| q235_local2_disabled_P4_v31 | DEFER | 225 | 11218 | 3977 | 64.7 / 104.9 |
| q235_local2_disabled_P4_v32 | DEFER | 225 | 11359 | 5247 | 185.0 / 330.0 |
| q235_local2_disabled_P5_v31 | DEFER | 225 | 11214 | 4168 | 65.1 / 97.2 |
| q235_local2_disabled_P5_v32 | DEFER | 223 | 11397 | 5282 | 177.2 / 373.1 |
| q235_local2_rep | ACL-Hardened | 900 | 15096 | 0 | 44.6 / 96.7 |
| q235_local2_rep | DEFER | 897 | 8817 | 4210 | 64.7 / 378.3 |
| q235_local2_rep | Flat | 900 | 16436 | 0 | 46.8 / 99.1 |
| q235_local2_rep | LLM-judge only | 900 | 14921 | 12049 | 82.3 / 157.1 |
| q235_local2_rep | Symbolic only (no L6) | 899 | 8602 | 0 | 48.2 / 109.3 |
| q235_local2_v29 | DEFER | 224 | 11371 | 5193 | 67.7 / 100.9 |
| q235_local2_v30 | DEFER | 900 | 8669 | 6183 | 62.4 / 133.0 |
| q235_local2_v30 | LLM-judge only | 225 | 11296 | 25016 | 132.8 / 196.0 |
| q235_local2_v31 | ACL-Hardened | 900 | 15045 | 0 | 44.1 / 98.4 |
| q235_local2_v31 | DEFER | 900 | 8578 | 3798 | 66.1 / 136.9 |
| q235_local2_v31 | Flat | 900 | 16426 | 0 | 45.2 / 107.1 |
| q235_local2_v31 | LLM-judge only | 900 | 8210 | 9217 | 77.3 / 161.6 |
| q235_local2_v31 | Symbolic only (no L6) | 899 | 8562 | 0 | 47.6 / 111.2 |
| q235_local2_v314 | ACL-Hardened | 45 | 14557 | 0 | 44.6 / 60.0 |
| q235_local2_v314 | DEFER | 45 | 7913 | 3744 | 62.7 / 84.3 |
| q235_local2_v314 | Flat | 45 | 15496 | 0 | 44.8 / 58.7 |
| q235_local2_v314 | LLM-judge only | 675 | 13639 | 10388 | 74.4 / 123.6 |
| q235_local2_v314 | Symbolic only (no L6) | 45 | 7754 | 0 | 41.8 / 60.7 |
| q235_local2_v32 | ACL-Hardened | 225 | 18007 | 0 | 54.9 / 110.4 |
| q235_local2_v32 | DEFER | 222 | 12153 | 5638 | 117.6 / 2871.7 |
| q235_local2_v32 | Flat | 225 | 20242 | 0 | 64.4 / 115.7 |
| q235_local2_v32 | LLM-judge only | 225 | 18765 | 17032 | 119.6 / 203.8 |
| q235_local2_v32 | Symbolic only (no L6) | 225 | 11319 | 0 | 81.7 / 158.1 |
| scout_div4 | ACL-Hardened | 445 | 19675 | 0 | 48.8 / 68.5 |
| scout_div4 | DEFER | 450 | 11604 | 6309 | 76.3 / 144.2 |
| scout_div4 | Flat | 447 | 20059 | 0 | 48.9 / 70.2 |

## T8. Run provenance

| Group | Domain | Config | Suffix | Git | Freeze tag | Primary | Quant | Panel | T | State | vLLM |
|---|---|---|---|---|---|---|---|---|---|---|---|
| llama8b_div4 | cyberops | acl_hardened |  | 4d1e578743 | defense-freeze-v2-2-g4d1e578 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | acl_hardened |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | acl_hardened |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | acl_hardened |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | defer |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | defer |  | 4d1e578743 | defense-freeze-v2-2-g4d1e578 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | defer |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | defer |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | flat |  | 03daccdacb | defense-freeze-v2.4-1-g03daccd | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | flat |  | 4d1e578743 | defense-freeze-v2-2-g4d1e578 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | flat |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | flat |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | cyberops | flat |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | acl_hardened |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | acl_hardened |  | 4d1e578743 | defense-freeze-v2-2-g4d1e578 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | acl_hardened |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | acl_hardened |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | acl_hardened |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | defer |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | defer |  | 4d1e578743 | defense-freeze-v2-2-g4d1e578 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | defer |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | defer |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | defer |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | meta-llama/Llama-3.1-8B-Instruct | bf16 | div4 | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | flat |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | flat |  | 4d1e578743 | defense-freeze-v2-2-g4d1e578 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | flat |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | flat |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_div4 | finance | flat |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v29 | cyberops | acl_hardened |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v29 | cyberops | defer |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v29 | cyberops | flat |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v29 | cyberops | llm_judge |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v29 | cyberops | symbolic_only |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v30 | cyberops | defer |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v30 | cyberops | llm_judge |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v31 | cyberops | acl_hardened |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v31 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v31 | cyberops | flat |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v31 | cyberops | llm_judge |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v31 | cyberops | symbolic_only |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v32 | cyberops | acl_hardened |  | dc0c2c6554 | defense-freeze-v3.2 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v32 | cyberops | flat |  | dc0c2c6554 | defense-freeze-v3.2 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v32 | cyberops | llm_judge |  | dc0c2c6554 | defense-freeze-v3.2 | meta-llama/Llama-3.1-8B-Instruct | bf16 | local2 | 0.7 | isolated | 0.21.0 |
| llama8b_local2_v32 | cyberops | symbolic_only |  | dc0c2c6554 | defense-freeze-v3.2 | meta-llama/Llama-3.1-8B-Instruct | bf16 |  | 0.7 | isolated | 0.21.0 |
| mistral_div3p | cyberops | acl_hardened |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | cyberops | acl_hardened |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | cyberops | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 | mistral_div3p | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | cyberops | defer |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 | mistral_div3p | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | cyberops | flat |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | cyberops | flat |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | finance | acl_hardened |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | finance | acl_hardened |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | finance | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 | mistral_div3p | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | finance | defer |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 | mistral_div3p | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | finance | flat |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| mistral_div3p | finance | flat |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | mistralai/Mistral-Small-3.2-24B-Instruct-2506 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v29 | cyberops | acl_hardened |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v29 | cyberops | defer |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v29 | cyberops | flat |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v29 | cyberops | llm_judge |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v29 | cyberops | symbolic_only |  | 84e02582dc | defense-freeze-v2.9-15-g84e0258 | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v30 | cyberops | defer |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v30 | cyberops | llm_judge |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v31 | cyberops | acl_hardened |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v31 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v31 | cyberops | flat |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v31 | cyberops | llm_judge |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v31 | cyberops | symbolic_only |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v32 | cyberops | acl_hardened |  | dc0c2c6554 | defense-freeze-v3.2 | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v32 | cyberops | flat |  | dc0c2c6554 | defense-freeze-v3.2 | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v32 | cyberops | llm_judge |  | dc0c2c6554 | defense-freeze-v3.2 | openai/gpt-oss-120b | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| oss120_local2_v32 | cyberops | symbolic_only |  | dc0c2c6554 | defense-freeze-v3.2 | openai/gpt-oss-120b | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | acl_hardened |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | acl_hardened |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | acl_hardened |  | 7266134788 | defense-freeze-v2.2 @7266134788 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | acl_hardened |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | acl_hardened |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | acl_hardened |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P4 | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P5 | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P1 | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P2 | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P3 | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P4 | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P5 | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P1 | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P2 | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P3 | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P4 | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P5 | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P1 | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P2 | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P3 | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P4 | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer | _disabled_P5 | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | defer_gate_permissive |  | f6f713d773 | defense-freeze-v2.7 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | flat |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | flat |  | 31e7718ba7 | defense-freeze-v2.4-3-g31e7718 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | flat |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | flat |  | 7266134788 | defense-freeze-v2.2 @7266134788 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | flat |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | flat |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | flat |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | llm_judge |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | llm_judge |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | llm_judge |  | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | symbolic_only |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | symbolic_only |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | symbolic_only |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | symbolic_only |  | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | cyberops | symbolic_only |  | f50de9ddd1 | defense-freeze-v2.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | acl_hardened |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | acl_hardened |  | 31e7718ba7 | defense-freeze-v2.4-3-g31e7718 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | acl_hardened |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | acl_hardened |  | 7266134788 | defense-freeze-v2.2 @7266134788 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | acl_hardened |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | acl_hardened |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | acl_hardened |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | defer |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | defer |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | defer |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | defer |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | flat |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | flat |  | 31e7718ba7 | defense-freeze-v2.4-3-g31e7718 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | flat |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | flat |  | 7266134788 | defense-freeze-v2.2 @7266134788 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | flat |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | flat |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | flat |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | llm_judge |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | symbolic_only |  | 03daccdacb | defense-freeze-v2.4-1-g03daccd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | finance | symbolic_only |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | acl_hardened |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | acl_hardened |  | 31e7718ba7 | defense-freeze-v2.4-3-g31e7718 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | acl_hardened |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | acl_hardened |  | 7266134788 | defense-freeze-v2.2 @7266134788 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | acl_hardened |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | acl_hardened |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | acl_hardened |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | defer |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | defer |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | defer |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | defer |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | flat |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | flat |  | 31e7718ba7 | defense-freeze-v2.4-3-g31e7718 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | flat |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | flat |  | 7266134788 | defense-freeze-v2.2 @7266134788 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | flat |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | flat |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | flat |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | llm_judge |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | healthcare | symbolic_only |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | acl_hardened |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | acl_hardened |  | 31e7718ba7 | defense-freeze-v2.4-3-g31e7718 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | acl_hardened |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | acl_hardened |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | acl_hardened |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | acl_hardened |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | defer |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | defer |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | defer |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | defer |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | flat |  | 0cbea096d0 | defense-freeze-v2-3-g0cbea09 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | flat |  | 31e7718ba7 | defense-freeze-v2.4-3-g31e7718 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | flat |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | flat |  | 8ca31e5abe | defense-freeze-v2.2-1-g8ca31e5 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | flat |  | 8e94f23700 | defense-freeze-v2-4-g8e94f23 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | flat |  | be6b4f1299 | defense-freeze-v2-1-gbe6b4f1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | llm_judge |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4 | legal | symbolic_only |  | 6c299d9c71 | defense-freeze-v2.4-4-g6c299d9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e16null | cyberops | defer_gate_permissive |  | f0baad81f3 | defense-freeze-v2.5-1-gf0baad8 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e16probe | cyberops | defer_gate_permissive |  | 5cc913d92b | defense-freeze-v2.6 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | cyberops | defer |  | 749977fb38 | defense-freeze-v2.4-6-g749977f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | cyberops | defer |  | f0baad81f3 | defense-freeze-v2.5-1-gf0baad8 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | cyberops | flat |  | 749977fb38 | defense-freeze-v2.4-6-g749977f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | cyberops | flat |  | 8d90ff1390 | defense-freeze-v2.4-8-g8d90ff1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | cyberops | flat |  | f0baad81f3 | defense-freeze-v2.5-1-gf0baad8 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | finance | defer |  | 749977fb38 | defense-freeze-v2.4-6-g749977f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | finance | defer |  | f0baad81f3 | defense-freeze-v2.5-1-gf0baad8 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | finance | flat |  | 749977fb38 | defense-freeze-v2.4-6-g749977f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | healthcare | defer |  | 749977fb38 | defense-freeze-v2.4-6-g749977f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | healthcare | defer |  | 8d90ff1390 | defense-freeze-v2.4-8-g8d90ff1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | healthcare | defer |  | f0baad81f3 | defense-freeze-v2.5-1-gf0baad8 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | healthcare | flat |  | 749977fb38 | defense-freeze-v2.4-6-g749977f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e2 | healthcare | flat |  | 8d90ff1390 | defense-freeze-v2.4-8-g8d90ff1 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | cyberops | defer |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | cyberops | defer_writejudge |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | cyberops | defer_writejudge |  | d838b8f020 | defense-freeze-v2.8-2-gd838b8f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | finance | defer |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | finance | defer_writejudge |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | healthcare | defer |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | healthcare | defer_writejudge |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | legal | defer |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_e9 | legal | defer_writejudge |  | 7ceb670753 | defense-freeze-v2.8-1-g7ceb670 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_outage | cyberops | defer_noautoapprove |  | f0baad81f3 | defense-freeze-v2.5-1-gf0baad8 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_outage | cyberops | p2_judge |  | f0baad81f3 | defense-freeze-v2.5-1-gf0baad8 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_persistent | cyberops | defer |  | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_persistent | finance | defer |  | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_persistent | healthcare | defer |  | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_persistent | legal | defer |  | c66c04b66a | defense-freeze-v2-5-gc66c04b | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_div4_persistent3 | cyberops | defer |  | d838b8f020 | defense-freeze-v2.8-2-gd838b8f | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | div4 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P1_v31 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P1_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P2_v31 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P2_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P3_v31 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P3_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P4_v31 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P4_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P5_v31 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_disabled_P5_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v29 | cyberops | defer |  | 194ee63d3c | defense-freeze-v2.9-7-g194ee63 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v29 | cyberops | defer |  | f7d80b9b52 | defense-freeze-v2.9-3-gf7d80b9 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v30 | cyberops | defer |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v30 | cyberops | llm_judge |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v30 | finance | defer |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v30 | healthcare | defer |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v30 | legal | defer |  | 7f04763b56 | defense-freeze-v3.0-2-g7f04763 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | cyberops | acl_hardened |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | cyberops | defer |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | cyberops | flat |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | cyberops | llm_judge |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | cyberops | symbolic_only |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | finance | acl_hardened |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | finance | defer |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | finance | flat |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | finance | llm_judge |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | finance | symbolic_only |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | healthcare | acl_hardened |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | healthcare | defer |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | healthcare | flat |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | healthcare | llm_judge |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | healthcare | symbolic_only |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | legal | acl_hardened |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | legal | defer |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | legal | flat |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | legal | llm_judge |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31 | legal | symbolic_only |  | 9377dcd9c4 | defense-freeze-v3.1-1-g9377dcd | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | finance | acl_hardened |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | finance | defer |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | finance | flat |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | finance | llm_judge |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | finance | symbolic_only |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | healthcare | acl_hardened |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | healthcare | defer |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | healthcare | flat |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | healthcare | llm_judge |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | healthcare | symbolic_only |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | legal | acl_hardened |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | legal | defer |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | legal | flat |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | legal | llm_judge |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v314 | legal | symbolic_only |  | 23b7b4c431 | defense-freeze-v3.1.4 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31persist | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31persist | finance | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31persist | healthcare | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31persist | legal | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v31persist2 | cyberops | defer |  | f92bb5de2e | defense-freeze-v3.1.1-10-gf92bb5d | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | persistent | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v32 | cyberops | acl_hardened |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v32 | cyberops | defer |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v32 | cyberops | flat |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v32 | cyberops | llm_judge |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 | local2 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| q235_local2_v32 | cyberops | symbolic_only |  | dc0c2c6554 | defense-freeze-v3.2 | Qwen/Qwen3-235B-A22B-Instruct-2507 | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | acl_hardened |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | acl_hardened |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | acl_hardened |  | a369d18c36 | defense-freeze-v2.1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | defer |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | defer |  | a369d18c36 | defense-freeze-v2.1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | flat |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | flat |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | cyberops | flat |  | a369d18c36 | defense-freeze-v2.1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | acl_hardened |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | acl_hardened |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | acl_hardened |  | a369d18c36 | defense-freeze-v2.1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | defer |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | defer |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | defer |  | a369d18c36 | defense-freeze-v2.1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 | div4 | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | flat |  | 5435e156e1 | defense-freeze-v2.2 @5435e156e1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | flat |  | 98dde989a4 | defense-freeze-v2-8-g98dde98 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |
| scout_div4 | finance | flat |  | a369d18c36 | defense-freeze-v2.1 | meta-llama/Llama-4-Scout-17B-16E-Instruct | bf16 |  | 0.7 | isolated | 0.19.1rc1.dev117+g3352bf8b0 |

**Freeze tags that do not name a single tree:**

- `defense-freeze-v2.2` resolves to 2 commits in this data (5435e156e1, 7266134788); rows above are qualified with the commit actually used.


## T9. Injection channels (pooled over the four primaries' main runs)

Exposed % = share of scored trials with an injection_served event; attempt | exposed % is the attempt rate among exposed trials.

| Channel | Config | Variants | N | Exposed % | Attempt % | Attempt given exp. % | ASR % [95%] |
|---|---|---|---|---|---|---|---|
| Alert text | ACL-Hardened | 170 | 1172 | 13.3 | 32.6 | 80.8 | 28.1 [25.6, 30.7] |
| Alert text | DEFER | 170 | 1176 | 13.3 | 46.3 | 80.8 | 4.9 [3.8, 6.3] |
| Alert text | Flat | 170 | 1173 | 13.3 | 31.6 | 80.1 | 31.6 [29.0, 34.3] |
| Handoff | ACL-Hardened | 30 | 269 | 22.3 | 46.1 | 53.3 | 41.3 [35.5, 47.2] |
| Handoff | DEFER | 30 | 270 | 22.2 | 67.0 | 93.3 | 3.7 [2.0, 6.7] |
| Handoff | Flat | 30 | 270 | 22.2 | 48.9 | 70.0 | 48.9 [43.0, 54.8] |
| Memory | ACL-Hardened | 35 | 285 | 45.3 | 1.4 | 3.1 | 0.7 [0.2, 2.5] |
| Memory | DEFER | 35 | 285 | 54.7 | 7.0 | 12.8 | 7.0 [4.6, 10.6] |
| Memory | Flat | 35 | 285 | 86.3 | 8.4 | 9.8 | 8.4 [5.7, 12.2] |
| Proposal justification | ACL-Hardened | 32 | 240 | 0.0 | 91.7 | – | 91.7 [87.5, 94.5] |
| Proposal justification | DEFER | 32 | 240 | 0.0 | 88.3 | – | 5.8 [3.5, 9.6] |
| Proposal justification | Flat | 32 | 240 | 0.0 | 91.7 | – | 91.7 [87.5, 94.5] |
| Tool response | ACL-Hardened | 33 | 279 | 71.3 | 6.5 | 7.5 | 6.5 [4.1, 10.0] |
| Tool response | DEFER | 33 | 279 | 54.5 | 19.0 | 25.0 | 0.0 [0.0, 1.4] |
| Tool response | Flat | 33 | 279 | 73.1 | 9.3 | 10.8 | 9.3 [6.4, 13.3] |

## T9b. Injection channels, q235_div4

| Channel | Config | Variants | N | Exposed % | Attempt % | Attempt given exp. % | ASR % [95%] |
|---|---|---|---|---|---|---|---|
| Alert text | ACL-Hardened | 170 | 510 | 23.5 | 32.0 | 75.0 | 26.3 [22.6, 30.3] |
| Alert text | DEFER | 170 | 510 | 23.5 | 45.7 | 75.0 | 6.9 [5.0, 9.4] |
| Alert text | Flat | 170 | 510 | 23.5 | 29.0 | 74.2 | 29.0 [25.2, 33.1] |
| Handoff | ACL-Hardened | 30 | 90 | 66.7 | 47.8 | 53.3 | 43.3 [33.6, 53.6] |
| Handoff | DEFER | 30 | 90 | 66.7 | 93.3 | 93.3 | 11.1 [6.1, 19.3] |
| Handoff | Flat | 30 | 90 | 66.7 | 58.9 | 70.0 | 58.9 [48.6, 68.5] |
| Memory | ACL-Hardened | 35 | 105 | 62.9 | 1.9 | 3.0 | 0.0 [0.0, 3.5] |
| Memory | DEFER | 35 | 105 | 62.9 | 2.9 | 4.5 | 2.9 [1.0, 8.1] |
| Memory | Flat | 35 | 105 | 97.1 | 19.0 | 19.6 | 19.0 [12.7, 27.6] |
| Proposal justification | ACL-Hardened | 32 | 96 | 0.0 | 91.7 | – | 91.7 [84.4, 95.7] |
| Proposal justification | DEFER | 32 | 96 | 0.0 | 88.5 | – | 6.2 [2.9, 13.0] |
| Proposal justification | Flat | 32 | 96 | 0.0 | 91.7 | – | 91.7 [84.4, 95.7] |
| Tool response | ACL-Hardened | 33 | 99 | 91.9 | 1.0 | 1.1 | 1.0 [0.2, 5.5] |
| Tool response | DEFER | 33 | 99 | 79.8 | 37.4 | 41.8 | 0.0 [0.0, 3.7] |
| Tool response | Flat | 33 | 99 | 97.0 | 3.0 | 3.1 | 3.0 [1.0, 8.5] |

## T10. P5 evidence (AP-4 + AP-14, q235_div4, CyberOps)

| Arm (AP-4 + AP-14, CyberOps) | N | ASR % [95%] | Block given attempt % |
|---|---|---|---|
| Flat | 36 | 44.4 [29.5, 60.4] | 0.0 |
| ACL-Hardened | 36 | 8.3 [2.9, 21.8] | 50.0 |
| Full (DEFER) | 36 | 0.0 [0.0, 9.6] | 100.0 |
| Full minus P5 | 36 | 19.4 [9.8, 35.0] | 58.8 |

First interception under Full (AP-4 + AP-14, CyberOps):
- P5_access_control: 3
- P5_broad_query_block: 3

P5 benign cost (DEFER benign incidents):

| Domain | Benign incidents | Incidents w/ a P5 read denial | Incidents w/ a P5 redaction |
|---|---|---|---|
| cyberops | 60 | 0 | 0 |
| finance | 15 | 0 | 0 |
| healthcare | 15 | 0 | 0 |
| legal | 15 | 0 | 0 |

## T11. Benign tool-proposal denial rate (q235_div4)

One definition, shared with Fig. 3(b) via `analysis/benign_cost.py`: denied tool proposals / all tool proposals, matched on `call_id`, isolated benign runs. The numerator is a subset of the denominator by construction, so this does not mix tool denials with memory-op denials the way a per-trial `collateral_denials` count does.

| Domain | Flat denied % [95%] | ACL-Hardened denied % [95%] | DEFER denied % [95%] |
|---|---|---|---|
| cyberops | 0.0 [0.0, 0.0] (0/1163, k=20) | 54.8 [48.3, 61.4] (640/1168, k=20) | 11.8 [8.2, 15.7] (103/873, k=20) |
| finance | 0.0 [0.0, 0.0] (0/245, k=5) | 18.0 [12.7, 23.0] (41/228, k=5) | 22.7 [16.1, 28.4] (40/176, k=5) |
| healthcare | 0.0 [0.0, 0.0] (0/228, k=5) | 40.7 [31.2, 49.6] (94/231, k=5) | 30.9 [25.4, 36.6] (64/207, k=5) |
| legal | 0.0 [0.0, 0.0] (0/190, k=5) | 11.8 [2.1, 21.9] (22/186, k=5) | 23.2 [19.3, 26.8] (42/181, k=5) |
| **all domains** | 0.0 (0/1826) | 44.0 (797/1813) | 17.3 (249/1437) |

**Added arms.** One row per arm and domain, each from its own runs.

| Arm | Config | Group | Domain | Denied % [95%] |
|---|---|---|---|---|
| judged writes | `defer_writejudge` | q235_div4_e9 | cyberops | 11.7 [8.8, 15.1] (103/878, k=20) |
| judged writes | `defer_writejudge` | q235_div4_e9 | finance | 20.9 [13.9, 27.4] (37/177, k=5) |
| judged writes | `defer_writejudge` | q235_div4_e9 | healthcare | 34.1 [30.1, 39.2] (75/220, k=5) |
| judged writes | `defer_writejudge` | q235_div4_e9 | legal | 24.3 [20.6, 27.6] (44/181, k=5) |
| FULL, E9 re-run (baseline for judged writes) | `defer` | q235_div4_e9 | cyberops | 11.3 [8.9, 13.9] (100/884, k=20) |
| FULL, E9 re-run (baseline for judged writes) | `defer` | q235_div4_e9 | finance | 21.5 [14.0, 28.0] (38/177, k=5) |
| FULL, E9 re-run (baseline for judged writes) | `defer` | q235_div4_e9 | healthcare | 31.9 [25.4, 38.4] (69/216, k=5) |
| FULL, E9 re-run (baseline for judged writes) | `defer` | q235_div4_e9 | legal | 23.6 [20.4, 27.2] (42/178, k=5) |

## T12. Benign denials by principle and check (q235_div4, DEFER)

E14: every benign denial attributed to the check that made it, with the tools or stores it denied most. The LLM panel is separated from the deterministic P3 layers; the gate event that merely surfaces a panel rejection is not counted twice.

| Domain | Principle | Check | Denials | Top denied targets |
|---|---|---|---|---|
| cyberops | P2 | P2 parameter rule violation | 38 | T8_iam_pam (38) |
| cyberops | P3 (panel) | P3 llm consensus reject | 24 | P3_L6 (24) |
| cyberops | P2 | P2 target not in evidence | 21 | T9_firewall (11), T11_epp_av (6), T12_ansible (3) |
| cyberops | P3 | P3 bulk action | 15 | T11_epp_av (13), T12_ansible (2) |
| cyberops | P4 | P4 metadata invalid | 6 | M1 (6) |
| cyberops | P2 | P2 manifest enforcement | 5 | T8_iam_pam (3), T3_edr_ndr (1), T6_siem_search (1) |
| cyberops | P4 | P4 schema violation | 3 | M6 (3) |
| finance | P3 (panel) | P3 llm consensus reject | 17 | P3_L6 (17) |
| finance | P4 | P4 schema violation | 15 | FM4 (15) |
| finance | P3 | P3 bulk action | 12 | F9_chargeback_processor (12) |
| finance | P2 | P2 parameter rule violation | 6 | F10_wire_recall (6) |
| finance | P2 | P2 wildcard parameter | 3 | F5_graph_analysis (3) |
| finance | P5 | P5 broad query block | 3 | FM1 (3) |
| finance | P2 | P2 target not in evidence | 2 | F8_account_freeze (2) |
| healthcare | P3 (panel) | P3 llm consensus reject | 53 | P3_L6 (53) |
| healthcare | P4 | P4 similarity reject | 36 | HM5 (12), HM7 (12), HM6 (6) |
| healthcare | P4 | P4 schema violation | 15 | HM1 (15) |
| healthcare | P3 | P3 bulk action | 8 | H10_insurance_preauth (5), H9_procedure_scheduler (3) |
| healthcare | P2 | P2 wildcard parameter | 3 | H3_lab_results (3) |
| legal | P3 (panel) | P3 llm consensus reject | 36 | P3_L6 (36) |
| legal | P4 | P4 schema violation | 15 | LM1 (15) |
| legal | P4 | P4 similarity reject | 15 | LM8 (9), LM6 (3), LM3 (3) |
| legal | P2 | P2 parameter rule violation | 6 | L10_payment_processing (6) |

## T13. Checks by tier: what each intercepts and what it costs (q235_div4)

One tier mapping (`analysis/tiers.py`) shared with the figures. Content-independent rules decide from structure alone and cannot be reworded past; content-dependent rules read the proposal and can be; similarity is the tunable embedding tier; the panel is the judges. P2.2 (target not in evidence) has a substring and a cosine branch that the committed logs do not tell apart; it is counted as content-dependent here.

| Tier | Check | Attack first interceptions | Benign denials |
|---|---|---|---|
| Rule (content-independent) | P4 schema violation | 48 | 48 |
| Rule (content-independent) | P5 access control | 12 | 0 |
| Rule (content-independent) | P2 critical asset | 8 | 0 |
| Rule (content-independent) | P3 replay detection | 5 | 0 |
| Rule (content-independent) | P1 config integrity violation | 4 | 0 |
| Rule (content-independent) | P3 bulk action | 4 | 35 |
| Rule (content-independent) | P2 high criticality destructive | 1 | 0 |
| Rule (content-independent) | P3 execution verification | 1 | 0 |
| Rule (content-independent) | P2 manifest enforcement | 0 | 5 |
| Rule (content-dependent) | P2 parameter rule violation | 28 | 50 |
| Rule (content-dependent) | P3 handoff validation | 16 | 0 |
| Rule (content-dependent) | P3 operational context | 14 | 0 |
| Rule (content-dependent) | P5 broad query block | 12 | 3 |
| Rule (content-dependent) | P2 wildcard parameter | 3 | 6 |
| Rule (content-dependent) | P4 metadata invalid | 3 | 6 |
| Similarity threshold | P2 target not in evidence | 74 | 23 |
| Similarity threshold | P4 similarity reject | 0 | 51 |
| LLM panel | P3 llm consensus reject | 155 | 130 |
| **tier totals** |  |  |  |
| **Rule (content-independent)** |  | **83** | **88** |
| **Rule (content-dependent)** |  | **76** | **65** |
| **Similarity threshold** |  | **74** | **74** |
| **LLM panel** |  | **155** | **130** |

## T14. Where P3 decisions were taken (q235_div4)

E1.3: the paper states no proposal was ever auto-approved. The logs show the stronger fact -- the deterministic gate never decided at all, so every consequential proposal that survived the deterministic denials reached the panel (or, under symbolic-only, was escalated).

| Config | Layer | Mechanism | Tier | Decision | Count |
|---|---|---|---|---|---|
| Symbolic only (no L6) | LLM panel (P3.10) | P3 symbolic escalate | — | escalate | 2362 |
| DEFER | LLM panel (P3.10) | P3 llm consensus reject | LLM panel | deny | 3631 |
| DEFER | LLM panel (P3.10) | P3 llm consensus approve | LLM panel | allow | 1662 |
| **all configs** | **deterministic auto-decisions (P3.7 + P3.9)** |  |  |  | **0** |

## T16. Validator availability: which results an out-of-credit API validator decided

GPT-4o was unavailable from about 09:00 UTC on 20 September and Claude Sonnet 4.5 from about 15:00 UTC on 22 September, both until about 18:00 UTC on 23 September; the panel counted their errors as rejections. A round is open when the missing votes could have changed its outcome; the direct bound credits every open panel rejection of an attack proposal as an approval (analysis/outage.py).

| Arm | Trials | Open % | ASR as run % | Direct bound % | ASR, determinate trials % (n) |
|---|---|---|---|---|---|
| FULL, development | 225 | 28.4 | 6.7 | 6.7 | 4.3 (161) |
| FULL, transfer | 675 | 26.7 | 5.8 | 10.5 | 6.5 (495) |
| JudgeOnly | 225 | 51.1 | 24.4 | 34.7 | 26.4 (110) |
| FULL minus P1 | 204 | 26.5 | 7.4 | 7.8 | 4.7 (150) |
| FULL minus P2 | 204 | 27.5 | 12.3 | 12.7 | 11.5 (148) |
| FULL minus P4 | 225 | 29.3 | 9.3 | 9.3 | 5.7 (159) |
| FULL minus P5 | 225 | 30.2 | 8.9 | 8.9 | 4.5 (157) |
| Llama-4-Scout, CyberOps | 225 | 59.1 | 1.3 | 8.0 | 2.2 (92) |
| Llama-4-Scout, finance | 225 | 22.2 | 3.6 | 9.3 | 4.6 (175) |
| Mistral-Small, CyberOps | 225 | 35.6 | 2.7 | 9.3 | 2.8 (145) |
| Mistral-Small, finance | 225 | 32.0 | 0.4 | 3.6 | 0.0 (153) |
| Llama-3.1-8B, CyberOps | 225 | 15.6 | 4.0 | 4.0 | 4.7 (190) |
| Llama-3.1-8B, finance | 225 | 7.6 | 9.3 | 9.3 | 9.1 (208) |
| permissive gate | 204 | 40.2 | 5.9 | 5.9 | 9.8 (122) |
| no auto-approve (not reported) | 225 | 84.9 | 1.3 | 15.1 | 0.0 (34) |
| P2 + panel (not reported) | 225 | 98.2 | 9.3 | 39.6 | 0.0 (4) |
| E2 siblings and parents, FULL | 153 | 53.6 | 2.0 | 16.3 | 1.4 (71) |
| judged writes (E9), FULL | 204 | 0.0 | 4.4 | 4.4 | 4.4 (204) |
| judged writes (E9), writejudge | 204 | 0.0 | 2.5 | 2.5 | 2.5 (204) |
