const axios = require('axios');
const DEVICES = require('./dictionaries/device.json');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const _ = require('lodash');

const manuallyUpdatedDeviceTypes = [
  'nitrogen6x',
  'odroid-c1',
  'odroid-ux3',
  'cubox-i',
  'beaglebone-green',
  'beaglebone-green-wifi',
  'artik10'
];

module.exports = devices => {
  return Promise.all(
    devices.map(device => {
      if (_.includes(manuallyUpdatedDeviceTypes, device.id)) {
        return device;
      }
      return axios(
        `https://img.resin.io/api/v1/image/${device.id}/versions`
      ).then(res => {
        const version = res.data.latest.replace(/.prod/, '.dev');
        device.os_version = version;
        device.download_url = `https://files.resin.io/resinos/${device.id}/${encodeURIComponent(
          version
        )}/image/resin.img.zip`;
        return device;
      });
    })
  ).then(devices => {
    return fs.writeFileAsync(
      `${__dirname}/dictionaries/device.json`,
      JSON.stringify(devices, null, 2)
    );
  });
};

module.exports(DEVICES);
