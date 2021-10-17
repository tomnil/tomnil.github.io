# Concaternate mp4 without reencoding

* -f = format. "concat" is a special method to concaternate files.

Create a file listning all files to be joined:

```text
file 'file1.mp4'
file 'file2.mp4'
file 'file3.mp4'
```

Next, run:

```bash
ffmpeg -f concat -i thefilelist.txt -c copy output.mp4
```

## Alternative method (2015-09-15)

```bash
ffmpeg -i q.mp4 -c copy -bsf h264_mp4toannexb q.ts

ffmpeg -i r.mp4 -c copy -bsf h264_mp4toannexb r.ts

ffmpeg -i "concat:q.ts|r.ts" -c copy -bsf aac_adtstoasc qr.mp4
```
