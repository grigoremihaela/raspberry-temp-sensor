var request=require('request');
var W1Temp = require('w1temp');
var temp=require('./src/api/temp');

/*
var PIN = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]

var w1_bus_master = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                     'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                     'w1_bus_master11', 'w1_bus_master12', 'w1_bus_master13', 'w1_bus_master14', 'w1_bus_master15', 
                     'w1_bus_master16', 'w1_bus_master17', 'w1_bus_master18', 'w1_bus_master19', 'w1_bus_master20', 
                     'w1_bus_master21', 'w1_bus_master22', 'w1_bus_master23', 'w1_bus_master24', 'w1_bus_master25', 
                     'w1_bus_master26'];
*/
var PIN = [4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 22];
var w1BusMaster = ['w1_bus_master1',  'w1_bus_master2',  'w1_bus_master3',  'w1_bus_master4',  'w1_bus_master5',  
                   'w1_bus_master6',  'w1_bus_master7',  'w1_bus_master8',  'w1_bus_master9',  'w1_bus_master10', 
                   'w1_bus_master11'
                   ];

var sensorsUids1 = [[ '28-031770f1c0ff', '28-0516a1dd9cff', '28-0316a1d3faff', '28-0416a165a5ff' ], 
                    [ '00-c1e000000000', '00-21e000000000', '00-a1e000000000' ],
                    [], [], [], [], [],
                    [ '28-0316a1a16fff' ], [], [], [ '28-03177067f9ff' ]
                  ];
var sensorsUidsArray = [];
var pinBus = [];
var i = 0; 
/*
function delay1() {
  return new Promise(function(resolve,reject) {
PIN.forEach(function(pin, bus) {
    W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
      sensorsUidsArray.push(sensorsUids);
      resolve(sensorsUidsArray);
    }); // end W1Temp.getSensorsUids
 }); // end PIN.forEach
  }); // end Promise
}

async function asyncCall1() {
  var result = await delay1();
  // expected output: "resolved"
}

sensorsUidsArray = asyncCall1();
console.log('sensorsUidsArray: ', sensorsUidsArray);
*/
function delay() {
return new Promise(function(resolve,reject) {
PIN.forEach(function(pin, bus) {
    W1Temp.getSensorsUids(w1BusMaster[bus]).then(function (sensorsUids) {
      sensorsUidsArray[i] = sensorsUids;
      i++;
      //sensorsUidsArray.push(sensorsUids);
      console.log('sensorsUidsArray1: ', sensorsUidsArray);
      resolve(sensorsUidsArray);
    }); // end W1Temp.getSensorsUids
 }); // end PIN.forEach
}); // end Promise
}
async function asyncCall() {
  var result = await delay();
  // expected output: "resolved"
}

asyncCall();
console.log('sensorsUidsArray: ', sensorsUidsArray);

/*

function delay() {
  return new Promise(function(resolve,reject) {
  PIN.forEach(function(pin, bus) {
    //console.log(sensorsUids1[bus], sensorsUids1[bus].length);
      if(sensorsUids1[bus].length > 0){
          if (i==0) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          if (i>0 && pinBus[i-1].pin!=pin) {
            pinBus[i] = { 'pin': pin, 'busMaster': w1BusMaster[bus] };
            i++;
          };
          resolve(pinBus);
      };
  }); // end PIN.forEach
  }); // end Promise
}
async function asyncCall() {
  var result = await delay();
  // expected output: "resolved"
}

asyncCall();
console.log('pinBus: ', pinBus);
*/

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

/*
// v3  too slowly?
var pinBus = [{'pin': 4, 'busMaster': 'w1_bus_master1'}, 
              {'pin': 17, 'busMaster': 'w1_bus_master8'}, 
              {'pin': 22, 'busMaster': 'w1_bus_master11'}
              ];
pinBus.forEach(function(pinBusMaster) {
  var pin = pinBusMaster.pin;
  var bus = pinBusMaster.busMaster;
  W1Temp.getSensorsUids(bus).then(function (sensorsUids) {
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