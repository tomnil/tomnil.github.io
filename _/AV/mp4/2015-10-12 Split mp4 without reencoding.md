# Split mp4 without reencoding

* -t = duration
* -ss = position (input/output)

```bash
ffmpeg -i source.mp4 -t 00:00:50 -c copy small-1.mp4 -ss 00:00:50 -codec copy small-2.mp4
```
