var request=require('request');
var W1Temp = require('w1temp');
var temp=require('./src/api/temp');
/*
var getPinBus=require('./src/getPinBus');
var pinBus = getPinBus.GetPinBus();
console.log('pinBus: ', pinBus);  // []
*/
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