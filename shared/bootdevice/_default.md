In order to get your balenaOS device up and online, you will first need to ensure that the balenaOS system image is flashed onto the devices primary boot medium.

You will also need to ensure that the device can connect to the network, either via ethernet or wifi. Once these two requirements are satisfied, power on the device, making sure it boots from the primary boot media on which the balenaOS system image was flashed.

In about 45 seconds you should be able to connect to your device via ssh using `ssh root@balena.local -p22222`.
