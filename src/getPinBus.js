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

function delay() {
  return new Promise((res, reject) => {
PIN.map(function(pin, bus){
  return W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
       sensorsUids.map(function(sensorsUid, index){
         return W1Temp.getSensor(value).then(function (sensor) {
                 if (i==0) {
                   pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
                   i++;
                 };
                 if (i>0 && pinBus[i-1].pin!=pin) {
                   pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
                   i++;
                 };
                 resolve(pinBus);
         })
       })
  }); // return new Promise
}) // PIN map
})
}

async function asyncCall() {
  var result = await delay();
  // expected output: "resolved"
  console.log('result: ', result); 
}

asyncCall();
module.exports.GetPinBus  = function () { 
  console.log('pinBus1: ', pinBus);  // []
    return pinBus;
  }
/*
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