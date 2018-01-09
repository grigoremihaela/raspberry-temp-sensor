var request=require('request');
var W1Temp = require('../../node_modules/w1temp');

module.exports.SendTempApi  = function (value, index) {  
  console.log('succes ', index, ': ', value);
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
