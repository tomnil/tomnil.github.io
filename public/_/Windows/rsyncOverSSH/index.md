# 2020-11-23 rsync over ssh between two Windows machines

## Description

This document describes how to use ```rsync over ssh``` from one Windows machine to another.

---

## Server installation

### SSH Service

Begin with adding the Microsoft supported ```openssh``` server. Open a powershell in admin mode and run:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'
```

### rsync on the server

rsync isn't supplied by Microsoft, but there are alternatives. This guide is based on ```cwrsync``` (download the *client* from [https://itefix.net/cwrsync]).

Extract the contents on the desktop of the target account (ie, ```c:\users\admin\desktop\cwrsync```)

---

## Client installation

### Establish ssh client

For the client we're going to use the same ```cwrsync```. So extract it again :)

Now, open a ```cmd``` and make your way into the ```cwrsync``` folder. First try to establish an ordinary ```ssh``` connection to the server just to ensure the connection works.

```powershell
ssh server1
```

Also, understand where you're "located" by running:

```powershell
ssh -f admin@server1 'dir'

# Or, to see if you can find a tool like rsync...
ssh -f admin@server1 'where rsync'
```

---

### Setting up rsync

If you followed the advice on extracing ```cwrsync``` on the desktop, the path will be something like ```.\desktop\cwrsync_6.1.0_x64_free``` (seen from the ssh view).

This means running rsync over ssh will look like this (it's safe to run this: if all is ok you will make a "ls" (or "dir" for Windows people))

```powershell
rsync -e ./ssh.exe --rsync-path=.\desktop\cwrsync_6.1.0_x64_free\bin\rsync "admin@server1:/"
```

If all is good, then you can see that ```/``` will reflect the directory where ```rsync.exe``` is stored. More importantly, note the virtual folder ```cygdrive``` which contains all drives on the destination system. So to list the ```c:\``` use:

```powershell
rsync -e ./ssh.exe --rsync-path=.\desktop\cwrsync_6.1.0_x64_free\bin\rsync "admin@server1:/cygdrive/c/"
```

## Syncronizing folders

:!: Important! Again - ```cwrsync``` uses ```cygwin``` paths. ```/cygdrive/c/windows/``` is equal to ```c:\windows\```

To syncronize the entire ```desktop``` folder to the remote ```c:\test``` folder, run this:

```powershell
rsync -avz -e ./ssh.exe --rsync-path=.\desktop\cwrsync_6.1.0_x64_free\bin\rsync "/cygdrive/c/users/admin/desktop/" "admin@server1:/cygdrive/c/test/"
```

## Enjoy

:)
