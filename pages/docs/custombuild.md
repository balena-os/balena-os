---
title: Architecture
layout: docs.html
---

# Building your Own

## Bake your own Image
In order to build your very own version of resinOS for one of our supported boards, you will first need to make sure you have a working [Yocto environment setup](http://www.yoctoproject.org/docs/current/yocto-project-qs/yocto-project-qs.html).
Then pick the device type you wanna build, in this example we will use the raspberry pi 3. So first we need to grab the [`resin-raspberrypi`](https://github.com/resin-os/resin-raspberrypi) and initialise all its submodules.
``` bash
git clone https://github.com/resin-os/resin-raspberrypi
git submodule update --init --recursive
```
We can then use the helpful `BARYS` (Build Another Resin Yocto System) tool to setup up and start our build. To see all the functionality `BARYS` provides run `./resin-yocto-scripts/build/barys -h`
from with in the repo.

Now to actually build a development version of resinOS for the Raspberry Pi 3, we can run the following:
``` bash
./resin-yocto-scripts/build/barys -r --shared-downloads $(pwd)/shared-downloads/ --shared-sstate $(pwd)/shared-sstate/ -m raspberrypi3
```

**NOTE:** To create a managed build (one that communicates with and can be managed through resin.io's services),
you'll need to specify the `--resinio` flag, as resinOS builds are unmanaged by default.

Now sit tight and maybe go and make several cups of tea, this is gonna take a little while.

## Supporting your Own Board

Pre-requisites: a [Yocto](https://www.yoctoproject.org) Board Support Package (BSP) layer for your particular board. It should be compatible to the Yocto releases resinOS supports.

Repositories used to build resinOS host Operating System (OS) are typically named resin-`<board-family>`. For example, consider [resin-raspberrypi](https://github.com/resin-os/resin-raspberrypi) which is used for building the OS for [Raspberryi Pi](https://raspberrypi.org), or [resin-intel](https://github.com/resin-os/resin-intel) repository which can be used to build a resin.io image for the Intel NUC boards.

Contributing support for a new board consist of creating a a Yocto package that includes:

* general hardware support for the specific board,
* the resinOS-specific software features,
* deployment-specific features (i.e. settings to create SD card images or self-flashing images)

The following documentations walks you through the steps of creating such a Yocto package. Because of the substantial difference between the hardware of many boards, this document provides general directions, and often it might be helpful to see the examples of already supported boards. The list of the relevant repositories is found the end of this document.

### Board Support Repository Breakout

The resin-`<board-family>` repositories use [git submodules](https://git-scm.com/docs/git-submodule) for including required Yocto layers from the relevant sub-projects.

The root directory shall contain 2 directory entries:

* a `layers` directory
* [resin-yocto-scripts](https://github.com/resin-os/resin-yocto-scripts) git submodule.

_Note: you add submodules by `git submodule add <url> <directory>`, see the git documentation for more details._

The root directory generally also includes the following files:

* `CHANGELOG.md`
* `LICENSE`
* `README.md`
* `VERSION`

and one or more files named `<yocto-machine-name>.coffee`, one for each of the boards that the repository will add support for (eg. [`raspberry-pi3.coffee`](https://github.com/resin-os/resin-raspberrypi/blob/master/raspberrypi3.coffee) for Raspberry Pi 3 in `resin-raspberrypi`). This file contains information on the Yocto build for the specific board, in [CoffeeScript](http://coffeescript.org/) format. A minimal version of this file, using Raspberry Pi 3 as the example, would be:

``` coffeescript
module.exports =
  yocto:
    machine: 'raspberrypi3'
    image: 'resin-image'
    fstype: 'resinos-img'
    version: 'yocto-jethro'
    deployArtifact: 'resin-image-raspberrypi3.resinos-img'
    compressed: true
```

The `layers` directory contains the git submodules of the yocto layers used in the build process. This normally means the following components are present:

- [poky](https://www.yoctoproject.org/tools-resources/projects/poky)  at the version/revision required by the board BSP
- [meta-openembedded](https://github.com/openembedded/meta-openembedded) at the revision poky uses
- [meta-resin](https://github.com/resin-os/meta-resin) using the master branch
- [oe-meta-go](https://github.com/resin-os/oe-meta-go) using the master branch (there were no branches corresponding to the yocto releases at the time this howto was written)
- Yocto BSP layer for the board (for example, the BSP layer for Raspberry Pi is [meta-raspberrypi](https://github.com/agherzan/meta-raspberrypi))
- any additional Yocto layers required by the board BSP (check the Yocto BSP layer of the respective board for instructions on how to build the BSP and what are the Yocto dependencies of that particular BSP layer)

In addition to the above git submodules, the "layers" directory also contains a meta-resin-`<board-family>` directory (please note this directory is _not_ a git submodule, but an actual directory in the ). This directory contains the required customization for making a board resin.io enabled. For example, the [resin-raspberrypi](https://github.com/resin-os/resin-raspberrypi) repository contains the directory `layers/meta-resin-raspberrypi` to supplement the BSP from `layers/meta-raspberrypi` git submodule, with any changes that might be required by resinOS.

The layout so far looks as follows:

```
├── CHANGELOG.md
├── LICENSE
├── README.md
├── VERSION
├── layers
│   ├── meta-openembedded
│   ├── meta-<board-family>
│   ├── meta-resin
│   ├── meta-resin-<board-family>
│   ├── oe-meta-go
│   └── poky
├── <board>.coffee
└── resin-yocto-scripts
```

### meta-resin-`<board-family>` breakout

This directory contains:

* `COPYING.Apache-2.0` file with the [Apache Version 2.0 license](http://www.apache.org/licenses/LICENSE-2.0),
* `README.md` file specifying the supported boards

and a number of directories out of which the mandatory ones are:

- `conf` directory - contains the following files:
    - `layer.conf`, see the [layer.conf](https://github.com/resin-os/resin-raspberrypi/blob/master/layers/meta-resin-raspberrypi/conf/layer.conf) from `meta-resin-raspberrypi` for an example, and see [Yocto documentation](http://www.yoctoproject.org/docs/2.0/mega-manual/mega-manual.html#bsp-filelayout-layer)
    - `samples/bblayers.conf.sample` file in which all the required Yocto layers are listed, see this [bblayers.conf.sample](https://github.com/resin-os/resin-raspberrypi/blob/master/layers/meta-resin-raspberrypi/conf/samples/bblayers.conf.sample) from `meta-resin-raspberrypi` for an example, and see the [Yocto documentation](http://www.yoctoproject.org/docs/2.0/mega-manual/mega-manual.html#var-BBLAYERS)
    - `samples/local.conf.sample` file which defines part of the build configuration (see the meta-resin [README.md](https://github.com/resin-os/meta-resin/blob/master/README.md) for an overview of some of the variables use in the `local.conf.sample` file). An existing file can be used (e.g. [local.conf.sample](https://github.com/resin-os/resin-raspberrypi/blob/master/layers/meta-resin-raspberrypi/conf/samples/local.conf.sample)) but making sure the "Supported machines" area lists the appropriate machines this repository is used for. See also the [Yocto documentation](http://www.yoctoproject.org/docs/2.0/mega-manual/mega-manual.html#structure-build-conf-local.conf).

- `recipes-containers/docker-disk` directory, whichcontains docker-resin-supervisor-disk.bbappend that shall define the following variable(s):

    - `SUPERVISOR_REPOSITORY_<yocto-machine-name>`: this variable is used to specify the build of the supervisor. It can be one of (must match the architecture of the board):
        *  **resin/armv7hf-supervisor** (for armv7 boards),
        * **resin/i386-supervisor**
        (for x86 boards),
        * **resin/amd64-supervisor** (for x86-64 boards),
        * **resin/rpi-supervisor** (for raspberry pi 1),
        * **resin/armel-supervisor** (for armv5 boards).

    - `LED_FILE_<yocto-machine-name>`: this variable should point to the [Linux sysfs path of an unused LED](https://www.kernel.org/doc/Documentation/ABI/testing/sysfs-class-led) if available for that particular board. This allows the unused LED to be flashed for quick visual device identification purposes). If no such unused LED exists, this variable shall not be used.

- `recipes-core/images` directory, which contains at least a `resin-image.bbappend` file. Depending on the type of board you are adding support for, you should have your device support either just `resin-image` or both `resin-image-flasher` and `resin-image`. Generally, `resin-image` is for boards that boot directly
from external storage (these boards do not have internal storage to install resin.io on). `resin-image-flasher` is used when the targeted board has internal storage so this flasher image is burned onto an SD card or USB stick that is used for the initial boot. When booted, this flasher image will automatically install resin.io on internal storage.

  The `resin-image.bbappend` file shall define the following variables:

    - `IMAGE_FSTYPES_<yocto-machine-name>`: this variable is used to declare the type of the produced image (it can be ext3, ext4, resinos-img etc. The usual type for a board that can boot from SD card, USB, is "resinos-img").

    - `RESIN_BOOT_PARTITION_FILES_<yocto-machine-name>`: this allows adding files from the build's deploy directory into the vfat formatted resin-boot partition (can be used to add bootloader config files, first stage bootloader, initramfs or anything else needed for the booting process to take place for your particular board). If the board uses different bootloader configuration files when booting from either external media (USB thumb drive, SD card etc.) or from internal media (mSATA, eMMC etc) then you would want make use of this variable to make sure the different bootloader configuration files get copied over and further manipulated as needed (see `INTERNAL_DEVICE_BOOTLOADER_CONFIG_<yocto-machine-name>` and `INTERNAL_DEVICE_BOOTLOADER_CONFIG_PATH_<yocto-machine-name>` below). Please note that you only reference these files here, it is the responsibility of a `.bb` or `.bbappend` to provide and deploy them (for bootloader config files this is done with an append typically in `recipes-bsp/<your board's bootloader>/<your board's bootloader>.bbappend`, see [resin-intel grub bbappend](https://github.com/resin-os/resin-intel/blob/master/layers/meta-resin-genericx86/recipes-bsp/grub/grub_%25.bbappend) for an example)

    It is a space separated list of items with the following format: *FilenameRelativeToDeployDir:FilenameOnTheTarget*. If *FilenameOnTheTarget* is omitted then the *FilenameRelativeToDeployDir* will be used.

    For example to have the Intel NUC `bzImage-intel-corei7-64.bin` copied from deploy directory over to the boot partition, renamed to `vmlinuz`:

    ```sh
    RESIN_BOOT_PARTITION_FILES_nuc = "bzImage-intel-corei7-64.bin:vmlinuz"
    ```

  The `resin-image-flasher.bbappend` file shall define the following variables:

    - `IMAGE_FSTYPES_<yocto-machine-name>` (see above)
    - `RESIN_BOOT_PARTITION_FILES_<yocto-machine-name>` (see above). For example, if the board uses different bootloader configuration files for booting from SD/USB and internal storage (see below the use of `INTERNAL_DEVICE_BOOTLOADER_CONFIG` variable), then make sure these files end up in the boot partition (i.e. they should be listed in this `RESIN_BOOT_PARTITION_FILES_<yocto-machine-name>` variable)

- `recipes-kernel/linux directory`: shall contain a `.bbappend` to the kernel recipe used by the respective board. This kernel `.bbappend` must "inherit kernel-resin" in order to add the necessary kernel configs for using with resin.io

- `recipes-support/resin-init` directory - shall contain a `resin-init-flasher.bbappend` file if you intend to install resin.io to internal storage and hence use the flasher image. This shall define the following variables:

  - `INTERNAL_DEVICE_KERNEL_<yocto-machine-name>`: this variable is used to identify the internal storage where resin.io will be written to.
  - `INTERNAL_DEVICE_BOOTLOADER_CONFIG_<yocto-machine-name>`: this variable is used to specify the filename of the bootloader configuration file used by your board when booting from internal media (must be the same with the *FilenameOnTheTarget* parameter of the bootloader internal config file used in the `RESIN_BOOT_PARTITION_FILES_<yocto-machine-name>` variable from `recipes-core/images/resin-image-flasher.bbappend`)

  - `INTERNAL_DEVICE_BOOTLOADER_CONFIG_PATH_<yocto-machine-name>`: this variable is used to specify the relative path (including filename) to the resin-boot partition where `INTERNAL_DEVICE_BOOTLOADER_CONFIG_<yocto-machine-name>` will be copied to.

    For example, setting

    ```sh
    INTERNAL_DEVICE_BOOTLOADER_CONFIG_intel-corei7-64 = "grub.cfg_internal"
    ```
    and
    ```sh
    INTERNAL_DEVICE_BOOTLOADER_CONFIG_PATH_intel-corei7-64 = "/EFI/BOOT/grub.cfg"
    ```
    will result that after flashing the file `grub.cfg`_internal is copied with the name `grub.cfg` to the /EFI/BOOT/ directory on the resin-boot partition.


The directory structure then looks similar to this:
```
├── COPYING.Apache-2.0
├── README.md
├── conf
│   ├── layer.conf
│   └── samples
│       ├── bblayers.conf.sample
│       └── local.conf.sample
├── recipes-bsp
│   └── bootfiles
├── recipes-containers
│   └── docker-disk
│       └── docker-resin-supervisor-disk.bbappend
├── recipes-core
│   ├── images
│   │   └── resin-image.bbappend
├── recipes-kernel
│   └── linux
│       ├── linux-<board-family>-<version>
│       │   └── <patch files>
│       ├── linux-<board-family>_%.bbappend
│       └── linux-<board>_<version>.bbappend
└── recipes-support
    └── resin-init
        ├── files
        │   └── resin-init-board
        └── resin-init-board.bbappend
```

### Building

See the [meta-resin Readme](https://github.com/resin-os/meta-resin/blob/master/README.md) on how to build the new resinOS image after setting up the new board package as defined above.

### Troubleshooting

For specific examples on how board support is provided for existing devices, see the repositories in the [Supported Boards](/docs/supportedboards) section.
