Put the USB drive into your device and connect either the ethernet cable or WiFi adapter. Ensure that you also have an HDMI screen and keyboard are connected up.

Now connect up the power supply and turn the device on by pushing the power button.

Press the F10 key while the **BIOS** is loading in order to enter the boot menu. Next, select the `UEFI : USB` option from the boot menu so that the device will boot from your USB drive.

Once the device boots, you should see console output on the screen. At this time the device is flashing the balenaOS system image onto the devices' internal media.

__Warning:__ The balenaOS will completely overwrite the internal media of your NUC, so if you have important data on the device, we recommend that you make a backup before installing balenaOS on your device.

After a few minutes, the OS will be fully flashed to the internal media and the device will shut itself down. At this point, you will see all the LEDs have turned off. You can now remove the USB drive and press the power button once again.

Your NUC should now automatically boot into the balenaOS.

__Note:__ If for some reason your device does not boot into balenaOS, you may need to go back into the **BIOS** and make sure the boot order correctly selects to boot from the internal SATA drive and not from USB.
