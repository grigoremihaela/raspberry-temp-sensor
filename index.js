// v3 
var request=require('request');
var W1Temp = require('w1temp');
var temp=require('./src/api/temp'); 

var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22];
var w1BusMaster = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];
var pinBus = [];
var i = 0; 

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
pinBus.forEach(function(pinBusMaster) {
  W1Temp.getSensorsUids(pinBusMaster.busMaster).then(function (sensorsUids) {
    sensorsUids.forEach(function(value, index) {
      temp.SendTempApi(value, index, pinBusMaster.pin);
    }); // end sensorsUids.forEach()
  }); // end W1Temp.getSensorsUids()
}); // end PIN.forEach()
*/
/*
var sensorsUids = [ '28-031770f1c0ff','28-0516a1dd9cff','28-0316a1d3faff','28-0416a165a5ff' ];
var pinBus = [];

var promises = sensorsUids.map(function(sensorsUid, index){
         return new Promise(function(resolve,reject) {
                 if (pinBus.length === 0) {
                   pinBus.push({ 'pin': 4, 'busMaster': 'w1_bus_master1' });
                 };
                 if (pinBus.length>0 && pinBus[pinBus.length-1].pin!=4) {
                   pinBus.push({ 'pin': 4, 'busMaster': 'w1_bus_master1' });
                 };
                 return resolve(pinBus);
         })
})
console.log('promises', JSON.stringify(promises));
Promise.all(promises).then(function(results) {
    console.log('results', results[0])
})
console.log(pinBus);
*/
new Promise((resolve, reject) => {
  PIN.forEach(function(pin, bus) {
    W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {

        var promises = sensorsUids.map(function(sensorsUid, index){
         return new Promise(function(resolve,reject) {
              W1Temp.getSensor(sensorsUid).then(function (sensor) {
                 if (pinBus.length === 0) {
                   pinBus.push({ 'pin': pin, 'busMaster': w1BusMaster[bus] });
                 };
                 if (pinBus.length>0 && pinBus[pinBus.length-1].pin!=4) {
                   pinBus.push({ 'pin': pin, 'busMaster': w1BusMaster[bus] });
                 };
              }); // end W1Temp.getSensor
              return resolve(pinBus);
         })
        })
        console.log('promises', JSON.stringify(promises));
        Promise.all(promises).then(function(results) {
            //console.log('results', results[0])
        })
        console.log(pinBus);


      }); // end sensorsUids.forEach
    }); // end W1Temp.getSensorsUids
  }); // end PIN.forEach
});


