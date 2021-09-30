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

