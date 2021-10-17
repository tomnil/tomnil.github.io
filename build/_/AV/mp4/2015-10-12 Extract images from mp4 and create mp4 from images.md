# Extract images from mp4 + create mp4 from images


## Extract single image

```bash
ffmpeg -ss 00:00:15 -i video.mp4 -vf scale=800:-1 -vframes 1 image.jpg
```

## Extract image every 4 seconds

```bash
ffmpeg -i movie.mp4 -r 0.25 frames_%04d.png
```

## Create mp4 from images

Create video slideshow from images

```bash
ffmpeg -r 1/5 -i img%03d.png -c:v libx264 -r 30 -pix_fmt yuv420p slideshow.mp4
```

Example 2

```bash
ffmpeg.exe -framerate 10 -start_number 7088 -i DSC_%03d.JPG -vcodec libx264 -s 640x480 out.mp4
```

## Create animated gif

```bash
ffmpeg -i video.mp4 -vf scale=500:-1 -t 10 -r 10 image.gif
```
