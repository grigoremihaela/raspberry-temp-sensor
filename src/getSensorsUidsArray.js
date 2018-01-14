var request=require('request');
var fs =  require('fs');
//var fileExistsWait = require('w1temp/src/lib/fileExistsWait');
const SENSOR_UID_REGEXP = /^[0-9a-f]{2}-[0-9a-f]{12}$/;

module.exports.GetSensorsUidsArray = function (bus) {  
    const maxMsWait = 20000;
    const file = '/sys/bus/w1/devices/' + bus + '/w1_master_slaves';

        const endTime = +new Date() + maxMsWait;

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

    check();

        const data = fs.readFileSync(file, 'utf8');
        const list = data
          .split('\n')
          .filter((line) => SENSOR_UID_REGEXP.test(line));

        return list;
      
}

/*
var getSensorsUidsArray=require('./src/getSensorsUidsArray');
var sensorsUids = getSensorsUidsArray.GetSensorsUidsArray();
console.log('sensorsUids: ', sensorsUids);  // []
*/
/*
function getArray() {
  return new Promise(function(resolve,reject) {
    W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids) {
      resolve(sensorsUids);
    })
  })
}
async function asyncArray() {
  var result =  await getArray();
  // expected output: "resolved"
  console.log('sensorsUids1: ', result); 
}

 asyncArray();
 console.log('sensorsUids2: ', sensorsUids);
module.exports.GetSensorsUidsArray  = function () {
   return sensorsUids; 
}
*/
/* 
// index
var getSensorsUidsArray = require('./src/getSensorsUidsArray');

var sensorsUids = getSensorsUidsArray.GetSensorsUidsArray();
console.log('sensorsUids: ', sensorsUids);  // []

var promises = w1BusMasters.map(function(w1BusMaster){
  return new Promise(function(resolve,reject) {
    W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids) {
      resolve(sensorsUids);
      console.log('sensorsUids1: ', sensorsUids);
    })
    return sensorsUids;
  })
})
Promise.all(promises).then(function(results) {
    console.log('results', results)
})
console.log('sensorsUids2: ', promises);
*/