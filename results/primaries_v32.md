# Judgment boundary for gpt-oss-120b and Llama-3.1-8B (live at v3.2, CyberOps)

JUDGEONLY and FULL: direct outcome under Local4 (live local2 value in `live_local2`).

## gpt-oss-120b

| Config | ASR % [95% CI] | Attempt % | Block|att. % | Judged % | Benign denied % |
|---|---|---|---|---|---|
| FLAT | 21.3 [12.4, 30.2] | 21.3 | 0.0 | 0 | 0.0 |
| ACL | 18.7 [10.7, 28.0] | 20.0 | 6.7 | 0 | 0.0 |
| JUDGEONLY | 19.1 [10.7, 28.0] | 20.4 | 6.5 | 100.0 | 0.6 |
| NOJUDGE | 1.3 [0.0, 4.0] | 19.1 | 93.0 | 0 | 33.3 |
| FULL | 6.3 [1.3, 12.1] | 18.4 | 65.9 | 9.2 | 22.8 |

## Llama-3.1-8B

| Config | ASR % [95% CI] | Attempt % | Block|att. % | Judged % | Benign denied % |
|---|---|---|---|---|---|
| FLAT | 32.9 [22.7, 43.6] | 32.9 | 0.0 | 0 | 0.0 |
| ACL | 32.4 [22.2, 43.1] | 33.8 | 3.9 | 0 | 1.5 |
| JUDGEONLY | 26.7 [17.3, 36.4] | 40.9 | 34.8 | 100.0 | 10.0 |
| NOJUDGE | 1.3 [0.0, 4.0] | 47.3 | 97.2 | 0 | 65.8 |
| FULL | 8.2 [3.2, 14.0] | 40.0 | 79.5 | 48.8 | 8.5 |
