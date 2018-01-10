var request=require('request');
var W1Temp = require('w1temp');
var fileExistsWait = require('w1temp/src/lib/fileExistsWait');
var Sensor = require('w1temp/src/lib/Sensor';
const { SENSOR_UID_REGEXP } = require('w1temp/src/lib/constants';

module.exports.GetSensorPinBus  = function (sensorUid) { 
  return new Promise((resolve, reject) => {
    if (!SENSOR_UID_REGEXP.test(sensorUid)) {
      reject(new Error('Bad sensor uid format'));
    } else {
      const file = `/sys/bus/w1/devices/${sensorUid}/w1_slave`;

      fileExistsWait(file)
        .then(() => {
          const sensor = new Sensor(file);
          resolve(sensor);
        })
        .catch(() => {
          reject(new Error('Cant get sensor instance'));
        });
    }
  });
}