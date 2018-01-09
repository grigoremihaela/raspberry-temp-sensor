var temp=require('./src/api/temp');
var request=require('request');

var W1Temp = require('w1temp');

var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22]

var w1_bus_master = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                     'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                     'w1_bus_master11'
                     ];

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


W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids) {
  //console.log(sensorsUids);
  sensorsUids.forEach(temp.SendTempApi(value, index, 4));
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