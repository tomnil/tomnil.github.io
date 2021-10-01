---
layout: article
title: dd with progressbar
description: dd is super silent by default, but it's possible to add a progressbar
date: 2019-02-21
tags: linux
supertag: linux
---

The secret is to pipe the entire process through ```pv```:

```bash
apt-get install pv
dd if=/dev/zero | pv | dd of=myfile.txt bs=$((1024*1024)) count=$((1*1024))
```

This gives a progressbar such as:

```bash
  72MiB 0:00:02 [26.8MiB/s] [    <=>   
```
