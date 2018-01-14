var request=require('request');
var fs =  require('fs');

const SENSOR_UID_REGEXP = /^[0-9a-f]{2}-[0-9a-f]{12}$/;

function fileExistsWait(file, maxMsWait = 20000) {
  return new Promise((resolve, reject) => {
    const endTime = +new Date() + maxMsWait;

    const check = () => {
      fs.stat(file, (err, stats) => {
        if (stats && stats.isFile()) {
          resolve();
        } else if (err && err.code === 'ENOENT' && endTime > +new Date()) {
          setTimeout(check, 1000);
        } else {
          reject();
        }
      });
    };

    check();
  });
}

module.exports.GetSensorExist = function (sensorUid) {  
    if (!SENSOR_UID_REGEXP.test(sensorUid)) {
      reject(new Error('Bad sensor uid format'));
    } else {
      const file = `/sys/bus/w1/devices/${sensorUid}/w1_slave`;

      fileExistsWait(file)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
}
/* index
var getSensorExist = require('./src/getSensorExist'); 

            var checkSensorsUid = getSensorExist.GetSensorExist(sensorsUid);
            console.log('check: ', checkSensorsUid, sensorsUid); 
            if (checkSensorsUid) {
*/

