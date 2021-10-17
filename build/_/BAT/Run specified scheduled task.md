# 2016-06-03 Wait for completion-script in Windows BAT

Scheduled tasks are run in the background by default, which sometimes might be a problem. This script runs a task and waits for it to complete.

## List all scheduled tasks

```BAT
schtasks /query /FO LIST /V | find "TaskName"
```

## Running a task by name (and wait for it to exit)

```BAT
@echo off

echo Running task!
echo.
set TASKNAME=<THE_TASK_NAME>

schtasks /Run /TN "%TASKNAME%"

:loop
for /f "tokens=2 delims=: " %%f in ('schtasks /query /tn "%TASKNAME%" /fo list ^| find "Status:"' ) do (
    if "%%f"=="Running" (
        timeout /T 1 /NOBREAK > nul
        goto loop
    )
)

echo ------------------------------------------------
echo.
echo Completed
echo.
schtasks /query /tn "%TASKNAME%" /fo list /v | find "Last"

timeout /T 5
```
