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
$ wget files.resin.io/images/raspberrypi3/2.0.0/resinos-dev.img -O ~/Downloads/resinos-dev.img
```

## Install rdt
`rdt` or Resin Device Toolbox, is a collection of utilities which helps us to develop resinOS based application containers. It’s not strictly necessary, but makes life so so much sweeter, but if you like doing things the hard way, skip over to the next section.

Currently `rdt` is a node.js based command line tool which requires that our system has the following dependencies installed and in our path:


* [node.js 6.x]()
* [npm package manager]()
* [rsync]()
* [ssh]()

Once we have those setup we can install `rdt` using npm:
```
$ npm install -g resin-device-tool
```

## Configure the Image
To allow resinOS images to be easily configurable before boot, some key config files are added to boot partition. In this step we will use `rdt` to configure the network, set our hostname to `resin` and disable persistent logging, because we don’t want to kill our poor SD card with excessive writes.
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
Flash SD card
To get flashing, just point the `rdt flash` command to the image we just downloaded and follow the prompts. If you hate prompts, `rdt` also allows you to skip them, check the [`rdt` docs](#rdt-docs) on how to do this.

__NOTE:__ `rdt flash` requires administrative privileges because it needs to access the SD card.

```
$ sudo rdt flash ~/Downloads/resinos-dev.img
Password:
x No available drives were detected, plug one in!
```

Once you plug in your SD card or USB drive, `rdt` should detect it and show you the following selection dialog. Make sure to select the correct drive if you have a few listed, as `rdt` will complete write over the entire drive.

```
$ sudo rdt flash ~/Downloads/resinos-dev.img 
Password:
? Select drive (Use arrow keys)
❯ /dev/disk3 (7.9 GB) - STORAGE DEVICE 
```

Once you are happy you have selected the correct drive, hit enter and wait while your new OS is written to the drive. It should only take about 3 minutes, depending on the quality of your drive, so this is a great time to go grab a caffeinated beverage.
```
$ sudo rdt flash ~/Downloads/resinos-dev.img
? Select drive /dev/disk3 (7.9 GB) - STORAGE DEVICE
? This will erase the selected drive. Are you sure? Yes
Flashing [========================] 100% eta 0s  
Validating [========================] 100% eta 0s 
### Boot the device
{{ import "bootdevice" }}
```
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

Either mount the SD card and run:
```
$ rdt configure /path/to/SD-card
```
And select `y` when asked if you want to add advanced settings.

Alternatevely you can add `“persistentLogging”: true` to `config.json` in your boot partition of the SD card 

To Enable persistent logs in a running device, add `“persistentLogging”: true` to `/mnt/boot/config.json` and reboot.

The journal can be found at  `/var/log/journal/` which is bind mounted to `root-overlay/var/log/journal` in the `resin-conf` partition. 
When logging is not persistent, the logs can be found at `/run/log/journal/` and this log is volatile so you will loose all logs when you power the device down.