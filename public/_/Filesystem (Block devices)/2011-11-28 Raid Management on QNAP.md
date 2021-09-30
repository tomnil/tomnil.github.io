# 2011-11-28 Raid Management on QNAP

`!` `!` `!` WARINING: This document was originally written in **2011-11-28** (when my Raid crashed) and all command might **significantly** have changed since then. Still, there might be some useful information here :)

## Raid examination

To examine the raid config:

```bash
cat /proc/mdstat
df -h
mdadm --detail /dev/md0
cat /etc/mdadm.conf
```

Manually mount the raid:

```bash
mount /dev/md0 /share/MD0_DATA/
```

## Rescue the raid (Do NOT try this at home)

*WARNING* Do not try this unless you know what you're doing. **It might destroy all your data.**

```bash
Stop all services
/etc/init.d/services.sh stop

# Dismount
umount /share/MD0_DATA

# Scan the raid
mdadm -S /dev/md0

# Try to reassemble the raid
mdadm -A /dev/md0 /dev/sda3 /dev/sdb3 /dev/sdc3

# Check the filesystem
e2fsck -y /dev/md0

# Mount
mount /dev/md0 /share/MD0_DATA -t ext4

# Restart services
/etc/init.d/services.sh start
```
