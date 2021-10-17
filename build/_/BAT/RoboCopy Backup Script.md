# 2015-09-03 Run Robocopy to backup to external drive with quarterly 'snapshots'

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
@echo off

REM *******************************************************************
REM Get Date & Time - Works on all locale
REM *******************************************************************

for /f "skip=1" %%d in ('wmic os get localdatetime') do if not defined mydate set mydate=%%d
set year=%mydate:~0,4%
set month=%mydate:~4,2%
set /a monthwithoutleadingzeroes=10000%month% %% 10000
set /A quarter=(%monthwithoutleadingzeroes%/4)+1
set yearmonth=%mydate:~0,4%-%mydate:~4,2%
set yearquarter=%year%-Q%quarter%

REM *******************************************************************
REM * Prepare
REM *******************************************************************

if not exist "Z:\%yearquarter%\BACKUP\" mkdir "Z:\%yearquarter%\BACKUP\"
set error=

REM *******************************************************************
REM * Copy the folders
REM *******************************************************************

call:DoRoboCopy "%%USERPROFILE%%","Z:\%yearquarter%\BACKUP\USERPROFILE"
call:DoRoboCopy "%%ALLUSERSPROFILE%%\Start Menu", "Z:\%yearquarter%\BACKUP\Start Menu"

REM *******************************************************************
REM * Any errors?
REM *******************************************************************

if "%error%" EQU "" (
	echo All done, no errors!
) ELSE (
	echo Errors found, please retry.
	echo The problem was here: %error%
)

goto:eof


REM ***********************************************************************************************************************************


REM **************************************************************
REM * DoRoboCopy (i_SourceDirectory, i_DestinationDirectory)
REM **************************************************************

:DoRoboCopy
title "Running: %~1"
if "%error%" EQU "" (
	echo robocopy "%~1" "%~2" /MIR /R:0 /dcopy:T /NDL /log+:Z:\%yearquarter%\BackupLog.txt /tee
)

if %ERRORLEVEL% NEQ 0 (
	set error="%~1"
)
echo.
echo #####################################################################################
echo.
echo.
goto:eof

```

### Locale note

It might seem overwork to do ```wmic os``` but it works on all locales :)

