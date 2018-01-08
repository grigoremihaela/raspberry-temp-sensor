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

function ShowResults(value, index, ar) {  
// get instance of temperature sensor2  '28-03177067f9ff'
W1Temp.getSensor(value).then(function (sensor) {

  // print actual temperature
  var temp = sensor.getTemperature();
  //console.log('Actual temp:', temp, '°C');

  // print actual temperature on changed
  sensor.on('change', function (temp) {
    console.log('Temp from pin 4/' + (index + 1) + ': ', temp, '°C ', value);

   // post api send temp
   var json = {
     "temp": temp,
     "sensorsUids": value,
     "pin": 4,
     "numberSensor": (index + 1)
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
}  // end ShowResults

W1Temp.getSensorsUids('w1_bus_master1').then(function (sensorsUids) {
  console.log(sensorsUids);
  sensorsUids.forEach(ShowResults);
}); // end W1Temp.getSensorsUids('w1_bus_master1')

W1Temp.getSensorsUids('w1_bus_master8').then(function (sensorsUids) {
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

W1Temp.getSensorsUids('w1_bus_master11').then(function (sensorsUids) {
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

W1Temp.getSensorsUids('w1_bus_master2').then(function (sensorsUids) {
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