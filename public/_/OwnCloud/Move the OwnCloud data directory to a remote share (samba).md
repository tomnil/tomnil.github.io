# 2019-03-19 Move the OwnCloud data directory to a remote share (samba)

`!` - Owncloud as of 2019-08 isn't very stable when the amount of files and changes increases. I have uninstalled the product, but still this information might be valuable.


### Create a new user

1. Logon to the UI <https://IP/>

* `!`: If you cannot login, SSH to the owncloud machine and edit ```/usr/share/owncloud/config/config.php``` and add the ip number of the server to the array (search for trusted_domains.)

2. Login to the OwnCloudUI

* `!`: Forgot the password? Use SSH and use the occ command (this has to run as the wwww-data user): ```sudo -u www-data php /usr/share/owncloud/occ user:resetpassword admin```.

3. Create a new user in the OwnCloud UI.


### Locate the Owncloud data folder

SSH to the owncloud machine. To see which root folder that has been configured:

```bash
more /usr/share/owncloud/config/config.php
```

Take note of the path.

### Mount remote location

```bash
# change the path here, if needed
cd  /usr/share/owncloud/data

# create a folder where to mount the remote storage
mkdir temp

# mount the remote storage (change the parameters as needed here).
mount -v -t cifs //SERVERNAME/SHARENAME temp -o vers=1.0,username=THEUSER,password=THEPASSWORD

# check you can access it
ls -la temp
```

`!` Only use 1.0 if you must.

### Copy the data to a new location :)

```bash
# Owncloud must be stopped during copy
systemctl stop apache2

# Copy the data
rsync -av data temp

# Dismount temp
umount temp
```

### Rename the old data folder and create an empty folder

```bash
# Move away the data folder
mv data olddata

# Create new data folder
mkdir data
```

### Create the real (permanent) mountpoint

You need to specify the mount to be readable by www-data (which owncloud runs as).

```bash
id www-data
```

Take note of the uid and gid:

```bash
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

Next, edit fstab:

```bash
nano /etc/fstab
```

Add needed mount. This example shows how to mount a remote CIFS/Samba share.

Change all needed parameters here, but let dir_mode and file_mode be as-is.

```bash
//SERVERNAME/SHARENAME /usr/share/owncloud/data cifs vers=1.0,username=THEUSER,password=THEPASSWORD,uid=33,gid=33,dir_mode=0770,file_mode=0660
```

Save and test the mount:

```bash
mount -a
ls -la /usr/share/owncloud/data

# if needed, use this to dismount and try again:
umount //SERVERNAME/SHARENAME
```

### Start up

```bash
systemctl start apache2
```
