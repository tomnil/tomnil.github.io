---
layout: article
title: Split mp4 without reencoding
description:
date: 2014-01-03
tags: mp4 audiovideo ffmpeg
supertag: mp4
---

* -t = duration
* -ss = position (input/output)

```bash
ffmpeg -i source.mp4 -t 00:00:50 -c copy small-1.mp4 -ss 00:00:50 -codec copy small-2.mp4
```
