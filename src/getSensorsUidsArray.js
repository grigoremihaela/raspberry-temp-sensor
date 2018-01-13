var request=require('request');
var W1Temp = require('w1temp');

// "sudo dtoverlay w1-gpio gpiopin=4 pullup=0"
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22];
var w1BusMasters = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];
var sensorsUids = [];
var pinBus = [];

var GetSensorsUidsArray = function GetSensorsUidsArray (callback) {  
  return new Promise((resolve, reject) => {
    W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids) {
      return callback ? callback(null, sensorsUids) : resolve(sensorsUids)
    })    
  })
}

module.exports = GetSensorsUidsArray

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