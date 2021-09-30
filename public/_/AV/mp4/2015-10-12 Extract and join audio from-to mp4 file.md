
# Extract and join audio from/to mp4 file

## Extract (demux)

```bash
ffmpeg -i video.mp4 -vn -ab 256 audio.mp3
```

## Join (mux)

```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -strict experimental output.mp4
```

You can also specify the -shortest switch to finish the encoding when the shortest clip ends.

```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -strict experimental -shortest output.mp4
```

## Crop an audio file

```bash
ffmpeg -ss 00:01:30 -t 30 -acodec copy -i inputfile.mp3 outputfile.mp3
```
