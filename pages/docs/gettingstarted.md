---
dynamic:
  variables: [ $device ]
  ref: docs/$device/gettingstarted
  $switch_text: Getting Started with $device
---

# Getting Started on the {{ $device.name }}

In resinOS all application logic and services are encapsulated in docker containers. In this getting started guide we will walk you through setting up one of our pre-built development OS images and creating a simple application container. In the guide we will use a tool called `rdt` (A.K.A Resin Device Tool) to make things super easy. However, for those that like to do things the hard way, we got you covered as well. 

## Download an Image
To get a resinOS device setup, we will first need to flash a system image on to the device, so head over to resinos.io/downloads and grab the development OS for your board. Currently resinOS supports 20 different boards and several different architectures. See the [Supported Boards](#/docs/supported-boards) section for more details.

Once the download is finished, make sure to decompress it and keep it somewhere safe, we will need it very soon!
```
$ wget files.resin.io/images/{{ $device.id }}/2.0.0/resinos-dev.img
```

## Install rdt
`rdt` or Resin Device Toolbox, is a collection of utilities which helps us to develop resinOS based application containers. It’s not strictly necessary, but makes life so so much sweeter, but if you like doing things the hard way, skip over to the next section.

Currently `rdt` is a node.js based command line tool which requires that our system has the following dependencies installed and in our path:


* [node.js 6.x](https://nodejs.org/en/)
* [npm package manager](https://www.npmjs.com/)
* [rsync](https://download.samba.org/pub/rsync/rsync.html)
* [ssh](http://www.openssh.com/)

Once we have those setup we can install `rdt` using npm:
```
$ npm install -g resin-device-tool
```

## Configure the Image
To allow resinOS images to be easily configurable before boot, some key config files are added to boot partition. In this step we will use `rdt` to configure the network, set our hostname to `resin` and disable persistent logging, because we don’t want to kill our poor flash storage with excessive writes.
```
$ rdt configure ~/Downloads/resinos-dev.img
? Network SSID super_wifi
? Network Key super secure password
? Do you want to set advanced settings? Yes
? Device Hostname resin
? Do you want to enable persistent logging? no
Done!
```
If you are not using `rdt`, you will need to mount the boot partition of the image and edit the configuration manually.

Edit `/boot/config.json` so it looks like this:
```json
{
  "persistentLogging": false,
  "hostname": "resin",
}
```

And edit the `ssid` and `psk` values in the `/boot/system-connections/resin-sample` connection file.
```
[connection]
id=resin-sample
type=wifi

[wifi]
mode=infrastructure
ssid=I_Love_Unicorns

[wifi-security]
auth-alg=open
key-mgmt=wpa-psk
psk=superSecretPassword

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

## Get the Device Up and Running
Okay, so now we have a fully configured image ready to go, so let’s burn and boot this baby. For this step `rdt` provides a handy flashing utility, you can however flash this image using etcher.io or `dd` if you must. 

### Flash {{ $device.bootMedia }}
To get flashing, just point the `rdt flash` command to the image we just downloaded and follow the prompts. If you hate prompts, `rdt` also allows you to skip them, check the [`rdt` docs](#rdt-docs) on how to do this.

__NOTE:__ `rdt flash` requires administrative privileges because it needs to access the {{ $device.bootMedia }}.

```
$ sudo rdt flash ~/Downloads/resinos-dev.img
Password:
x No available drives were detected, plug one in!
```

Once you plug in your {{ $device.bootMedia }}, `rdt` should detect it and show you the following selection dialog. Make sure to select the correct drive if you have a few listed, as `rdt` will complete write over the entire drive.

```
$ sudo rdt flash ~/Downloads/resinos-dev.img 
Password:
? Select drive (Use arrow keys)
❯ /dev/disk3 (7.9 GB) - STORAGE DEVICE 
```

Once you are happy you have selected the correct drive, hit enter and wait while your new OS is written to the drive. 
It should only take about 3 minutes, depending on the quality of your drive, so this is a great time to go grab a caffeinated beverage.

```
$ sudo rdt flash ~/Downloads/resinos-dev.img
? Select drive /dev/disk3 (7.9 GB) - STORAGE DEVICE
? This will erase the selected drive. Are you sure? Yes
Flashing [========================] 100% eta 0s  
Validating [========================] 100% eta 0s 
```

### Boot the device

{{ import "bootdevice" }}

After about 30 seconds your device should be up and connected to your local network. To check this, let’s try ping the device.

```
$ ping resin.local
PING 192.168.1.111 (192.168.1.111): 56 data bytes
64 bytes from 192.168.1.111: icmp_seq=0 ttl=64 time=103.674 ms
64 bytes from 192.168.1.111: icmp_seq=1 ttl=64 time=9.723 ms
^C
--- 192.168.1.111 ping statistics ---
6 packets transmitted, 6 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.378/24.032/103.674/35.626 ms
```

Now if we want to poke around a bit inside resinOS we can just ssh in with:
```
$ ssh root@resin.local -p22222
root@resin:~# uname -a
Linux resin 4.1.21 #1 SMP Fri Oct 7 23:37:01 CEST 2016 armv7l GNU/Linux
root@resin:~# docker info
Containers: 1
 Running: 0
 Paused: 0
 Stopped: 1
Images: 7
Server Version: 1.10.3
Storage Driver: aufs
 Root Dir: /var/lib/docker/aufs
 Backing Filesystem: extfs
 Dirs: 22
 Dirperm1 Supported: true
Execution Driver: native-0.2
Logging Driver: journald
Plugins: 
 Volume: local
 Network: null host bridge
Kernel Version: 4.1.21
Operating System: Resin OS 1.16.1
OSType: linux
Architecture: armv7l
CPUs: 4
Total Memory: 972.5 MiB
Name: resin
ID: FOZ2:5KHG:RTSS:UQ7S:F2J6:QYLL:MERX:5ZVU:4WVL:3G2G:T2YA:LX3D
```

## Running your first Container
### Clone a demo Project 
```
$ git clone ...
```

### Get a Container Running
```
$ rdt push resin -s .
```

## Poking Around resinOS
To help explore resinOS devices and application containers more easily, `rdt` has an ssh command which will help you connect either to the HostOS or a running container on the device.

#### To ssh into the host:
```
$ rdt ssh --host
```
**OR**
```
$ ssh root@resin.local -p22222
```

#### To ssh into a particular container:
```
$ rdt ssh resin.local
```
**OR**
```
$ ssh root@resin.local -p22222
root@resin:~# docker exec -it myapp bash
```

## Going Further
### Advanced Settings

Either mount the {{ $device.bootMedia }} and run:
```
$ rdt configure /path/to/drive
```
And select `y` when asked if you want to add advanced settings.

Alternatevely you can add `“persistentLogging”: true` to `config.json` in your boot partition of the {{ $device.bootMedia }}. 

To Enable persistent logs in a running device, add `“persistentLogging”: true` to `/mnt/boot/config.json` and reboot.

The journal can be found at  `/var/log/journal/` which is bind mounted to `root-overlay/var/log/journal` in the `resin-conf` partition. 
When logging is not persistent, the logs can be found at `/run/log/journal/` and this log is volatile so you will loose all logs when you power the device down.

## Creating a Project from Scratch
Alright! So we have an awesome container machine up and running on our network. So let’s start pushing some application containers onto it. In this section we will do a quick walk through of setting up a dockerfile and make a simple little node.js webserver.

To get started, let’s create a new project directory called “myapp” and create a new file called `Dockerfile`. 

```
$ mkdir -p myapp && touch Dockerfile
```

Now we will create a minimal node.js container based on the slim [Alpine Linux distro](link-to-alpine). We do this by adding the following lines to our Dockerfile.

```Dockerfile
FROM resin/raspberrypi3-alpine-node:slim
CMD [“cat”, “/etc/os-release”]
```

The `FROM` tells docker what our container will be based on. In this case an Alpine Linux userspace with just the bare essentials needed for the node.js runtime. The `CMD` just defines what our container runs on startup. In this case, it’s not very exciting yet.

Now to get our application running on our device we can use the `rdt push` functionality.
```bash
$ rdt push --source .
* Building..
- Stopping and Removing any previous 'myapp' container
- Removing any existing container images for 'myapp'
- Building new 'myapp' image
Step 1 : FROM resin/raspberrypi3-alpine-node:slim
Pulling from resin/raspberrypi3-alpine-node
Pulling fs layer
Verifying Checksum=============================================>]     32 B/32 B7 MB
Download complete
Verifying Checksum=============================================>] 1.987 MB/1.987 MB
Pull complete=================================================>]    12 MB/12 MB
Pull complete
Digest: sha256:410a5add3aa281d97afea1ae4fcdbec203c69ea34faea8d84349456c211f33a3
Status: Downloaded newer image for resin/raspberrypi3-alpine-node:slim
 ---> bf37b6350e63
Step 2 : CMD [“cat”, “/etc/os-release”]
 ---> Running in a376f4a781d5
 ---> a3c2c42b1212
Removing intermediate container a376f4a781d5
Successfully built a3c2c42b1212
- Creating 'myapp' container
- Starting 'myapp' container

resin push completed successfully!
```

This command will discover your resinOS-dev device on the network and start a build of whatever you have in the `--source` directory. In the example above, we have just told it to build from the root of the directory we are in, in this case `myapp`.

A number of things have happened in this step, so let’s pause here and dig in a little more. When we first run `rdt push` we are asked to define a name for our app and after that, it starts a docker build on your device. At the same time, `rdt` has added a file to our project called `.resin-sync.yml` which stores all the default for `rdt`. Let’s have a quick look at that:

```
local_resinos:
  app-name: myapp
  build-triggers:
    - Dockerfile: 6275495dc9620c3c74aa5a25ef29bbb109fbcb4e46de941b14235aeea02cc184
```

We can see that for our local resinOS device we have an app called “myapp” which will map over to a docker image and container on our device. The next interesting section is build-triggers. This is a list of files and their hashes, which will result in a docker build. In our case it’s just the `Dockerfile`, so when we change things here, `rdt` will rebuild our app. This will be important a bit later.

So now that we are building, let’s start adding some actual code! We will just add `main.js` file in the root of our `myapp` directory.

```javacript
//main.js
console.log("Hey… I’m a node.js app running in a container!!");
```

We then make sure our Dockerfile copies this source file into our container context by replacing our current `CMD [“cat”,”/etc/os-release”]` in our Dockerfile with the following.

```Dockerfile
FROM resin/raspberrypi3-alpine-node:slim
WORKDIR /usr/src/app
COPY . .
CMD ["node", "main.js"]
```

This puts all the contents of our `myapp` directory into `/usr/src/app` in our running container and says we should start main.js when the container starts.

Alright, so we have a simple javascript container, but that’s pretty boring, let’s add some dependencies and complexity.  To add dependencies in node.js we need a package.json, the easiest way to whip up one is to just run `npm init` in the root of our `myapp` directory. After a nice little interactive dialog we have the following `package.json` in directory.

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "a simple hello world webserver",
  "main": "main.js",
  "scripts": {
    "test": "echo \"no tests yet\""
  },
  "repository": {
    "type": "git",
    "url": "none"
  },
  "author": "Shaun Mulligan <shaun@resin.io>",
  "license": "ISC"
}
```

Now it’s time to add some dependencies. For our little webserver, we will use the popular expressjs module. We can add it to the `package.json` after the `"license": "ISC"`, so it now looks like this:

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "a simple hello world webserver",
  "main": "main.js",
  "scripts": {
    "test": "echo \"no tests yet\""
  },
  "repository": {
    "type": "git",
    "url": "none"
  },
  "author": "Shaun Mulligan <shaun@resin.io>",
  "license": "ISC",
  "dependencies": {
    "express": "^4.14.0"
  }
}
```

Now all we need to do is add a few more lines of javacript to our main.js and we are off to the races.

```javacript
//main.js

var express = require('express');
var app = express();

// reply to request with "Hello World!"
app.get('/', function (req, res) {
  res.send("Hello World, I'm a container running on resinOS!");
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log("Hey… I’m a node.js server running in a container and listening on port: ", port);
});
```

Great, so now we are almost ready to go, but we want to make sure anytime we add a dependency to our `package.json` that we rebuild the container and install those dependencies. So to do this we need two things.

1.) We need to add `package.json` to our build triggers list, with an empty hash, like this:

```
local_resinos:
  app-name: myapp
  build-triggers:
    - Dockerfile: 1327b0f9875d5c4bf7f2f36fad384c8481a00396830acd33c0af0e575648fe91
    - package.json: 
```

And 2.) We then need to run a `npm install` in our build, so we add a few lines to our Dockerfile.

```
FROM resin/raspberrypi3-alpine-node:slim
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY . .
CMD ["node", "main.js"]
```

We can now deploy our new webserver container again with `rdt`:

```bash
$ rdt push --source .
```

You should now be able to point your web browser on your laptop to the IP address of your device and see the "Hello, World!" message.