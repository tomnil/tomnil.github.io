---
layout: article
title:  How to run OpenWRT on Raspberry PI
description:
date: 2017-04-15
tags: raspberrypi
supertag: raspberrypi
---

Download ```openwrt-brcm2708-bcm2710-rpi-3-ext4-sdcard.img``` from [GitHub](https://github.com/ARMmbed/mbed-access-point/raw/master/binaries/openwrt-mbedap-v4.0.1-brcm2708-bcm2710-rpi-3-ext4-sdcard.img.gz) and write the SDCard.

## Boot

The RPI will get 192.168.1.1 (on eth0; reconfigure as you like)

Connect a cable to the RPI (it runs a DHCP-server).
Logon to http://192.168.1.1 using a webbrowser.

## Update

SSH to the RPI and execute:

```
opkg update
```
