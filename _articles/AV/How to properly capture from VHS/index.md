---
layout: article
title: How to properly capture from VHS (PAL) without audio sync errors
description:
date: 2014-01-03
tags: audiovideo
supertag: audiovideo
---

:!: This article is super old and may not apply. Still, it did take me many tries to get it right, so it might give some hints.

## How to properly capture from VHS

### Install x264 VfW codec

[http://sourceforge.net/projects/x264vfw/](http://sourceforge.net/projects/x264vfw/)

Note: Make sure you get the VfW version of the x264 codec. If you download the .exe version, you'll have to use it through a command line, which I won't cover here and is a bit more technical. VfW stands for Video for Windows. It basically
means you can use VirtualDub instead of the command line.

### Download AC3

[http://www.videohelp.com/download/AC3ACM22.zip](http://www.videohelp.com/download/AC3ACM22.zip)

Install as administrator!

### Download and unpack VirtualDub (if you lack codecs, try the 32 bit version)

* Go to File --\> Capture AVI
* Device --\> Choose your capture device
* File --\> Set Capture File
* Choose Video --\> Compression --\> x264vfw. Optionally use "configure".

![](media/564ab33de71defa123e31955e83efba2.png)

![](media/da439bea54d60348cb5aca3bffdb9dd0.png)

![](media/c22b3a78e717910890b522211428b17a.png)

![](media/099ff37706e71e0d3c8f12d12e07a091.png)

Capture Pin

![](media/70be33bb3fb8ddf4d68b749b70408a1b.png)

Capture Filter

![](media/76973b657a6c82c7b88594a1a8db0f3e.png)

Audio -\> Windows Mixer

Decrease levels!

![](media/e35a61cfa0ca0fd3e1b63693eb6b6c32.png)

<http://www.fourcc.org/codecs.php>

![](media/baf94ce75423c5371a27ddbc6a0eca36.png)

## Correcting Audio Drift

It's possible to change the audio speed on the movie *without* reencoding it.

![](media/20332e5bf1c77d6b75919bbda0fbd9c1.png)

Find out the length in seconds + current framerate:

Example:

* Video: 7670.056, 25.0000
* Audio: 7671.048

Calculate new framerate (changing dwRate and dwScale):

They will be:

* VideoLenght*OldFrameRate = 191750
* Reuse the audio length: 7671

Next, use [AVIFRATE.EXE](https://www.dropbox.com/s/aeu4gkk23byob53/AVIFRATE.EXE?dl=1)

```batch
AVIFRATE.EXE movie.avi -setfps 191750 7671
```

to set a fps of 24.997 use:

```batch
AVIFRATE.EXE movie.avi -setfps 24997000 1000000
```

Avifrate [homepage](http://www.am-softhome.com/avifrate.html)
