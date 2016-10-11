---
title: Architecture
layout: docs.html
---

# Architecture Overview

## Introduction

ResinOS is an operating system optimised for running Docker containers on embedded devices, with an emphasis on reliability over long periods of operation, as well as a productive developer workflow inspired by the lessons learned while building resin.io.

The core insight behind resinOS is that Linux Containers offer, for the first time, a practical path to using virtualisation on embedded devices. VMs and hypervisors have lead to huge leaps in productivity and automation for cloud deployments, but their abstraction of hardware as well as their resource overhead and lack of hardware support means that they are out of the question for embedded scenarios. With OS-level virtualisation as implemented for Linux Containers, both those objections are lifted for Linux devices, of which there are many in the Internet of Things.

ResinOS is an operating system built for easy portability to multiple device types (via the Yocto framework) and optimised for Linux Containers, and Docker in particular. There are many decisions, large and small, we have made to enable that vision, which are present throughout our architecture.

The first version of ResinOS was developed as part of resin.io, and has run on thousands of embedded devices, deployed in many different contexts for several years. ResinOS v2 represents the combination of the learnings we extracted over those years, as well as our determination to make ResinOS a first-class open source project, able to run as an independent operating system, for any context where embedded devices and containers intersect. 

We look forward to working with the community to grow and mature ResinOS into an operating system with even broader device support, a broader operating envelope, and as always, taking advantage of the most modern developments in security and reliability.

## OS composition

