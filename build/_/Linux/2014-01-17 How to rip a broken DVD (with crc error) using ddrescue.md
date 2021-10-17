# 2014-01-17 How to rip a broken DVD (with crc error) using ddrescue

This guide is based on Cygwin in Windows but should give tips for any Linux flavour.

# Installing

Install latest version of cygwin and make sure to include package "genisoimage".

Also, recommended:

- Nano
- DDRescue
- cdda2wav
- mkisofs
- util-linux package (includes the "more" command)

# Rescuing

There's a number of options here, and we're going through some of them. Begin with gertting a #root command line (for Cygwin, "run as administrator")

## ddrescue (fast, accurate - recommended!)

ddrescue should fix the problem. It's possible to run both forwards and backwards:

```bash
ddrescue -b 2048 -n -v /dev/sr0 image.iso image.log

time ddrescue -b 2048 -v --try-again --retries=10 --reverse /dev/sr0 rescue5.iso image5.log
```

### dd

It's also possible to try to make a copy of the disc using dd:

```bash
dd if=/dev/sr0 of=disc1.iso bs=2048 count=$(isosize -d 2048 /dev/dvd) conv=noerror,sync,notrunc

dd if=/dev/sr0 of=disc1.iso bs=1M conv=noerror,sync
```

- /dev/sr0 = First DVD Player
- conv=noerror = Don't stop for errors
- Sync = I think it's write zeros when unreadable blocks is found
- notrunc = Do not truncate output file

Read more about dd for example here <http://www.noah.org/wiki/Dd_-_Destroyer_of_Disks>

### Devices in cygwin

| POSIX device name | Internal NT device name                                |
| ----------------- | ------------------------------------------------------ |
| /dev/fd0          | \\device\\floppy0                                      |
| /dev/sr0          | \\device\\cdrom0                                       |
| /dev/scd0         | \\device\\cdrom0                                       |
| /dev/sda          | \\device\\harddisk0\\partition0 (whole disk)           |
| /dev/sda1         | \\device\\harddisk0\\partition1 (first partition)      |
| ...               |                                                        |
| /dev/sda15        | \\device\\harddisk0\\partition15 (fifteenth partition) |

# Windows on Ubuntu (added 2018-01-16)

In order to get hold of the drive you need to mount it:

```bash
sudo mkdir /mnt/d
sudo mount -t drvfs D:  /mnt/d
sudo umount /mnt/d
```

or:

```bash
sudo mkdir /mnt/g
sudo mount -t drvfs G: /mnt/g
sudo umount /mnt/g/
```

Additional example:

```bash
sudo mount -t drvfs f: /mnt/f
ddrescue -n -r1 /mnt/f /mnt/c/Users/admin/Desktop/rescue.iso
```
