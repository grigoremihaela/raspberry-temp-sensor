var request=require('request');

var W1Temp = require('w1temp');

// turn on gpio pin 13 as W1 power if you want to
W1Temp.setGpioPower(4);
// set gpio pin 6 to use as W1 data channel
// if is not set by instructions above (required root permissions)
W1Temp.setGpioData(4)
// turn on gpio pin 13 as W1 power if you want to
W1Temp.setGpioPower(22);
// set gpio pin 6 to use as W1 data channel
// if is not set by instructions above (required root permissions)
W1Temp.setGpioData(22)

W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids1) {
  console.log(sensorsUids1);
// get instance of temperature sensor1 '28-0316a1a16fff'
W1Temp.getSensor(sensorsUids1).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp changed 1:', temp, '°C ', sensorsUids1[0]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids1[0]
   };
   
   var options = {
     //url: 'http://192.168.1.7:3001/temperature',
     url: 'http://pi-temp-api.herokuapp.com/temperature',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(err, res, body) {
    //console.log(err);
     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
       //console.log(res.statusCode);
       //console.log(body);
     }
   });
   // post api send temp
   });
});
});

W1Temp.getSensorsUids('w1_bus_master2').then(function (sensorsUids2) {
  console.log(sensorsUids2);
// get instance of temperature sensor2  '28-03177067f9ff'
W1Temp.getSensor(sensorsUids2).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp changed 2:', temp, '°C ', sensorsUids2[0]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids2[0]
   };
   
   var options = {
     //url: 'http://192.168.1.7:3001/temperature',
     url: 'http://pi-temp-api.herokuapp.com/temperature',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(err, res, body) {
    //console.log(err);
     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
       //console.log(res.statusCode);
       //console.log(body);
     }
   });
   // post api send temp
   });
});
});
/*
// print list of available sensors uids (ex.: [ '28-00000636a3e3' ])
W1Temp.getSensorsUids().then(function (sensorsUids) {
  console.log(sensorsUids);

// get instance of temperature sensor
W1Temp.getSensor(sensorsUids[0]).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp changed 0:', temp, '°C');

   // post api send temp
   var json = {
     "temp": temp
   };
   
   var options = {
     //url: 'http://192.168.1.7:3001/temperature',
     url: 'http://pi-temp-api.herokuapp.com/temperature',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(err, res, body) {
    //console.log(err);
     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
       //console.log(res.statusCode);
       //console.log(body);
     }
   });
   // post api send temp
   });

});

// get instance of temperature sensor
W1Temp.getSensor(sensorsUids[1]).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp changed 1:', temp, '°C');

   // post api send temp
   var json = {
     "temp": temp
   };
   
   var options = {
     //url: 'http://192.168.1.7:3001/temperature',
     url: 'http://pi-temp-api.herokuapp.com/temperature',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(err, res, body) {
    //console.log(err);
     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
       //console.log(res.statusCode);
       //console.log(body);
     }
   });
   // post api send temp
   });

});

});
*/