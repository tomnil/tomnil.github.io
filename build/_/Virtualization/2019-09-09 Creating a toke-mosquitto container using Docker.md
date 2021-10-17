# 2019-09-09 Creating a toke/mosquitto container using Docker

`!`: Please read the [2019-09-09 Most common commands beginning with Docker](2019-09-09 Most common commands beginning with Docker) first.

This guide will show how to setup toke/mosquitto with persistance including host rights and a first user.

## Prepare persistance

After this step you will have a config file and your first user setup. Begin with creating folders and setup security for the persistant data.

```bash
cd ~
mkdir DockerPersistance
mkdir DockerPersistance/toke
mkdir DockerPersistance/toke/mqtt
mkdir DockerPersistance/toke/mqtt/config
mkdir DockerPersistance/toke/mqtt/data
mkdir DockerPersistance/toke/mqtt/log
```

Next set security. Toke/mosquitto will internally run as ```uid=104(mosquitto) gid=107(mosquitto) groups=107(mosquitto)``` (this can be found out by doing ```ps -e all``` and then ```id 104``` (inside the container))

```bash
chown -R 104:107 ~/DockerPersistance/toke/
chmod -R 755 ~/DockerPersistance/toke/
```

## Create initial configuration file

Complete documentation is here: ```https://github.com/toke/docker-mosquitto/blob/master/config/mosquitto.conf.example```

Now, this configuration file will be loaded inside the docker and thus must the paths be relative to that. For example, the file ```/mqtt/mosquitto.pid``` inside the docker will be saved outside of the docker (in ```~/DockerPersistance/toke/mqtt/```).

### Example configuration files

Store this file in your host at ```~/DockerPersistance/toke/mqtt/config```

```bash
pid_file /mqtt/mosquitto.pid

persistence true
persistence_location /mqtt/data/

user mosquitto

# Max queued messages
max_queued_messages 1000

# Remove orphaned clients
persistent_client_expiration 2m

# Port to use for the default listener.
port 1883

# Log settings
log_dest file /mqtt/log/mosquitto.log
log_dest stdout
log_timestamp true

# Log connect/disconnect messages
connection_messages true

# Authentication
allow_anonymous true
```

## First run (anonymous allowed, interactive, port 1883, delete on exit)

Start the docker for the first time. ```-ti``` makes the docker run interactively. If all is well the server should be running and you can view a log file in ```~/DockerPersistance/loke/mqtt/logs```.

```bash
docker run --rm -ti -p 1883:1883 -v ~/DockerPersistance/toke/mqtt/config:/mqtt/config -v ~/DockerPersistance/toke/mqtt/log:/mqtt/log -v ~/DockerPersistance/toke/mqtt/data:/mqtt/data --name mqtt toke/mosquitto
```

Press ctrl-c to exit.

`!` It's not possible to combine the paths (ie submit a single parameter of -v using the parent path. The paths that can be "overwritten" is explicity listed in the docker configuration file)

## Adding a user and enabling security

First, modify the config file to use a passwd-file. At the very end of the file, remove the ```allow_anonymous``` and add:

```bash
# Authentication
allow_anonymous false
password_file /mqtt/config/passwd
```

Next, start the container and execute ```mosquitto_passwd``` (This has to be run from *inside* of the container since our host system most likely doesn't have the ```mosquitto_passwd``` command). This can most easily be achived by starting the container and then immidately ask for the ```mosquitto_passwd``` to be executed. Another way is to run ```bash```.

```bash
docker run --rm -ti -p 1883:1883 -v ~/DockerPersistance/toke/mqtt/config:/mqtt/config -v ~/DockerPersistance/toke/mqtt/log:/mqtt/log -v ~/DockerPersistance/toke/mqtt/data:/mqtt/data --name mqtt toke/mosquitto mosquitto_passwd -c /mqtt/config/passwd user1
```

`!` Don't use this command to add a second user, read the documentation for ```mosquitto_passwd```.

If all is well, the host should now have a file with proper rights and contents:

```bash
cat ~/DockerPersistance/toke/mqtt/config/passwd
```

Try it

```bash
docker run --rm -ti -p 1883:1883 -v ~/DockerPersistance/toke/mqtt/config:/mqtt/config -v ~/DockerPersistance/toke/mqtt/log:/mqtt/log -v ~/DockerPersistance/toke/mqtt/data:/mqtt/data --name mqtt toke/mosquitto
```

```ctrl-c``` to exit.

## Background run with automatic restart

```bash
docker run -d --restart unless-stopped -p 1883:1883 -v ~/DockerPersistance/toke/mqtt/config:/mqtt/config -v ~/DockerPersistance/toke/mqtt/log:/mqtt/log -v ~/DockerPersistance/toke/mqtt/data:/mqtt/data --name mqtt toke/mosquitto
```

## Monitor/Send receive MQTT messages

### Method 1

There's a Chrome plugin called MQTTLens which is simple to use (it can both send and receive messages). <https://chrome.google.com/webstore/detail/mqttlens/hemojaaeigabkbcookmlgmdigohjobjm?hl=en>

### Method 2

Run ```mosquitto_sub``` inside the container. First find the ID by running ```docker ps``` and then creating a shell session to the container (```docker exec -it THEID bash```). Then use ```mosquitto_sub``` to print all received messages on all channels (#):

Example 1

```bash
docker ps
docker exec -it 9f97866d6dc7 bash
mosquitto_sub -h 127.0.0.1 -v -t '#'
```

Example 2

```bash
mosquitto_sub -h ADRESS -p 1883 -u USERNAME -P PASSWORD -t "#"
```
