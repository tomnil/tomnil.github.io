---
layout: article
title:  Install TrueNas without allocating all available space
description:
date: 2020-02-05
tags: virtualization
supertag: virtualization
---

# TrueNas installation

It's very easy to install TrueNas on a harddrive without using the entire disk for the system.

Do acheive this do the following:

1. Download TrueNas and write it to a usbstick (for example, using Rufus).
2. Insert the USB into your destination system (note, it will be wiped clean)
3. Boot from the USB
4. **Important - read this**: On the menu that appears, choose to install *both* on harddrive and USB stick **at the same time**. The installations will be mirrored (and the trick here is that the harddrive partitions sizes will reflect USB-stick partition sizes!!)
5. When completed install, reboot (using both USB stick and harddrive)
6. Removing the mirror. Open shell and run:

```bash
zpool status
```

7. Find the ID of the USB stick and run the reflecting commands:

```bash
zpool offline boot-pool gptid/5ffbdb9b-6787-11eb-8076-1c697aa027de
zpool detach boot-pool gptid/5ffbdb9b-6787-11eb-8076-1c697aa027de
zpool status

```

8. Next, shutdown and remove the USB.
9. Boot again (without the USB).

10. Now it's time to get that spare space still on the drive to appear in the User Interface. To do this, execute the following:

```bash
gpart add -t freebsd-zfs -l jail0 nvd0
zpool create -f jail /dev/nvd0p3
umount /jail
zpool export jail
```

11. Logon to the WebUI (<http://192.168.1.xxxx>)
12. Go to Storage => Pools
13. Click "Add" and then "Import Existing pool".
14. Find the "jail" pool and click import.
15. Done :)

16. Optional step - add dedup. This requires a lot of memory, so be careful.

```bash
zfs set dedup=on jail
```

Enjoy :)







