In order to get the resinOS up and running on our {{ $device.name }} we need to first set it up to boot from our {{ $device.bootMedia }} rather than its internal [eMMC memory][emmc-link]. To do this we need to set the tiny `SW2` dip switch to position `1:on` and `2:on`, as shown below.

__Note:__ This resinOS will completely write over the existing eMMC.

<img src="/images/docs/devices/artik5/artik5-dev-kit.png" width="80%">

We can now insert the 5VDC power cable and flip the power, switch labelled `PWR SW`, to the `on` position. We should now have some glowing LEDs indicating 
a sign of life. Next we need to press and hold the `SW3 POWER` push button for 1 or 2 seconds, this starts the boot from the {{ $device.bootMedia }}.

__Note:__ In order for the wifi to work correctly, you need to set jumpers `J20` and `J33` towards the edge of the board.

Your {{ $device.name }} will now flash resinOS onto the internal eMMC so that you can remove the {{ $device.bootMedia }}. This will take a minute or two, so time for more tea!! 
Once it has finished it will shut itself down and all the activity LEDs will switch off. At this point you need to:
1. Flip `PWR SW` back to `off` position.
2. Remove the {{ $device.bootMedia }}.
3. set the  `SW2` dip switches to `1:off` and `2:off`.

After all of that we flip the `PWR SW` back `on` and once again hold down the `SW3 POWER` button for a second or so. If all goes according to plan we should now have a 
freshly provisioned {{ $device.name }} sitting in an `IDLE` state on our dashboard, ready and waiting to receive some code. **So lets deploy some code!!!**

[emmc-link]:http://www.datalight.com/solutions/technologies/emmc/what-is-emmc
