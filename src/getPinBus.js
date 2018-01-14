// v3 
var request=require('request');
var fs =  require('fs');
var getSensorsUidsArray = require('getSensorsUidsArray'); 
const SENSOR_UID_REGEXP = /^[0-9a-f]{2}-[0-9a-f]{12}$/;
  
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22]; // "sudo dtoverlay w1-gpio gpiopin=4 pullup=0"
var w1BusMasters = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];
var pinBus = [];
var aux = {};

function delay(sensorsUids, w1BusMaster, key) {
var promises = sensorsUids.map(function(sensorsUid){
         return new Promise(function(resolve,reject) {
            if (W1Temp.getSensor(sensorsUid)) {
                 if (pinBus === []) {
                   pinBus.push({ 'pin': PIN[key], 'busMaster': w1BusMaster });
                   aux = { 'pin': PIN[key], 'busMaster': w1BusMaster };
                 };
                 if (pinBus != [] && aux.pin!=PIN[key]) {
                   pinBus.push({ 'pin': PIN[key], 'busMaster': w1BusMaster });
                   aux = { 'pin': PIN[key], 'busMaster': w1BusMaster };
                 };
            };
            return resolve(pinBus);
         })
})
Promise.all(promises).then(function(results) {
    //console.log('results', results)
})
//console.log('pinBus1 ', pinBus);
return  pinBus;
}
//pinBus = delay(sensorsUids);
//console.log(pinBus);
function delay2() {
var promises1 = w1BusMasters.map(function(w1BusMaster, key){
         return new Promise(function(resolve,reject) {
          //console.log('key ', key);
            var sensorsUids = getSensorsUidsArray.GetSensorsUidsArray(w1BusMaster);
            //console.log(sensorsUids ? sensorsUids.length : 'json_data is null or undefined');
            //console.log('sensorsUids ', sensorsUids);
            //if (sensorsUids !== "undefined" && sensorsUids !== []) {
              if (sensorsUids != []) {
                //console.log('sensorsUids ', sensorsUids);
                pinBus = delay(sensorsUids, w1BusMaster, key);
                //console.log('pinBus2 ', pinBus);
              };
            //};
              return resolve(pinBus);
         })
})
Promise.all(promises1).then(function(results1) {
    //console.log('results1', results1)
})
return  pinBus;
}

module.exports.GetPinBus = function (bus) { 
  var pinBus = delay2();
  //console.log('pinBus ', pinBus);
  return pinBus;
}

/*
// unfinished
var request=require('request');
var W1Temp = require('w1temp');
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22];
var w1BusMaster = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];
var pinBus = [];
var i = 0; 

const calculatePinBus = new Promise((res, reject) => {
  PIN.forEach(function(pin, bus) {
    W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
      sensorsUids.forEach(function(value, index) {
        W1Temp.getSensor(value).then(function (sensor) {
          //console.log(pin, '   ', w1BusMaster[bus]);
          if (i==0) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          if (i>0 && pinBus[i-1].pin!=pin) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          res(pinBus);
          //console.log(pinBus); // [ { pin: 4, busMaster: 'w1_bus_master1' },{ pin: 17, busMaster: 'w1_bus_master8' },{ pin: 22, busMaster: 'w1_bus_master11' } ]
        }); // end W1Temp.getSensor
      }); // end sensorsUids.forEach
    }); // end W1Temp.getSensorsUids
  }); // end PIN.forEach
});

module.exports.GetPinBus  = async function () { 
    pinBus = await calculatePinBus;
    console.log('pinBus 2: ', pinBus);
    return pinBus;
}
*/
/*
module.exports.GetPinBus  = function () { 
return new Promise((resolve, reject) => {
  PIN.forEach(function(pin, bus) {
    W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
      sensorsUids.forEach(function(value, index) {
        W1Temp.getSensor(value).then(function (sensor) {
          console.log(pin, '   ', w1BusMaster[bus]);
          if (i==0) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          if (i>0 && pinBus[i-1].pin!=pin) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          resolve(pinBus);
          console.log(pinBus); // [ { pin: 4, busMaster: 'w1_bus_master1' },{ pin: 17, busMaster: 'w1_bus_master8' },{ pin: 22, busMaster: 'w1_bus_master11' } ]
        }); // end W1Temp.getSensor
      }); // end sensorsUids.forEach
    }); // end W1Temp.getSensorsUids
  }); // end PIN.forEach
});
}


new Promise(function(res, reject) {
  PIN.forEach(function(pin, bus) {
    W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
      sensorsUids.forEach(function(value, index) {
        W1Temp.getSensor(value).then(function (sensor) {
          //console.log(pin, '   ', w1BusMaster[bus]);
          if (i==0) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          if (i>0 && pinBus[i-1].pin!=pin) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          res(pinBus);
          //console.log(pinBus); // [ { pin: 4, busMaster: 'w1_bus_master1' },{ pin: 17, busMaster: 'w1_bus_master8' },{ pin: 22, busMaster: 'w1_bus_master11' } ]
        }); // end W1Temp.getSensor
      }); // end sensorsUids.forEach
    }); // end W1Temp.getSensorsUids
  }); // end PIN.forEach
})
.then(function(pinBus) {
  console.log('pinBus 1: ', pinBus);
});
*/