# 2018-09-17 Change Locale on bash

If you have troubles with locale in bash, check the `/etc/default/locale`. It should look something like:

```text
#  File generated by update-locale
LANG=en_US.UTF-8
LANGUAGE=en_US.UTF-8
LC_ALL=C
LC_CTYPE=C
```

To change locale, run:

```txt
update-locale en_US.UTF-8
```
