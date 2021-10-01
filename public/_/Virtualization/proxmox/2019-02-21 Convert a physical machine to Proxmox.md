# 2019-02-21 How to covert a physical machine to be used with proxmox (p2v)

Conversion needs to be made in two steps, first to VHD and then converted to a .qcow2 format.

## Capturing

Dump the physical machine with Disk2VHD: <https://docs.microsoft.com/en-us/sysinternals/downloads/disk2vhd>

## Converting

Next, install qemu (download from <https://www.qemu.org/download/> or <https://qemu.weilnetz.de/w64/> (windows))

```
qemu-img convert -p -O qcow2 SOURCEFILE.VHDX DESTFILE.qcow2
```

## Adding to Proxmox

Create an empty vm in Proxmox with the needed settings. Take notice of the VM-ID.

Next SSH to Proxmox and check the created machine. This example uses VM-ID of 200.

```
ls -la /var/lib/vz/images/200
```

Example output:

```
vm-200-disk-1.qcow2
```

Now overwrite the main image with the .qcow2 file of your choice (alternatively add it as a new disk from the UI).

`!` If you've installed Proxmox using ZFS, then `/var/lib/vz/images` will be empty - I have no information about this, sorry.

## Additional information

[Converting a Hyper-V vhdx for use with KVM or Proxmox VE](https://www.servethehome.com/converting-a-hyper-v-vhdx-for-use-with-kvm-or-proxmox-ve/2/)
