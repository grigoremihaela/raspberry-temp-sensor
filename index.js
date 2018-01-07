var request=require('request');

var W1Temp = require('w1temp');

var PIN = [2, 3, 4, 8, 9, 10, 11, 14, 15, 17, 18, 22, 23, 24, 25, 27]

var w1_bus_master = ['w1_bus_master1', 'w1_bus_master2', 'w1_bus_master3', 'w1_bus_master4', 'w1_bus_master5', 'w1_bus_master6', 
                     'w1_bus_master7', 'w1_bus_master8', 'w1_bus_master9', 'w1_bus_master10', 'w1_bus_master11', 'w1_bus_master12', 
                     'w1_bus_master13', 'w1_bus_master14', 'w1_bus_master15', 'w1_bus_master16'];

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
  console.log(sensorsUids);

// get instance of temperature sensor
W1Temp.getSensor(sensorsUids[0]).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp w1_bus_master1 1 from pin 4:', temp, '°C ', sensorsUids[0]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids[0],
     "pin": 4,
     "numberSensor": 1
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
    console.log('Temp w1_bus_master1 2 from pin 4:', temp, '°C ', sensorsUids[1]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids[1],
     "pin": 4,
     "numberSensor": 2
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
W1Temp.getSensor(sensorsUids[2]).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp w1_bus_master1 3 from pin 4:', temp, '°C ', sensorsUids[2]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids[2],
     "pin": 4,
     "numberSensor": 3
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
W1Temp.getSensor(sensorsUids[3]).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp w1_bus_master1 4 from pin 4:', temp, '°C ', sensorsUids[3]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids[3],
     "pin": 4,
     "numberSensor": 4
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

W1Temp.getSensorsUids('w1_bus_master10').then(function (sensorsUids) {
  console.log(sensorsUids);
// get instance of temperature sensor2  '28-03177067f9ff'
W1Temp.getSensor(sensorsUids[0]).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp from pin 17:', temp, '°C ', sensorsUids[0]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids[0],
     "pin": 17,
     "numberSensor": 1
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

W1Temp.getSensorsUids('w1_bus_master12').then(function (sensorsUids) {
  console.log(sensorsUids);
// get instance of temperature sensor2  '28-03177067f9ff'
W1Temp.getSensor(sensorsUids[0]).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp from pin 22:', temp, '°C ', sensorsUids[0]);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": sensorsUids[0],
     "pin": 22,
     "numberSensor": 1
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
