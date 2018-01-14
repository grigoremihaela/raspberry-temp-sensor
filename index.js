var request=require('request');
var W1Temp = require('w1temp');
var temp = require('./src/api/temp'); 
var getPinBus=require('./src/getPinBus');
var fs =  require('fs');
const SENSOR_UID_REGEXP = /^[0-9a-f]{2}-[0-9a-f]{12}$/;
  
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22]; // "sudo dtoverlay w1-gpio gpiopin=4 pullup=0"
var w1BusMasters = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];

var pinBus = getPinBus.GetPinBus('w1_bus_master1');
console.log('pinBus end: ', pinBus);  
/*
var pinBus = [{'pin': 4, 'busMaster': 'w1_bus_master1'}, 
              {'pin': 5, 'busMaster': 'w1_bus_master2'}, 
              {'pin': 7, 'busMaster': 'w1_bus_master3'},
              {'pin': 9, 'busMaster': 'w1_bus_master4'}, 
              {'pin': 11, 'busMaster': 'w1_bus_master5'}, 
              {'pin': 13, 'busMaster': 'w1_bus_master6'}, 
              {'pin': 15, 'busMaster': 'w1_bus_master7'},
              {'pin': 17, 'busMaster': 'w1_bus_master8'}, 
              {'pin': 19, 'busMaster': 'w1_bus_master9'},
              {'pin': 21, 'busMaster': 'w1_bus_master10'}, 
              {'pin': 22, 'busMaster': 'w1_bus_master11'}                      
              ];
*/
//v3
pinBus.forEach(function(pinBusMaster) {
  W1Temp.getSensorsUids(pinBusMaster.busMaster).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      temp.SendTempApi(value, index, pinBusMaster.pin);
    }); // end sensorsUids.forEach()
  }); // end W1Temp.getSensorsUids()
}); // end PIN.forEach()

/*
//v2
PIN.forEach(function(pin, bus) {
  W1Temp.getSensorsUids(w1BusMasters[bus]).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      temp.SendTempApi(value, index, pin);
    }); // end sensorsUids.forEach
  }); // end W1Temp.getSensorsUids
}); // end PIN.forEach
*/

/*
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
*/
