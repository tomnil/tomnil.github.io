---
layout: article
title: How to setup a Windows Share (Samba) in Raspberry PI
description:
date: 2017-11-28
tags: rpi linux
supertag: rpi 
---

## How to setup a Windows Share (Samba) in Raspberry PI

ssh to the PI and execute the following:

```bash
sudo apt-get install samba samba-common-bin
```

## Modify smb.conf

After install, change as following

```bash
sudo pico /etc/samba/smb.conf
```

Add the following last in the file:

```bash
[pihome]
comment= Pi Home
path=/home/pi
browseable=Yes
writeable=Yes
only guest=no
create mask=0777
directory mask=0777
public=no
```

## SMBPassword

The _Samba PI_ account password is **not** the same as the _PI_ account password. So set the password with:

```bash
sudo smbpasswd -a pi
```

## Reload of the config file

```bash
sudo service smbd restart
```

or

```bash
sudo /etc/init.d/samba restart
```

## View loaded config

(not available on all systems)

```bash
testparm
```

## Testing the result

Replace TheHostName with the name of your machine. From Windows open:

```cmd
\\TheHostName\\pihome
```

On the prompt, enter username and password. To test, copy a file (After a file has been copied, it’s available in the ```/home/pi``` folder). 
