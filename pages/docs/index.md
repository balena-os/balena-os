---
title: Introduction
---

## What is resinOS?

ResinOS has been designed to include the minimal set of required components to reliably support operation of the Docker engine in embedded scenarios. It uses the Yocto framework as a foundation, systemd as the init system. 

The networking stack consists of Network Manager, DNSmasq and Modem Manager. We have found these components to be a robust stack for dealing with the diversity of hardware and unpredictability of configuration of networks in which a device may be booted.

In addition, we include Avahi, Dropbear, and OpenVPN, which add support for mDNS, SSH, and VPN connections respectively. 

This foundation is uniquely suited to running arbitrary containers on a wide range of embedded devices which resinOS supports. Resin.io has also made available a wide selection of base images for containers which are optimised for the same scenario and allow developers to create applications based on the Debian, Alpine, or Fedora distributions. That is not to say, of course, that any other container base image may not be used, but that the images by resin.io have been verified to work well with resinOS, implementing patterns which are particularly suitable for embedded devices, like resinOS itself.

