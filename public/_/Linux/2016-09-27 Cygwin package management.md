---
layout: article
title: Cygwin - Linux tools on Windows
description:
date: 2016-09-27
tags: tools
supertag: tools
---

Cygwin is a pretty cool way to add Linux tools to your Windows system, without running a fullblown Virtual Machine (or Ubuntu on Windows).

Download from [https://cygwin.com/install.html](https://cygwin.com/install.html).

Now there are a couple of things that really help out using cygwin.

### Adding packages post install

So running the setup.exe will show the install dialog, enabling adding and removing packages. It's also possible to use command line:

```cmd
setup-x86_64.exe -q -P wget,tar,more
```

## apt-cyg

There is an old package manager as well, see [https://github.com/transcode-open/apt-cyg](https://github.com/transcode-open/apt-cyg).

To install:

```cmd
lynx -source rawgit.com/transcode-open/apt-cyg/master/apt-cyg > apt-cyg
install apt-cyg /bin
```

and to use:

```cmd
apt-cyg install nano
```
