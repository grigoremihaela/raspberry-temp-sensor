var request=require('request');
var W1Temp = require('w1temp');
var temp=require('./src/api/temp');
/*
var getPinBus=require('./src/getPinBus');
var pinBus = getPinBus.GetPinBus();
console.log('pinBus: ', pinBus);  // []
*/
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22]
var w1BusMaster = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];
var pinBus = [];
var i = 0; 

const calculatePinBus = new Promise((resolve, reject) => {
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
        //console.log('pinBus 1: ', pinBus); // [ { pin: 4, busMaster: 'w1_bus_master1' },{ pin: 17, busMaster: 'w1_bus_master8' },{ pin: 22, busMaster: 'w1_bus_master11' } ]
      }); // end W1Temp.getSensor
    }); // end sensorsUids.forEach
  }); // end W1Temp.getSensorsUids
}); // end PIN.forEach
});
console.log(calculatePinBus);
// turn on gpio pin 13 as W1 power if you want to
//W1Temp.setGpioPower(13);
// set gpio pin 6 to use as W1 data channel
// if is not set by instructions above (required root permissions)
//W1Temp.setGpioData(6)

//v1
W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids) {
  //console.log(sensorsUids);
  sensorsUids.forEach(function(value, index) {
    temp.SendTempApi(value, index, 4);
  });
}); // end W1Temp.getSensorsUids('w1_bus_master1')

W1Temp.getSensorsUids('w1_bus_master8').then(function (sensorsUids) {
  //console.log(sensorsUids);
  // get instance of temperature sensor
  temp.SendTempApi(sensorsUids[0], 0, 17)
});

W1Temp.getSensorsUids('w1_bus_master11').then(function (sensorsUids) {
  //console.log(sensorsUids);
  // get instance of temperature sensor
  temp.SendTempApi(sensorsUids[0], 0, 22)
});

/*
// v3  too slowly?
var pinBus = [{'pin': 4, 'busMaster': 'w1_bus_master1'}, {'pin': 17, 'busMaster': 'w1_bus_master8'}, {'pin': 22, 'busMaster': 'w1_bus_master11'}];
pinBus.forEach(function(obj, index) {
  var pin = obj.pin;
  var bus = obj.busMaster;
  W1Temp.getSensorsUids(bus).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      temp.SendTempApi(value, index, pin);
    }); // end sensorsUids.forEach
  }); // end W1Temp.getSensorsUids
}); // end PIN.forEach
*/

/* 
//v2 slow
PIN.forEach(function(pin, bus) {
  W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      temp.SendTempApi(value, index, pin);
    }); // end sensorsUids.forEach
  }); // end W1Temp.getSensorsUids
}); // end PIN.forEach
*/