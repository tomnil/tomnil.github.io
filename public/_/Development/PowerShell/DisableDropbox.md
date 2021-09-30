# 2020-09-27 Disable Dropbox from syncing node_modules.. recursively..

## node_modules?

This is a folder containing all dependencies for your javascript/nodejs/typescript project. For a somewhat medium sized project, node_modules (with subdirectories) can contain over 100 000 files.

## Turning off sync

So you could have wished for a ```.dropboxignore```, but the people at Dropbox chose a much more complex solution. They're using alternate data streams to tag directories and files with added settings.

The command for this is (powershell):

```powershell
 Set-Content -Path $Name -Stream com.dropbox.ignored -Value 1
 ```

## Recursive script

Also note, after running this, the Dropbox app will sync the "ignores" (read: delete the node_modules-directories in the Dropbox cloud).

Save this as "Fix Dropbox.ps1" and don't forget to change ```$ScanRoot``` accordingly. # If you're not allowed to run the ps1-file, use (as admin): ```Set-ExecutionPolicy RemoteSigned```.

```powershell
$ScanRoot = "C:\Users\YOUR_USERNAME\Dropbox"

# ****************************************
# Get all folders in the system
# ****************************************

echo "Scanning for all folders.."
$AllFolders = Get-ChildItem -Path $ScanRoot -Directory -Recurse | select FullName

# ****************************************
# Loop the folders
# ****************************************

foreach ($Folder in $AllFolders) {

    # ****************************************
    # Ends with node_modules? Let's process it, but only
    # if it's not a node_modules\...\...\node_modules
    # ****************************************

    if ($Folder.FullName.EndsWith("node_modules")) {
        if ($Folder.FullName.Replace("node_modules","").length -eq $Folder.FullName.Length - 12){

            # ****************************************
            # Set an alternate Stream (which Dropbox respects)
            # to ignore node_modules
            # ****************************************

            echo $Folder.FullName
            Set-Content -Path $Folder.FullName -Stream com.dropbox.ignored -Value 1
        }
    }
}

echo "Done."
```

## Enjoy

:)
