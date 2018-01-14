var request=require('request');
var fs =  require('fs');
var Sensor = require('w1temp/src/lib/Sensor');
const SENSOR_UID_REGEXP = /^[0-9a-f]{2}-[0-9a-f]{12}$/;

module.exports.GetSensorExist = function (sensorUid) {  
  const maxMsWait = 20000;
    if (!SENSOR_UID_REGEXP.test(sensorUid)) {
      reject(new Error('Bad sensor uid format'));
    } else {
      const file = `/sys/bus/w1/devices/${sensorUid}/w1_slave`;

    const check = () => {
      fs.stat(file, (err, stats) => {
        if (stats && stats.isFile()) {
          return;
        } else if (err && err.code === 'ENOENT' && endTime > +new Date()) {
          setTimeout(check, 1000);
        } else {
          reject();
        }
      });
    };

    return check();

    }
  
}
