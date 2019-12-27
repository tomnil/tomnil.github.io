---
layout: article
title:  How to update Proxmox to the latest release (without buying an subscription)
description:
date: 2019-02-21
tags: virtualization proxmox 
supertag: proxmox
---

SSH to the Proxmox machine (or open locally). Edit as:

```bash
nano /etc/apt/sources.list.d/pve-no-subscription.list
```

and add:

```bash
deb http://download.proxmox.com/debian/pve stretch pve-no-subscription
```

Save and exit nano. Next, run the upgrade:

```bash
apt-get update
apt-get dist-upgrade
```

You will most likely need to reboot.
