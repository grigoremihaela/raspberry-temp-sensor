var request=require('request');
var fs =  require('fs');

const SENSOR_UID_REGEXP = /^[0-9a-f]{2}-[0-9a-f]{12}$/;

module.exports.GetSensorExist = function (sensorUid) {  
  const maxMsWait = 20000;
    if (!SENSOR_UID_REGEXP.test(sensorUid)) {
      reject(new Error('Bad sensor uid format'));
    } else {
      const file = `/sys/bus/w1/devices/${sensorUid}/w1_slave`;

      const endTime = +new Date() + maxMsWait;

    const check = () => {
      fs.stat(file, (err, stats) => {
        if (stats && stats.isFile()) {
          return true;
        } else if (err && err.code === 'ENOENT' && endTime > +new Date()) {
          setTimeout(check, 1000);
        } else {
          reject();
        }
      });
    };

    check();

    }
  
}
