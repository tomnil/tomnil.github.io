---
layout: article
title: Lossless rotate mp4
description:
date: 2014-01-03
tags: mp4 audiovideo ffmpeg
supertag: mp4
---

This command will rotate a video clip 90° clockwise. You can set transpose to 2 to rotate the video 90° anti-clockwise

```bash
ffmpeg -i input.mp4 -filter:v 'transpose=1' rotated-video.mp4
```

This will rotate the video 180°.

```bash
ffmpeg -i input.mp4 -filter:v 'transpose=2,transpose=2' rotated-video.mp4
```