The OS is composed of multiple yocto layers. The [Yocto Project](https://www.yoctoproject.org/) build system uses these layers to compile resinOS for the various [supported platforms]().
This document will not go into detailed explanation about how the [Yocto Project](https://www.yoctoproject.org/) works, but will require from the reader a basic understanding of its internals and release versioning/codename.

| Codename | Yocto Project Version | Release Date | Current Version | Support Level | Poky Version | BitBake branch |
|:--------:|:---------------------:|:------------:|:---------------:|:-------------:|:------------:|:--------------:|
|   Pyro   |          2.3          |   Apr. 2017  |                 |  Development  |              |                |
|   Morty  |          2.2          |   Oct. 2016  |                 |  Development  |              |                |
|  Krogoth |          2.1          |   Apr 2016   |       2.1       |     Stable    |     15.0     |      1.30      |
|  Jethro  |          2.0          |   Nov 2015   |       2.0       |     Stable    |     14.0     |      1.28      |
|   Fido   |          1.8          |   Apr 2015   |      1.8.1      |   Community   |     13.0     |      1.26      |
|   Dizzy  |          1.7          |   Oct 2014   |      1.7.3      |   Community   |     12.0     |      1.24      |
|   Daisy  |          1.6          |   Apr 2014   |      1.6.3      |   Community   |     11.0     |      1.22      |
|   Dora   |          1.5          |   Oct 2013   |      1.5.4      |   Community   |     10.0     |      1.20      |

We will start looking into ResinOS’s composition from the core of the [Yocto Project](https://www.yoctoproject.org/), i.e. poky. Poky has released a whole bunch of versions and supporting all of them is not in the scope of our OS, but we do try to support its latest versions. This might sound ironic as we do not currently support poky’s last version (i.e. 2.1/Krogoth), but this is only because we did not need this version yet. We tend to support versions of poky based on what our supported boards require and also do an yearly update to the latest poky version for all the boards that can run that version. Currently we support three poky versions: 2.0/Jethro, 1.8/Fido and 1.6/Daisy. 

On top of poky we add the collection of packages from meta-openembedded.
Now that we are done with setting up the the build system let’s add Board Support Packages (BSP), these layers are here to provide board specific configuration and packages (e.g. bootloader, kernel), thus enabling building physical hardware (not emulators). This type of layers are the ones one should be looking for if one wants to add support for a board, if you already have this layer your job should be fairly straightforward, if you do not have it you might be looking into a very cumbersome job. 
At this point we have all the bits and pieces in place to build an OS.
The core code of ResinOS resides in meta-resin. This layer handles a lot of functionality but the main thing that one should remember now is that here one will find the resin-image.bb recipe. This layer also needs a poky version specific layer to combine with (e.g. meta-resin-jethro), these two layers will give you the necessary framework for the abstract ResinOS generation. 
Now for the final piece of the puzzle, the board specific meta-resin configuration layer. This layer goes hand in hand with a BSP layer, for example for the Raspberry Pi family (i.e. rpi0, rpi1, rpi2, rpi3) that is supported by the meta-raspberrypi BSP we provide a meta-resin-raspberrypi layer that configures meta-resin to the raspberrypi needs. 

Below is a representative example from the Raspberry Pi family, which helps explain [meta-resin-raspberrypi/conf/samples/bblayers.conf.sample](https://github.com/resin-os/resin-raspberrypi/blob/master/layers/meta-resin-raspberrypi/conf/samples/bblayers.conf.sample).

| Layer Name                        | Reposity                                                                      | Description                                                                           |
|-----------------------------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| meta-resin                        | https://github.com/resin-os/meta-resin                                        | This repository enables building resin.io for various devices                         |
| meta-resin-jethro                 | https://github.com/resin-os/meta-resin                                        | This layer enables building resin.io for jethro supported BSPs                        |
| meta-resin-raspberrypi            | https://github.com/resin-os/resin-raspberrypi                                 | Enables building resinOS for chosen meta-raspberrypi machines.                        |
| meta-raspberrypi                  | https://github.com/agherzan/meta-raspberrypi                                  | This is the general hardware specific BSP overlay for the Raspberry Pi device family. |
| meta-openembedded                 | http://git.openembedded.org/meta-openembedded                                 | Collection of OpenEmbedded layers                                                     |
| meta-openembedded/meta-oe         | https://github.com/openembedded/meta-openembedded/tree/master/meta-oe         |                                                                                       |
| meta-openembedded/meta-python     | https://github.com/openembedded/meta-openembedded/tree/master/meta-python     | The home of python modules for OpenEmbedded.                                          |
| meta-openembedded/meta-networking | https://github.com/openembedded/meta-openembedded/tree/master/meta-networking | Central point for networking-relatedpackages and configuration.                       |
| oe-meta-go                        | https://github.com/mem/oe-meta-go                                             | OpenEmbedded layer for the Go programming language                                    |
| poky/meta-yocto                   | https://git.yoctoproject.org/git/meta-yocto                                   |                                                                                       |
| poky/meta                         | https://git.yoctoproject.org/git/poky                                         | Core functionality and configuration of Yocto Project                                 |



## Userspace Components
The resinOS userspace tries to package only the bare essentials for running containers while still offering a lot of flexibility. The philosophy is that software and services always default to being in a container, unless they are generically useful to all containers or they absolutely can’t live in a container.  The userspace consists of many open source components, but in this section we will just highlight some of the important ones.

<img src="/images/docs/arch/userspace-components.png" width="90%">

### Systemd
We use systemd as the init system for resinOS and it is responsible for launching and managing all the other services. We leverage a many of the great features of systemd, such as adjusting OOM scores for critical services and running services in separate mount namespaces. Systemd also allows us to easily manage service dependencies.

### Docker
The docker engine is a lightweight container runtime that allows us to build and run linux containers on resinOS. ResinOS has been optimized to run docker containers and has been set up to use the journald log driver and DNSmasq for container DNS resolution.
We use AUFS as the underlying storage driver since it is arguably the most production tested storage driver in the docker ecosystem. It also allows us to more easily support devices with older kernel versions and additionally gives us the ability to run on devices with Unmanaged NAND flash.
NetworkManager and ModemManager
ResinOS uses NetworkManager accompanied by ModemManager, to deliver a stable and reliable connection to the internet, be it via ethenet, wifi or cellular modem. Additionally to make headless configuration of the device’s network easy, we have added a `system-connections` folder in the boot partition which is copied into `/etc/NetworkManager/system-connections`. So any valid NetworkManager connection file can just be dropped into the boot partition before device commissioning. 

### DNSmasq

DNSmasq is here to manage the nameservers that NetworkManager provides for resinOS.
NetworkManager will discover the nameservers that can be used and a binary called resolvocnf will write them to a tmpfs location, from where DNSmasq will take over and manage these nameservers to give the user the fastest most responsive DNS resolution 

### Avahi
In order to improve the development experience of resinOS, there is an Avahi daemon that starts advertising the device as `resin.local` or `<hostname>.local` on boot if the images is a development image. 

### OpenVPN

ResinOS will provide the user with an OpenVPN server that he might use. It is worth noting that this server will be disabled by default and manual interaction from the user is needed to activate and configure this server to his needs.

## Image Partition Layout

<img src="/images/docs/arch/partition-layout.png" width="90%">

The first partition, resin-boot, is meant to hold boot important bits according to each board (e.g. kernel image, bootloader image). It also holds a very important file that the reader will find mentions to inside this document (i.e. config.json). The config.json file is the central point of configuring ResinOS and defining its behaviour, for example you can set your hostname inside, allow persistent logging etc.
Resin-root is the partition that holds our read-only root filesystem it holds almost everything that ResinOS is.
Resin-update is an empty partition that is only used when the rootfs is to be updated. We follow the Blue-Green deployment strategy. Essentially we have one active partition that is the OS’s current rootfs and one dormant one that is empty, we download the new rootfs to the dormant partition and try to switch them, if the switch is successful the dormant partition becomes the new rootfs, if not, we rollback to the old active partition. 
Resin-conf this partition holds persistent data as explained in the [link_to: Stateless and Read-only rootfs].
Resin-data is the partition that homes downloaded docker images. Generally any container data will be found here.

## Stateless and Read-Only rootFS

ResinOS comes with a read-only root filesystem, so we can ensure our hostOS is stateless, but we still need some data to be persistent over system reboots. We achieve this with a very simple mechanism, i.e. bind mounts. 
ResinOS contains a partition named resin-conf that is meant to hold all this persistent data, inside we populate a Linux filesystem hierarchy standard with the rootfs paths that we require to be persistent. After this partition is populate we are ready to bind mount the respective rootfs paths to this read-write location, thus allowing different components (e.g. journald) to be able to write data to disk. A mechanism to purge this partition is provided, thus allowing users to rollback to an unconfigured ResinOS image.

A diagram of our read-only rootfs can be seen below:

<img src="/images/docs/arch/read-only-rootfs.png" width="90%">

## Dev vs. Prod images
ResinOS comes in two flavours, namely Development (dev) and Production (prod). 
The Development images are recommended while getting started with resinOS and building a system. 
The dev images enable a number of useful features while developing, namely:

* Passwordless SSH to resinOS
* The device broadcasts as resin.local or <hostname> on the network for easy access.
* Docker socket exposed on via port 2377
* Getty console attached to tty1 and serial

__Note:__ on RPI devices don’t have Getty attached to the serial.

The production images have all of the above functionality disabled by default. In both forms of the OS we write logs to an 8 MB journald RAM 
buffer in order to avoid wear on the flash storage used by most of the supported boards. However, persistent logging can be enabled by setting 
the `”persistentLogging”: true` key in the `config.json` file in the boot partition of the device.

## OS Tools

### Base Images

To help getting started with containers on embedded systems, resinOS comes with a full complement of over 500 Docker base images. We currently have base images for
Debian, Fedora and Alpine Linux distributions, as well as Nodejs, Python, Go and Java language base image. For a more indepth look into all the available base image head over
to the [resin.io base images wiki](http://docs.resin.io/runtime/resin-base-images/) or the [resin dockerhub repository](https://hub.docker.com/u/resin/). 

### Resin Device Toolbox 

The Resin Device Toolbox or `rdt` for short, is a set of useful tools that help with setting up and developing containers with a resinOS device. The goal of `rdt` is to provide
a simple and intuitive developer experience. Currently, `rdt` is evolving fast and is considered `alpha`, so as always, we love it when you report bugs, 
you can report them here: [github.com/resin-os/resin-device-toolbox](https://github.com/resin-os/resin-device-toolbox/issues)

#### Installation
Currently `rdt` is a node.js based command line tool which requires that our system has the following dependencies installed and in our path:

* [node.js 6.x](https://nodejs.org/en/)
* [npm package manager](https://www.npmjs.com/)
* [rsync](https://download.samba.org/pub/rsync/rsync.html)
* [ssh](http://www.openssh.com/)

Once we have those setup we can install `rdt` using npm:
```
$ npm install -g resin-device-tool
```
#### Usage
##### Configure
`rdt configure` allows you configure or reconfigure a resinOS system image or SD card. Currently, this allows for configuration of wifi settings, hostname and enablement of
persistent journald logs.

```
$ rdt help configure
Usage: configure <target>

Use this command to configure or reconfigure a ResinOS drive or image.

Examples:

	$ resin configure /dev/sdc
	$ resin configure path/to/image.img
```

##### Flash
`rdt flash` command helps to easily and safely flash the resinOS system image on an SD card or USB drive.

__Note:__ Currently, `rdt flash` doesn't work with the Intel Edison board.

```
$ rdt help flash
Usage: flash <image>

Use this command to flash a ResinOS image to a drive.

Examples:

	$ resin flash path/to/resinos.img
	$ resin flash path/to/resinos.img --drive /dev/disk2
	$ resin flash path/to/resinos.img --drive /dev/disk2 --yes

Options:

    --yes, -y                           confirm non-interactively          
    --drive, -d <drive>                 drive      
```

##### Push
The `rdt push` command enables you to quickly build and deploy a docker container to a target device. It also allows you to easily sync code between your laptop 
directory and your running container on the target. Once you have resinOS host device running and advertising on the network,
`rdt push` will allow you to iterate code on a container service. `push` has a number of advanced functionality, which all gets encoded in to the `.resin-sync.yml` file in your
project directory. To better understand the `.yml` file, let's look at an example:

```
  app-name: myapp
  build-triggers:
    - Dockerfile: 9396730559c4107a0d82f95373c45d8e0634556342fb4ee276a7bc1c84c51570
    - package.json: 1e40740d7cf5018cf887124ee75917eb139d49473c51464580feda247b3a4641
destination: /usr/src/app
ignore:
  - .git
  - node_modules/
```

Let's look a bit into some of these settings keys.

* `app-name:` represents the name of the docker image and corresponding running container on the target device.
* `build-triggers:` is a list of file names and their content hashes. Any changes in the files contained in this list will result in a `docker build .` on the
target device.
* `destination:` this sets the destination sync directory in the container running on the device. This allows you synchronise a `--source` directory on your laptop to a running
container on the device. This is very useful when developing with intepretted languages like Python or Node.js as you can sync just your source code across, without rebuilding the 
entire contianer.
* `ignore:` is a list of files or directories that you would like to be ignored during the directory sync. This is useful in case where you have `node_modules` in your source 
directory that is compiled to run on your x86 laptop, but you are pushing your code over to an ARM based embedded device. 

The push has quiet a bit of functionality and a few useful flags. Checkout the `rdt help push`:

```
$ rdt help push
Usage: push [deviceIp]

WARNING: If you're running Windows, this command only supports `cmd.exe`.

Use this command to push your local changes to a container on a LAN-accessible resinOS device on the fly.

If `Dockerfile` or any file in the 'build-triggers' list is changed, a new container will be built and run on your device.
If not, changes will simply be synced with `rsync` into the application container.

After every 'resin push' the updated settings will be saved in
'<source>/.resin-sync.yml' and will be used in later invocations. You can
also change any option by editing '.resin-sync.yml' directly.

Here is an example '.resin-sync.yml' :

	$ cat $PWD/.resin-sync.yml
	destination: '/usr/src/app'
	before: 'echo Hello'
	after: 'echo Done'
	ignore:
		- .git
		- node_modules/

Command line options have precedence over the ones saved in '.resin-sync.yml'.

If '.gitignore' is found in the source directory then all explicitly listed files will be
excluded when using rsync to update the container. You can choose to change this default behavior with the
'--skip-gitignore' option.

Examples:

	$ rtb push
	$ rtb push --app-name test_server --build-triggers package.json,requirements.txt
	$ rtb push --force-build
	$ rtb push --ignore lib/
	$ rtb push --verbose false
	$ rtb push 192.168.2.10 --source . --destination /usr/src/app
	$ rtb push 192.168.2.10 -s /home/user/myResinProject -d /usr/src/app --before 'echo Hello' --after 'echo Done'

Options:

    --source, -s <path>                 root of project directory to push                                                            
    --destination, -d <path>            destination path on device container                                                         
    --ignore, -i <paths>                comma delimited paths to ignore when syncing with 'rsync'                                    
    --skip-gitignore                    do not parse excluded/included files from .gitignore                                         
    --before, -b <command>              execute a command before pushing                                                             
    --after, -a <command>               execute a command after pushing                                                              
    --progress, -p                      show progress                                                                                
    --verbose, -v                       increase verbosity                                                                           
    --app-name, -n <name>               name of application container - should be unique among other containers running on the device
    --build-triggers, -r <files>        comma delimited file list that will trigger a container rebuild if changed                   
    --force-build, -f                   force a container build and run                
```

##### SSH
`rdt ssh` discovers resinOS devices on the local network and allows you to drop a SSH session into any of the containers running on the device. It also enables to you to
drop in to the underlying host OS by doing `rdt ssh --host`, however you can of course always just do `ssh root@resin.local -p22222`.

```
$ rdt help ssh
Usage: ssh [deviceIp]

If you're running Windows, this command only supports `cmd.exe`.

Use this command to get a shell into the running application container of
your device.

The '--host' option will get you a shell into the Host OS of the ResinOS device.
No option will return a list of containers to enter or you can explicitly select
one by passing its name to the --container option

Examples:

	$ resin ssh
	$ resin ssh --host
	$ resin ssh --container chaotic_water
	$ resin ssh --container chaotic_water --port 22222
	$ resin ssh --verbose

Options:

    --verbose, -v                       increase verbosity                 
    --host, -s                          get a shell into the host OS       
    --container, -c <container>         name of container to access        
    --port, -p <port>                   ssh port number (default: 22222)   

```

##### Logs
`rdt logs` allows the fetching of logs from any of the running containers on the device.

```
$ ./bin/resin-toolbox help logs
Usage: logs [deviceIp]


Examples:

	$ rtb logs
	$ rtb logs -f
	$ rtb logs 192.168.1.10
	$ rtb logs 192.168.1.10 -f
	$ rtb logs 192.168.1.10 -f --app-name myapp

Options:

    --follow, -f                        follow log                         
    --app-name, -a <name>               name of container to get logs from 
```



