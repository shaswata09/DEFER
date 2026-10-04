# Judgment boundary for gpt-oss-120b and Llama-3.1-8B (live at v3.1, CyberOps)

JUDGEONLY and FULL: direct outcome under Local4 (live local2 value in `live_local2`).

## gpt-oss-120b

| Config | ASR % [95% CI] | Attempt % | Block|att. % | Judged % | Benign denied % |
|---|---|---|---|---|---|
| FLAT | 21.3 [12.4, 30.7] | 21.3 | 0.0 | 0 | 0.0 |
| ACL | 18.7 [10.7, 28.0] | 20.0 | 6.7 | 0 | 0.0 |
| JUDGEONLY | 21.3 [12.9, 30.7] | 22.7 | 5.9 | 100.0 | 0.0 |
| NOJUDGE | 1.3 [0.0, 4.0] | 19.1 | 93.0 | 0 | 33.3 |
| FULL | 6.2 [1.3, 12.0] | 19.1 | 67.4 | 9.1 | 0.0 |

## Llama-3.1-8B

| Config | ASR % [95% CI] | Attempt % | Block|att. % | Judged % | Benign denied % |
|---|---|---|---|---|---|
| FLAT | 35.1 [24.9, 45.8] | 35.1 | 0.0 | 0 | 0.0 |
| ACL | 34.7 [24.4, 45.3] | 36.0 | 3.7 | 0 | 2.6 |
| JUDGEONLY | 28.4 [19.1, 38.2] | 40.0 | 28.9 | 99.4 | 9.3 |
| NOJUDGE | 1.3 [0.0, 4.0] | 45.1 | 97.0 | 0 | 67.1 |
| FULL | 8.9 [3.6, 15.1] | 42.2 | 78.9 | 45.0 | 14.1 |
