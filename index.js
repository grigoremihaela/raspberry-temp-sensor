var temp=require('./src/api/temp');
var request=require('request');

var W1Temp = require('w1temp');

var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22]

var w1BusMaster = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];

//var pinBus = [{'pin': 4, 'busMaster': 'w1_bus_master1'}, {'pin': 17, 'busMaster': 'w1_bus_master8'}, {'pin': 22, 'busMaster': 'w1_bus_master11'}];
var pinBus = [];
var pinBusObj = {};
i = 0;
// turn on gpio pin 13 as W1 power if you want to
//W1Temp.setGpioPower(4);
// set gpio pin 6 to use as W1 data channel
// if is not set by instructions above (required root permissions)
//W1Temp.setGpioData(4)
// turn on gpio pin 13 as W1 power if you want to
//W1Temp.setGpioPower(27);
// set gpio pin 6 to use as W1 data channel
// if is not set by instructions above (required root permissions)
//W1Temp.setGpioData(27)

PIN.forEach(function(pin, bus) {
  W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      W1Temp.getSensor(value).then(function (sensor) {
        console.log(pin, '   ', w1BusMaster[bus]);
        if (i==0) {
          pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
          console.log('pinBus: ', pinBus);
          i++;
        };
        if (i>0 && pinBus[i-1].pin!=pin) {
          pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
          console.log('pinBus: ', pinBus);
          i++;
        };
      }); // end W1Temp.getSensor
    }); // end sensorsUids.forEach
  }); // end W1Temp.getSensorsUids
}); // end PIN.forEach

/*
PIN.forEach(function(pin, bus) {
  W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      temp.SendTempApi(value, index, pin);
    }); // end sensorsUids.forEach
  }); // end W1Temp.getSensorsUids
}); // end PIN.forEach
*/
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
