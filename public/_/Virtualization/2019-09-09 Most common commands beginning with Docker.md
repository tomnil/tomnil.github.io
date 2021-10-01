# 2019-09-09 Most common commands beginning with Docker

## Container vs images

If you're used to working with classic virtualization, it can be good to know that images are source images (compare with ISO) from which you can create a docker container (a lightweight Virtual Machine).

Kubernetes are a tool to group running dockers together (compare with vApp in VMWare)

## Persistance

I recommend you store data outside of the docker container - think of a docker conatiner as "read-only". Create persistance by assigning local path(s) to the docker. This means you only need to backup how to start your image and the folders where persistent data is located (this also means if the docker image is lost you just rerun the "docker run" command again and the image will be redownloaded.).

If you don't want to use this, persistance is created through the use of volumes (```/var/lib/docker/volumes```)

## Some basic commands

### List the downloaded docker images

```bash
docker image list
```

### Delete an image

You can delete an image either by name or ID. You cannot delete images that are in use by a container.

```bash
docker image rm IMAGE_NAME
docker image rm IMAGE_ID
```

### List all containers

This is important, here you list all docker containers in your system. Many commands just accept the ID of the container, and this is where you get it.

```bash
docker container list -a
```

## Starting and stopping

### Start a container interactively (and make port forwarding)

If the container internally starts a webserver on port 80 and you want to be able to reach it on port 8080 on the hos:

```bash
docker run -it -p 80:8080 CONTAINER_NAME
```

`!`: The switch -P can be used to forward all ports the container exposes.

### Start a container in the background (and make port forwarding)

```bash
docker run -d -p 80:8080 --restart unless-stopped CONTAINER_NAME
```

### Show running containers

Either use ```docker container ls``` or ```docker ps```

## Interacting with a container

### Executing a command (such as ls)

First find the ID of the running container

```bash
root# docker ps

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                              NAMES
abcdef1234567        toke/mosquitto      "docker-entrypoint.s…"   3 months ago        Up 9 days           0.0.0.0:1883->1883/tcp, 9001/tcp   mqtt
```



Next, issue the command:

```bash
root# docker exec abcdef1234567 ls -la /

total 76
drwxr-xr-x   1 root      root      4096 Sep 10 11:30 .
drwxr-xr-x   1 root      root      4096 Sep 10 11:30 ..
-rwxr-xr-x   1 root      root         0 Sep 10 11:30 .dockerenv
drwxr-xr-x   2 root      root      4096 Apr 26  2018 bin
drwxr-xr-x   2 root      root      4096 Nov 19  2017 boot
drwxr-xr-x   5 root      root       340 Dec 17 13:22 dev
etc..
```

### Starting a bash

It's also possible to start an interactive sesssion on the container itself:

```bash
root# docker exec -it abcdef1234567 /bin/bash
or
root# docker exec -it abcdef1234567 sh
```

You will connected to the container:

```
root@abcdef1234567:/# ls -la
root@abcdef1234567:/# exit
exit
root# 
```

### Connect and show current log

Show "console output" from the docker and tail it (-f).

```bash
root# docker logs -f abcdef1234567

1568115039: mosquitto version 1.4.15 (build date Sat, 07 Apr 2018 11:13:41 +0100) starting
1568115039: Config loaded from /mqtt/config/mosquitto.conf.
1568115040: Opening ipv4 listen socket on port 1883.
1568115040: Opening ipv6 listen socket on port 1883.
1568115040: New connection from 192.168.1.133 on port 1883.
1568115040: New client connected from 192.168.1.133 as mqttlens (c1, k120, u'mqtt').
etc..
```

## Resources management

### List all volumes (think "storage devices")

Volumes are stored in ```/var/lib/docker/volumes```

```bash
root# docker volume list
```

### Delete all unused volumes

```bash
root# docker volume prune
```

## Copying files in and out of the container

```bash
root# docker cp abcdef1234567:/mosquitto/config/mosquitto.conf ./mosquitto.conf
```

## List Volumes or MountPoints

```bash
root# docker inspect DOCKERNAME
```

Look for Volumes such as:

```bash
 "Volumes": {
                "/mqtt/config": {},
                "/mqtt/data": {},
                "/mqtt/log": {}
            },
```
