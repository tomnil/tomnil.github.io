---
layout: article
title:  Make a remote (NAS) folder to look like a local folder using Symlink
description: 
date:  2020-03-10
tags: windows
supertag: windows
---

## Symbolic link and junctions

There are differences such as:

| Junctions                                                   | Symbolic Links                                                            |
|-------------------------------------------------------------|---------------------------------------------------------------------------|
| Must be local                                               | Can target an remote path (eg UNC Path)                                   |
| Path must be absolute (eg: c:\mydirectory)                  | Paths can be absolute or relative                                         |
| No special rights required                                  | Requires admin (elevated) to create                                       |
| Is listed as (dir in cmd): ```<JUNCTION>     Banana [c:\fruit]``` | Is listed as: ```<SYMLINKD>     Banana [\\server\fruit]```                      |
| "Dir Banana" will list all files and their size             | Same as Junctions                                                         |
| Viewing properties in explorer views a "real folder"        | Viewing properties in explorer views "File folder" (bascially a shortcut) |

### Making links

```text
mklink /D .\MyLocalDir \\SERVER\SHARE
```

## Link settings

Links can be in many directions and to view the current system settings, use:

```text
fsutil behavior query SymlinkEvaluation
```

For Windows 10 the default response is:

```text
Local to local symbolic links are enabled.
Local to remote symbolic links are enabled.
Remote to local symbolic links are disabled.
Remote to remote symbolic links are disabled.
```

## Changing the allowed directions

* L=Local
* R=Remote

```text
fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1
```

:!: These settings are stored in registry.
