// v3 
var request=require('request');
var W1Temp = require('w1temp');
var temp=require('./src/api/temp'); 
var pinBus = [{'pin': 4, 'busMaster': 'w1_bus_master1'}, 
              {'pin': 5, 'busMaster': 'w1_bus_master2'}, 
              {'pin': 6, 'busMaster': 'w1_bus_master3'},
              {'pin': 7, 'busMaster': 'w1_bus_master4'}, 
              {'pin': 8, 'busMaster': 'w1_bus_master5'}, 
              {'pin': 9, 'busMaster': 'w1_bus_master6'}, 
              {'pin': 10, 'busMaster': 'w1_bus_master7'},
              {'pin': 22, 'busMaster': 'w1_bus_master8'}                      
              ];
pinBus.forEach(function(pinBusMaster) {
  W1Temp.getSensorsUids(pinBusMaster.busMaster).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      temp.SendTempApi(value, index, pinBusMaster.pin);
    }); // end sensorsUids.forEach()
  }); // end W1Temp.getSensorsUids()
}); // end PIN.forEach()
