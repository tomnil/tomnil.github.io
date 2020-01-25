---
layout: article
title:  Migrate all your email from one site to another (command line)
description: 
date:   2019-03-11
tags: tools mail
supertag: tools
---

## Prerequisites

You need to have the following information at hand for both the source and the destination site.

* Address to IMAP server (eg imap.provider.com)
* IMAP Enabled (most likely it already is)
* Login and password information
  * Can be "username" or "username@domain.com"
* Time... (read: a computer that can run this for hours)

## Some warnings..

* This tool is for doing backup from site A to site B, or to move data. What it's NOT is a bidirectional sync tool.
* It only synchronizes email, calendars and other stuff are left behind (possibly [http://caldavsynchronizer.org/](http://caldavsynchronizer.org/) can help out here)

## IMAPSync

There are two ways of running this tool. Either [online](https://i005.lamiral.info/X/) or by downloading it .

## Install and some tips

Running it locally requires some knowledge and tools. Run the following commands one by one (Note: both ```git``` and ```make``` must be installed)

imapsync is heavily dependent on perl so a ton of files needs to be installed:

```bash
sudo apt-get install libauthen-ntlm-perl libclass-load-perl libcrypt-ssleay-perl libdata-uniqid-perl libdigest-hmac-perl libdist-checkconflicts-perl libfile-copy-recursive-perl libio-compress-perl libio-socket-inet6-perl libio-socket-ssl-perl libio-tee-perl libmail-imapclient-perl libmodule-scandeps-perl libnet-dbus-perl libnet-ssleay-perl libpar-packer-perl libreadonly-perl libregexp-common-perl libsys-meminfo-perl libterm-readkey-perl libtest-fatal-perl libtest-mock-guard-perl libtest-mockobject-perl libtest-pod-perl libtest-requires-perl libtest-simple-perl libunicode-string-perl liburi-perl libtest-nowarnings-perl libtest-deep-perl libtest-warn-perl libfile-tail-perl libcgi-pm-perl 

sudo apt-get install libssl-dev libio-tee-perl

# Optionally install:  atp-get install gcc
sudo perl -MCPAN -e 'install Crypt::OpenSSL::RSA'
sudo cpanm "JSON::WebToken::Crypt::RSA"
sudo cpanm "JSON"
```

Next, download and compile imapsync:

```bash
git clone https://github.com/imapsync/imapsync.git  
cd imapsync
mkdir dist
# if you get file exists, do rm dist first
sudo make install
```

Some errors might occour, read the logfile and try to resolve. To recheck for errors run:

```bash
sh INSTALL.d/prerequisites_imapsync
```

## Usage

### Usage examples

The best tip I can give is to check the [online](https://i005.lamiral.info/X/) tool and run it there (use fake passwords if you're security aware). Next check the online logs and look for something like this line:

```bash
/usr/local/www/apache24/cgi-bin/imapsync --addheader --automap --dry --gmail1 --host1 imap.gmail.com --host2 imap.mail.yahoo.com --password1 MASKED --password2 MASKED --user1 a --user2 a
```

### Another example

```bash
./imapsync --addheader --automap --host1 mail.surftown.com --host2 imap01.binero.se --password1 MASKED --password2 MASKED --user1 myuser1@domain.se --user2 mynewuser@domain.se```
```

## Google

This is  advanced since Google has minimal security requirements that must be met. This is untested, but basically you need to get an OAUTH file, and to do that you need to register your app (read imapsync) on google API (as a project). So begin with [https://console.developers.google.com/](https://console.developers.google.com/) :)

The file you need to generate looks something like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-name",
  "private_key_id": "1cfb..............................bd7fbe",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiGziM...ZV5ACKPHuOfp8A46I=\n-----END PRIVATE KEY-----\n",
  "client_email": "jsonfile@your-project-name.iam.gserviceaccount.com",
  "client_id": "105................689",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/jsonfile%40your-project-name.iam.gserviceaccount.com"
}
```

Finally instructing imapsync to use this file:

```bash
imapsync \
        --host1 imap.gmail.com --ssl1 --user1 username@gmail.com \
        --password1 secret.xoauth2.json --authmech1 XOAUTH2 \
        --host2 imap.gmail.com --ssl2 --user2 targetaccount@gmail.com \
        --password2 secret.xoauth2.json --authmech2 XOAUTH2 \
        --justlogin --debug
```

This information was taken from the author, see [here](https://imapsync.lamiral.info/FAQ.d/FAQ.XOAUTH2.txt).

## More information & Paid version / Support

I encourage to purchase the product and to get the needed support.

* Go to the [author site](https://imapsync.lamiral.info/).
* Github (free version): [https://github.com/imapsync/imapsync](https://github.com/imapsync/imapsync)
