---
layout: article
title:  Run Robocopy to backup to external drive with quarterly "snapshots"
description: Use Robocopy to update your "backup", atleast until a new quarter has begun.
date:   2015-09-03
tags: bat windows
supertag: bat
---

Using Robycopy can be a great way to do copy all files on your computer to an external harddrive (in this document the driveletter ```Z:\``` is used.)

If you run this script everyday it will:

1. Detminate the current quarter (eg 201901)
2. If it doesn't exist, copy all your files to Z:\YYYYQQ
3. If it does exist, update the copy to 100% mirror your computer (this means; deleted files on your computer will be deleted on your external harddrive as well)
4. When the next quarter begins, a full copy will run (and leave the previous quarter as-is)

`!`: This will eventually make your harddrive full, but you will also have a history to back to. When the drive is getting full, I recommend to delete the oldest folder.

After a year (starting July 2019) you will have:

```
Z:\201903
Z:\201904
Z:\202001
Z:\202002
```

## Script

Download the [RoboCopy_Backup_Script.bat](RoboCopy_Backup_Script.bat)

```BAT
 {% include_relative RoboCopy_Backup_Script.bat %}
```

### Locale note

It might seem overwork to do ```wmic os``` but it works on all locales :)

