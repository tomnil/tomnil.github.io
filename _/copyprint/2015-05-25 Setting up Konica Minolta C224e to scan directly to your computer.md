# 2015-05-25 Setting up Konica Minolta C224e to scan directly to your computer

![pic1](media/ef380a909ba5ca1bd9d70f5e1afa4ad2.png)

## Preparation

### Get your computer name (needed below)

Go to Control Panel System And Security System.

![pic1](media/a8036e6b71a18e77234ae50c0d2045c8.png)

Write down the “Full Computer Name.”

## Computer Setup

### Create ”Scanned” folder

Create a folder on your desktop. Right click and choose “Properties”. Select the
“Sharing” tab and click “Advanced Sharing…”

![pic1](media/653e8f75078bad5b25c785598ced39ea.png)

Tick the “Share this folder” checkbox and click the permissions tab.

![pic1](media/db6615dd714927bdea2868d9972cfa67.png)

Remove everyone and click “Add…”

![pic1](media/373a4808e3e7c5a4ee666553c8c6fee3.png)

Add yourself and click OK.

![pic1](media/a30243a41a1b81b12a70e203be473598.png)

Tick “Full Control” and “Change” so all three checkboxes are checked. Click OK.

![pic1](media/7b20123e4c01f44d1a317442ec71c18c.png)

Now your computer target folder has been configured.

## Test it :)

Test by opening a file explorer (Press the Windows+E on the keyboard).

Type in the address to your computer name and the name of the share in the
following format:

```\\COMPUTERNAME\FOLDERNAME```

For the test, you can use either the “Computer Name” or the “Full Computer
Name”. Both should work. This example shows my computer with my folder.

![pic1](media/e12eb5ea3906f7091082d842663b111d.png)

![pic1](media/4fee551d8d2b343ee1adc8eb06f3ba7b.png)

If you want to, create and delete a test file here. It should work without
errors.

## Printer setup

Now it’s time to setup the printer.

### Find the address to the printer

On the start menu, go to “Devices and Printers”. Right click the printer and
select “Printing Preferences”

![pic1](media/f1c18965cd02f016cb004c81efc23caa.png)

Click “Printer Information”

![pic1](media/402b3c4c698be52059e043e70ac23f02.png)

A web browser will open (Tip! Save this link!)

Click “Store Adresses” and the click “New Registration”.

![pic1](media/0b87f7848cdd7e39eac2e1664a5ebbe2.png)

Choose SMB and click OK.

Begin with entering your name and select the tab where your name should be on the printer:

![pic1](media/a3b9dbd8663b17ae7476f9dd34a5ed72.png)

Next, enter the following:

* **Please check to enter host name** : Check it
* **File Path**: This must be the name of the folder you shared. Please be careful with uppercase / lowercase
****Username**: This is your username only. Do not enter domain information or similar, doing that doesn’t work.
** **Password**: This is your password.

**Before clicking OK…** - Make sure nobody is printing, you cannot save if the printer is in use!

### Test it :)

Go to the printer and click “Fax/Scan”. Choose your profile under the shown buttons.

Insert a paper and click the start button. Wait 30 seconds at the scanner - if no error appears, the file has been successfully scanned directly to your computer.

The transfer to your computer is slow. This will be especially noticeable when scanning multiple files and/or scan many pages. Be patient, the files will appear.
