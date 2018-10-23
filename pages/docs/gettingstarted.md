---
dynamic:
  variables: [ $device ]
  ref: docs/$device/gettingstarted
  $switch_text: Getting Started with $device
---

# Getting Started on the {{ $device.name }}

In balenaOS all application logic and services are encapsulated in Docker containers. In this getting started guide we will walk you through setting up one of our pre-built development OS images and creating a simple application container. In the guide we will use the `balena` CLI tool to make things super easy. However, for those that like to do things the hard way, we got you covered as well.

## Download an Image
To get a balenaOS device setup, we will first need to flash a system image on to the device, so head over to [balena.io/os](https://balena.io/os) and grab the development OS for your board. Currently balenaOS supports 20 different boards and several different architectures. See the [Supported Boards](/docs/supportedboards/) section for more details.

Once the download is finished, make sure to decompress it and keep it somewhere safe, we will need it very soon!
``` bash
$ wget {{ $device.download_url }}
```

## Install the Balena CLI
The balena cli, is a collection of utilities which helps us to develop balenaOS based application containers. It’s not strictly necessary, but makes life so so much sweeter, but if you like doing things the hard way, skip over to the next section.

Currently the CLI is a node.js based command line tool which requires that our system has the following dependencies installed and in our path:


* [node.js 6.x](https://nodejs.org/en/)
* [npm package manager](https://www.npmjs.com/)
* [rsync](https://download.samba.org/pub/rsync/rsync.html)
* [ssh](http://www.openssh.com/)

Once we have those setup we can install `balena` CLI using npm:
``` bash
$ npm install --global --production --unsafe-perm balena-cli
```

__Note:__ Depending on you node.js installation, you may need to use administrative privileges to install the CLI.

## Configure the Image
To allow balenaOS images to be easily configurable before boot, some key config files are added to boot partition. In this step we will use the CLI to configure the network, set our hostname to `balena` and disable persistent logging, because we don’t want to kill our poor flash storage with excessive writes.
``` bash
$ sudo balena local configure ~/Downloads/balena.img
? Network SSID super_wifi
? Network Key super secure password
? Do you want to set advanced settings? Yes
? Device Hostname balena
? Do you want to enable persistent logging? no
Done!
```

If you are not using the balena CLI, you will need to mount the boot partition of the image and edit the configuration manually.

Edit `/boot/config.json` so it looks like this:
``` json
{
  "persistentLogging": false,
  "hostname": "balena",
}
```

And edit the `ssid` and `psk` values in the `/boot/system-connections/resin-sample` connection file.
```
[connection]
id=balena-sample
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

If you only want to use an ethernet connection on your device, you don't need to add anything. The device will automatically set up an ethernet connection by default.

## Get the Device Up and Running
Okay, so now we have a fully configured image ready to go, so let’s burn and boot this baby. For this step the CLI provides a handy flashing utility, you can however flash this image using etcher.io or `dd` if you must.

### Flash {{ $device.bootMedia }}
To get flashing, just point the `balena local flash` command to the image we just downloaded and follow the prompts. If you hate prompts, the CLI also allows you to skip them, check the [balena CLI docs](https://balena.io/docs/architecture/#balena-command-line-tool) on how to do this.

__NOTE:__ `balena local flash` requires administrative privileges because it needs to access the {{ $device.bootMedia }}.

``` bash
$ sudo balena local flash ~/Downloads/balena.img
Password:
x No available drives were detected, plug one in!
```

Once you plug in your {{ $device.bootMedia }}, the CLI should detect it and show you the following selection dialog. Make sure to select the correct drive if you have a few listed, as this will completely write over the drive.

``` bash
$ sudo balena local flash ~/Downloads/balena.img
Password:
? Select drive (Use arrow keys)
❯ /dev/disk3 (7.9 GB) - STORAGE DEVICE
```

Once you are happy you have selected the correct drive, hit enter and wait while your new OS is written to the drive.
It should only take about 3 minutes, depending on the quality of your drive, so this is a great time to go grab a caffeinated beverage.

``` bash
$ sudo balena local flash ~/Downloads/balena.img
? Select drive /dev/disk3 (7.9 GB) - STORAGE DEVICE
? This will erase the selected drive. Are you sure? Yes
Flashing [========================] 100% eta 0s  
Validating [========================] 100% eta 0s
```

__Note:__ Remember to safely remove your {{ $device.bootMedia }} before pulling it out.

### Boot the device

{{ import "bootdevice" }}

After about 30 seconds or so your device should be up and connected to your local network, you should see it broadcasting itself as `balena.local`. To check this, let’s try ping the device.

``` bash
$ ping balena.local
PING 192.168.1.111 (192.168.1.111): 56 data bytes
64 bytes from 192.168.1.111: icmp_seq=0 ttl=64 time=103.674 ms
64 bytes from 192.168.1.111: icmp_seq=1 ttl=64 time=9.723 ms
^C
--- 192.168.1.111 ping statistics ---
6 packets transmitted, 6 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 7.378/24.032/103.674/35.626 ms
```

Now if we want to poke around a bit inside balenaOS we can just ssh in with:
``` bash
$ ssh root@balena.local -p22222
root@balena:~# uname -a
Linux balena 4.1.21 #1 SMP Fri Oct 7 23:37:01 CEST 2016 armv7l GNU/Linux
root@balena:~# balena info
Containers: 1
 Running: 0
 Paused: 0
 Stopped: 1
Images: 7
Server Version: 1.10.3
Storage Driver: aufs
 Root Dir: /var/lib/balena/aufs
 Backing Filesystem: extfs
 Dirs: 22
 Dirperm1 Supported: true
Execution Driver: native-0.2
Logging Driver: journald
Plugins:
 Volume: local
 Network: null host bridge
Kernel Version: 4.1.21
Operating System: Balena OS 1.16.1
OSType: linux
Architecture: armv7l
CPUs: 4
Total Memory: 972.5 MiB
Name: balena
ID: FOZ2:5KHG:RTSS:UQ7S:F2J6:QYLL:MERX:5ZVU:4WVL:3G2G:T2YA:LX3D
```

__Note:__ Beginning with version 2.9.0, balenaOS uses the [balena](https://www.balena.io/) container engine to manage Docker containers. If you are using an earlier version of the OS, replace `balena` commands with `docker`.

## Running your first Container
### Clone a demo Project
{{#eq $device.id "nuc"}}
``` bash
$ git clone https://github.com/balena-io-playground/balenaos-sample-x86
```
{{else}}
``` bash
$ git clone https://github.com/balena-io-playground/balenaos-sample
```
{{/eq}}

### Get a Container Running
``` bash
$ sudo balena local push balena.local --source .
```
This command will use the image specified by the `Dockerfile` in the root of your project directory (--source specifies where to find your project). The build of this image will happen on your balenaOS device and once completed, the command will start up a container from that newly built image. For more details look at the [Creating a Project from Scratch](#creating-a-project-from-scratch) section below.

## Poking Around balenaOS
To help explore balenaOS devices and application containers more easily, the balena CLI has an ssh command which will help you connect either to the HostOS or a running container on the device.

#### To ssh into the host:
``` bash
$ sudo balena local ssh --host
```
**OR**
``` bash
$ ssh root@balena.local -p22222
```

#### To ssh into a particular container:
``` bash
$ sudo balena local ssh balena.local
```
**OR**
``` bash
$ ssh root@balena.local -p22222
root@balena:~# balena exec -it myapp bash
```

## Going Further
### Advanced Settings

Either mount the {{ $device.bootMedia }} and run:
``` bash
$ sudo balena local configure /path/to/drive
```
And select `y` when asked if you want to add advanced settings.

Alternatively you can add `“persistentLogging”: true` to `config.json` in your boot partition of the {{ $device.bootMedia }}.

To Enable persistent logs in a running device, add `“persistentLogging”: true` to `/mnt/boot/config.json` and reboot.

The journal can be found at  `/var/log/journal/` which is bind mounted to `root-overlay/var/log/journal` in the `resin-state` partition.
When logging is not persistent, the logs can be found at `/run/log/journal/` and this log is volatile so you will loose all logs when you power the device down.

## Creating a Project from Scratch
Alright! So we have an awesome container machine up and running on our network. So let’s start pushing some application containers onto it. In this section we will do a quick walk through of setting up a `Dockerfile` and make a simple little node.js webserver.

To get started, let’s create a new project directory called “myapp” and create a new file called `Dockerfile`.

``` bash
$ mkdir -p myapp && touch Dockerfile
```

Now we will create a minimal node.js container based on the slim [Alpine Linux distro](link-to-alpine). We do this by adding the following lines to our Dockerfile.

``` Dockerfile
FROM resin/{{ $device.id }}-alpine-node:slim
CMD [“cat”, “/etc/os-release”]
```

The `FROM` tells Docker what our container will be based on. In this case an Alpine Linux userspace with just the bare essentials needed for the node.js runtime. The `CMD` just defines what our container runs on startup. In this case, it’s not very exciting yet.

Now to get our application running on our device we can use the `balena local push` functionality.
```bash
$ sudo balena local push balena.local --source .
* Building..
- Stopping and Removing any previous 'myapp' container
- Removing any existing container images for 'myapp'
- Building new 'myapp' image
Step 1 : FROM resin/{{ $device.id }}-alpine-node:slim
Pulling from resin/{{ $device.id }}-alpine-node
Pulling fs layer
Verifying Checksum=============================================>]     32 B/32 B7 MB
Download complete
Verifying Checksum=============================================>] 1.987 MB/1.987 MB
Pull complete=================================================>]    12 MB/12 MB
Pull complete
Digest: sha256:410a5add3aa281d97afea1ae4fcdbec203c69ea34faea8d84349456c211f33a3
Status: Downloaded newer image for resin/{{ $device.id }}-alpine-node:slim
 ---> bf37b6350e63
Step 2 : CMD [“cat”, “/etc/os-release”]
 ---> Running in a376f4a781d5
 ---> a3c2c42b1212
Removing intermediate container a376f4a781d5
Successfully built a3c2c42b1212
- Creating 'myapp' container
- Starting 'myapp' container

balena push completed successfully!
```

This command will discover your balenaOS-dev device on the network and start a build of whatever you have in the `--source` directory. In the example above, we have just told it to build from the root of the directory we are in, in this case `myapp`.

A number of things have happened in this step, so let’s pause here and dig in a little more. When we first run `balena local push` we are asked to define a name for our app and after that, it starts a Docker build on your device. At the same time, the CLI has added a file to our project called `.resin-sync.yml` which stores all the project defaults. Let’s have a quick look at that:

``` yaml
local_balenaos:
  app-name: myapp
  build-triggers:
    - Dockerfile: 6275495dc9620c3c74aa5a25ef29bbb109fbcb4e46de941b14235aeea02cc184
```

We can see that for our local balenaOS device we have an app called “myapp” which will map over to a Docker image and container on our device. The next interesting section is build-triggers. This is a list of files and their hashes, which will result in a Docker build. In our case it’s just the `Dockerfile`, so when we change things here, the CLI will rebuild our app. This will be important a bit later.

So now that we are building, let’s start adding some actual code! We will just add `main.js` file in the root of our `myapp` directory.

``` javascript
//main.js
console.log("Hey… I’m a node.js app running in a container!!");
```

We then make sure our Dockerfile copies this source file into our container context by replacing our current `CMD [“cat”,”/etc/os-release”]` in our Dockerfile with the following.

``` Dockerfile
FROM resin/{{ $device.id }}-alpine-node:slim
WORKDIR /usr/src/app
COPY . .
CMD ["node", "main.js"]
```

This puts all the contents of our `myapp` directory into `/usr/src/app` in our running container and says we should start main.js when the container starts.

Alright, so we have a simple javascript container, but that’s pretty boring, let’s add some dependencies and complexity.  To add dependencies in node.js we need a package.json, the easiest way to whip up one is to just run `npm init` in the root of our `myapp` directory. After a nice little interactive dialog we have the following `package.json` in directory.

``` json
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
  "author": "Shaun Mulligan <shaun@balena.io>",
  "license": "ISC"
}
```

Now it’s time to add some dependencies. For our little webserver, we will use the popular expressjs module. We can add it to the `package.json` after the `"license": "ISC"`, so it now looks like this:

``` json
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
  "author": "Shaun Mulligan <shaun@balena.io>",
  "license": "ISC",
  "dependencies": {
    "express": "^4.14.0"
  }
}
```

Now all we need to do is add a few more lines of javacript to our main.js and we are off to the races.

``` javascript
//main.js

var express = require('express');
var app = express();

// reply to request with "Hello World!"
app.get('/', function (req, res) {
  res.send("Hello World, I'm a container running on balenaOS!");
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
local_balenaos:
  app-name: myapp
  build-triggers:
    - Dockerfile: 1327b0f9875d5c4bf7f2f36fad384c8481a00396830acd33c0af0e575648fe91
    - package.json:
```

And 2.) We then need to run a `npm install` in our build, so we add a few lines to our Dockerfile.

``` Dockerfile
FROM resin/{{ $device.id }}-alpine-node:slim
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY . .
CMD ["node", "main.js"]
```

__NOTE:__ Add `node_modules` to your `.dockerignore` file, otherwise your local modules might be copied to the device with the above `Dockerfile`, and they are likely the wrong architecture for your application!

We can now deploy our new webserver container again with:

``` bash
$ sudo balena local push -s .
```

You should now be able to point your web browser on your laptop to the IP address of your device and see the "Hello, World!" message.
