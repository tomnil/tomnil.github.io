---
layout: article
description:
title: How to setup Home Assistant on Raspberry PI
date: 2017-11-28 
tags: homeautomation hass 
supertag: hass
---

## Description

This document describes how to install Home Assistant on a Raspberry PI. You
will also get information about how to start “Hass” and how to setup Samba
sharing (so the configuration.yaml can be edited from your favorite editor)

## Prerequisites

A Raspberry running vanilla Raspberian.

## Installing Home Assistant

Before installing Hass we need to install Python 3.6

### Install Python 3.6

```bash
sudo apt-get install build-essential tk-dev libncurses5-dev libncursesw5-dev
libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev
libexpat1-dev liblzma-dev zlib1g-dev

wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz

tar xzvf Python-3.6.0.tgz

cd Python-3.6.0/

./configure

make

sudo make install

python –version

# Should return something like Python 2.7.9

python3 --version

# Should return Python 3.6

pip3 --version

# Should return Python 3.6
```

## Install Home Assistant

```bash
# Create account (and home dir)

sudo useradd -rm homeassistant

# Next, install the product (all config files will remain in \~/homeassistant)

cd /srv

sudo mkdir homeassistant

sudo chown homeassistant:homeassistant homeassistant

# Next, become homeassistant and install

sudo su -s /bin/bash homeassistant

# And do the install

cd /srv/homeassistant

python3 --version

python3 -m venv .

source bin/activate

# As the virtual user

pip3 install homeassistant
```

All done.

### (Re)starting Home Assistant

#### Becoming user “homeasssistant”

The HomeAssistant must run as user homeassistant! If you’re "pi", run:

```
sudo su -s /bin/bash homeassistant
cd /srv/homeassistant
source bin/activate
```

### Starting Home Assistant

```
hass
```

### Result

Check the result: http://HOSTNAME:8123/states

### Restarting?

Just press ctrl-c to stop “hass”. It might take some few seconds.

## Setup Samba

Install samba (there’s a ton of documents describing this).

Next, edit smb.conf:

```
sudo pico /etc/samba/smb.conf
```

.. and add the following:

```
[homeassistant]
comment=Homeassistant Home
path=/home/homeassistant/
browseable=Yes
writeable=Yes
only guest=no
create mask=0777
directory mask=0777
public=no
hide dot files=no
```

You also need to set a password on _Samba_ HomeAssistant account. It can be the
same password as the _local_ HomeAsssistant password.

```
sudo smbpasswd -a homeassistant
sudo /etc/init.d/samba restart
```

## Configuration.yaml

This is the main configuration file (this is the first configuration file Hass
loads upon start). It includes some sub files as well. It can be found at the
following places:

| Local path  | /home/homeassistant/.homeassistant/configuration.yaml           |
| ----------- | --------------------------------------------------------------- |
| Remote path | \\\\HOSTNAME\\homeassistant\\.homeassistant\\configuration.yaml |

**Important:** yaml is configured using **spaces**.

## More information:

Official guide (uses old version of Python): https://home-assistant.io/docs/installation/raspberry-pi/

