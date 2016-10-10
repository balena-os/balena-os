Put the SD card into your device, and connect either the ethernet cable or WiFi adapter. Now hold down the small black button marked `s2` (located near the SD card slot) and power up the device by inserting the power or USB cable.

You should only need to hold the button down for about 5 seconds until the blue LEDs start flashing like crazy. Basically, by holding down the button, we are telling the Beaglebone that we want to boot from the SD card instead of the onboard flash. From there, the OS which is on the SD card is flashed onto the internal eMMC memory.

__Warning:__ This will completely overwrite any data on your devices' internal eMMC, so make sure to make a backup of any important data.

<img src="/img/beaglebone/sd_card_BBB.jpg" width="40%">


After the internal media has been flashed, your device will shut itself down and all its LEDs should switch off. Before booting the device again, make sure to **remove the SD card**. 
You may then simply press the power button situated nearest to the ethernet port or pull out and replug the power cable.

<img src="/img/beaglebone/beaglebone_device_dash_post_provisioning.png" width="80%">

Your device should now start booting from internal eMMC and in a minute or so you should have a happy Beaglebone device

