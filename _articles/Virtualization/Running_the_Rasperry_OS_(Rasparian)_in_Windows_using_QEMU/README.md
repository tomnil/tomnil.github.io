---
layout: article
title:  Running the Rasperry OS (Rasparian) in Windows using QEMU
description:
date: 2017-04-15
tags: raspberrypi virtualization
supertag: raspberrypi
---

## Setup

Download and extract this [RasparianOnWindows](RasparianOnWindows.zip) with all needed tools and additional BAT-files to make this really simple to setup.

`!` This setup i based on the [Raspberry Pi emulation for Windows](https://sourceforge.net/projects/rpiqemuwindows/).

| Filename            | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| Start Rasparian.bat | Starts Raspberry. If a snapshot exists, it's used.                            |
| Create Snapshot.bat | Creates a snapshot (all changes to the filesystem is written to snapshot.img). Note - only **one** snapshot is supported. |
| Delete Snapshot.bat | Asks to delete a snapshot, if one exists.                                     |

## Starting up

Username/password: pi / raspberry

On running for the first time you will see a configuration screen. Use tab/arrow keys to navigate.

## Upgrading

Download a new image and place in "img" folder.
Kernel upgrade - download and place in "kernel" folder.

Full upgrade (manual) - See https://www.pcsteps.com/1199-raspberry-pi-emulation-for-windows-qemu/

## Snapshot

Doubleclick the corresponding file to snapshot / delete the snapshot.