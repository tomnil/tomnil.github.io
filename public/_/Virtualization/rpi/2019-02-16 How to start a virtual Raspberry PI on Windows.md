# 2019-02-16 How to start a virtual Raspberry PI on Windows


This document describes the steps how to achieve a working Raspberry PI (X86)
virtual machine.

## Prerequisites

You need the Raspberry X86 ISO and VirtualBox (already installed) on your
machine.

### ISO Download

Here’s the ISO: <http://rpf.io/x86iso>

### VirtualBox

<https://www.virtualbox.org/wiki/Downloads>

## Configuring your virtual machine

Start VirtualBox. On the Menu, choose “Machine New”. Go through the wizard with
using the following facts:

| Name:                     | RPiX86 _(or whatever you prefer)_  |
| ------------------------- | ---------------------------------- |
| Type:                     | Linux                              |
| Version:                  | Other Linux (32-bit)               |
| Memory size:              | 1024MB                             |
| Hard disk:                | Choose “Create a Virtual Disk Now” |
| Hard disk type:           | Choose “VDI”                       |
| Storage on physical disk: | Choose “Dynamically Allocated”     |
| File location and size:   | RPiX86                             |

The machine is now created, but before booting, change the following settings
(right click the machine and choose “Settings”)

| General Tab “Advanced”  | Set bidirectional on “Shared Clipboard” and “Drag’n’Drop”   |
| ----------------------- | ----------------------------------------------------------- |
| System Tab “Processor”  | Check “Enable PAE/NX”                                       |
| Display Tab “Screen”    | Change video memory to 128Mb. Check enable 3D acceleration. |
| Network Tab “Adapter 1” | Change to “Bridged Adapter”                                 |

Save.

## First time booting the machine

Right click the machine and choose Start Normal Start.

Since the operating system is missing, VirtualBox will ask for a bootable media.
Browse to the RPiX86 ISO (download link above) and click OK. Click Start.

## Going Rasperry PI!

At this point the Raspberry install will boot and you’ve got a ton of options.

Select “Graphical Install”.

### Regional settings

Choose keyboard.

### Partition Disks

Select default (Guided – use entire disk). Use defaults and write the changes to
disk.

### Install the GRUB boot loader to the master boot record?

Yes. Select the disk:

![d](media/70b9bda1383f0452fc374261aade07c9.png)

### Reboot

Wait for the reboot to complete.

## Installing VirtualBox tools

Open a terminal and run the following commands to implement better support for
VirtualBox.

```
sudo apt update

sudo apt install virtualbox-guest-dkms virtualbox-guest-x11
linux-headers-\$(uname -r)

sudo shutdown -r now
```

## Update the system

Open an terminal and enter the following commands:

```
sudo apt-get update
sudo apt-get install raspi-config

sudo apt-get dist-upgrade

sudo reboot
```

## Raspi-config

Raspi-Config can change a lot of interesting settings, but you probably only want to
change the hostname, update the password for the “pi” user and enable SSH. Open
a terminal and write:

```
sudo raspi-config
```

Some changes require reboot.

## SSH from your computer to the Virtual Raspberry

SSH is now enabled, and because we used the Network in “Bridged Adapter”, the
Virtual Raspberry is now present on your network as any real Raspberry would be.
You can use any SSH client to connect now.

Find out which name and/or IP the machine has. Open a terminal window and type:

```
hostname

hostname -i
```

## Extra tips

### Snapshot

If you want to do a snapshot, this is a good time. The system is fresh and by
using a snapshot (in VirtualBox), you can easily rollback.

Go to VirtualBox and Choose “Machine Tools SnapShots” (upper right).

Next click “take”.

### Additional tips

I’ve gotten much information from here, but there’s too much clutter (and the VM
is not on the “right” network):
<http://www.aoakley.com/articles/2017-07-04-raspbian-x86-virtualbox.php>

# Donate?

```
Bitcoin: 19CspPcoKJAuMD544HatQK1TJQ7L4354Ke
```
