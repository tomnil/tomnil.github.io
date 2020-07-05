---
layout: article
title: Change speed of mp4
description:
date: 2014-01-03
tags: mp4 audiovideo ffmpeg
supertag: mp4
---

You can change the speed of your video using the setpts (set presentation time stamp) filter of FFmpeg. This command will make the video 8x (1/8) faster or use setpts=4*PTS to make the video 4x slower.

```bash
ffmpeg -i input.mp4 -filter:v "setpts=0.125*PTS" output.mp4
```
