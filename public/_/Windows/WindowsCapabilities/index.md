# 2020-09-24 Windows capabilities => Get-WindowsCapability vs DISM


## Listing available capabilities

```powershell
Get-WindowsCapability -Name RSAT* -Online | Select-Object -Property DisplayName, State, Name
# or without powershell:
DISM /Online /Get-Capabilities
```

To filter, add for example:

```powershell
  Where-Object {( $_.State -eq 'Installed' -or $_.State -eq 'Staged' )}
```

## Install

Specific capability:

```powershell
Add-WindowsCapability -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0 -online
# or without powershell (use name from DISM output, and not Add-WindowsCapability)
DISM /online /Add-Capability /CapabilityName:"Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0"
```

All matching RSAT*:

```powershell
Get-WindowsCapability -Name RSAT* -Online | Add-WindowsCapability -Online
```

:!: Even if Add seems to install without troubles, make sure you check the install state. Sometimes it get stuck in 'staged'. It does not help to reboot. If you cannot remove using powershell, then using DISM works! See below.

## Remove

This removes all RSAT tools

```powershell
Get-WindowsCapability -Name RSAT* -online |  Where-Object {( $_.State -eq 'Installed' -or $_.State -eq 'Staged' )} | Remove-WindowsCapability -Online -Name Name
```

```DISM``` and ```Get-WindowsCapability``` doesn't have the same namning standards, so this will **not** work:

```powershell
# Fail...
Get-WindowsCapability -Name RSAT* -online |  Where-Object {( $_.State -eq 'Installed' -or $_.State -eq 'Staged' )} | ForEach-Object {DISM /Online /Remove-Capability /CapabilityName:"$_.Name"}
```

So to uninstall using DISM, list packages using DISM and uninstall one-by-one:

```powershell
# List packages
DISM /Online /Get-Capabilities
# Or...
DISM /Online /Get-Capabilities | findstr /I "rsat"

# Uninstall commands
DISM /online /Remove-Capability /CapabilityName:"Rsat.BitLocker.Recovery.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.CertificateServices.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.DHCP.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.Dns.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.FailoverCluster.Management.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.FileServices.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.GroupPolicy.Management.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.IPAM.Client.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.LLDP.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.NetworkController.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.NetworkLoadBalancing.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.RemoteAccess.Management.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.RemoteDesktop.Services.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.ServerManager.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.Shielded.VM.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.StorageMigrationService.Management.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.StorageReplica.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.SystemInsights.Management.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.VolumeActivation.Tools~~~~0.0.1.0"
DISM /online /Remove-Capability /CapabilityName:"Rsat.WSUS.Tools~~~~0.0.1.0"

# Must be one of the last ones
DISM /online /Remove-Capability /CapabilityName:"Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0"

```

## More capability commands ?

Use this to list them all:

```powershell
get-command -Type cmdlet | Where-Object {( $_.Name -like "*Capability*" )}
```
