// v3 
var request=require('request');
var W1Temp = require('w1temp');
var temp=require('./src/api/temp'); 
/*  "sudo dtoverlay w1-gpio gpiopin=4 pullup=0"
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22];
var w1BusMaster = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];
*/
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
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22];
var w1BusMasters = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];
var sensorsUids = [];
var pinBus = [];

var promises = w1BusMasters.map(function(sensorsUid, index){
  return new Promise(function(resolve,reject) {
    var sensorsUids = W1Temp.getSensorsUids('w1_bus_master1');
    return resolve(sensorsUids);
  })
})

var promises1 = function getSensorsUidsArray() {
  return new Promise(function(resolve,reject) {
    Promise.all(promises).then(function(results) {
      console.log('results', results);
    });
    //return resolve(results);
    return resolve(sensorsUids);
  })
}
    Promise.all(promises1).then(function(results) {
      console.log('results', results);
    });
console.log('sensorsUids2: ', sensorsUids); 

/*
//good
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

// good
new Promise((resolve, reject) => {
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
          resolve(pinBus);
          console.log(pinBus); // [ { pin: 4, busMaster: 'w1_bus_master1' },{ pin: 17, busMaster: 'w1_bus_master8' },{ pin: 22, busMaster: 'w1_bus_master11' } ]
        }); // end W1Temp.getSensor
      }); // end sensorsUids.forEach
    }); // end W1Temp.getSensorsUids
  }); // end PIN.forEach
});
*/
/* 
var sensorsUids = [];
var pinBus = [];

function getSensorsUidsArray() {
  return new Promise(function(resolve,reject) {
    W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids) {
      resolve(sensorsUids);
    })
  })
}
async function asyncSensorsUidsArray() {
  var sensorsUids = await getSensorsUidsArray();
  // expected output: "resolved"
  console.log('sensorsUids1: ', sensorsUids);  
  return sensorsUids;
}
var sensorsUids = asyncSensorsUidsArray(); 
console.log('sensorsUids2: ', sensorsUids); 
*/
/*
function delay(sensorsUids) {
var promises = sensorsUids.map(function(sensorsUid){
         return new Promise(function(resolve,reject) {
            if (W1Temp.getSensor(sensorsUid)) {
                 if (pinBus.length === 0) {
                   pinBus.push({ 'pin': 4, 'busMaster': 'w1_bus_master1' });
                 };
                 if (pinBus.length>0 && pinBus[pinBus.length-1].pin!=4) {
                   pinBus.push({ 'pin': 4, 'busMaster': 'w1_bus_master1' });
                 };
            };
            return resolve(pinBus);
         })
})
Promise.all(promises).then(function(results) {
    console.log('results', results)
})
console.log('pinBus1 ', pinBus);
return  pinBus;
}
//pinBus = delay(sensorsUids);
//console.log(pinBus);
function delay2() {
var promises1 = w1BusMasters.map(function(w1BusMaster){
         return new Promise(function(resolve,reject) {
            //W1Temp.getSensorsUids(w1BusMaster)
              if (sensorsUids.length > 0) {
                console.log('sensorsUids ', sensorsUids);
                pinBus = delay(sensorsUids);
                console.log('pinBus2 ', pinBus);
              };
              return resolve(pinBus);
            //}); // end W1Temp.getSensorsUids
         })
})
Promise.all(promises1).then(function(results1) {
    console.log('results1', results1)
})
return  pinBus;
}
pinBus = delay2();
console.log('pinBus ', pinBus);
//console.log('pinBus ', pinBus);
*/

/*
//good
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

// good
new Promise((resolve, reject) => {
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
          resolve(pinBus);
          console.log(pinBus); // [ { pin: 4, busMaster: 'w1_bus_master1' },{ pin: 17, busMaster: 'w1_bus_master8' },{ pin: 22, busMaster: 'w1_bus_master11' } ]
        }); // end W1Temp.getSensor
      }); // end sensorsUids.forEach
    }); // end W1Temp.getSensorsUids
  }); // end PIN.forEach
});
*/
