# 2018-10-04  Install grafana on turnkey core

Package details [http://docs.grafana.org/installation/debian/](http://docs.grafana.org/installation/debian/)

## Prepare

Begin with a bare turnkey image and SSH to it. Next add grafana to sources

```bash
nano /etc/apt/sources.list
```

Add:

```text
deb https://packagecloud.io/grafana/stable/debian/ stretch main
```

Save. Add https support for apt-get

```bash
sudo apt-get install -y apt-transport-https curl
```

## Install

```bash
https://packagecloud.io/gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install grafana
```

Set it to autostart during boot

```bash
update-rc.d grafana-server defaults
```

Start the server

```bash
sudo service grafana-server start
```

## Login

```text
http://grafana.lan:3000/
```

First time password: admin / admin

## Log files and backup?

```bash
more /var/log/grafana/grafana.log

# backup these files before upgrade..

ls –la /var/lib/grafana/grafana.db
ls –la /etc/grafana/grafana.ini
```
