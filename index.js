var request=require('request');

var W1Temp = require('w1temp');

// turn on gpio pin 13 as W1 power if you want to
W1Temp.setGpioPower(13);

// set gpio pin 6 to use as W1 data channel
// if is not set by instructions above (required root permissions)
W1Temp.setGpioData(6);

// print list of available sensors uids (ex.: [ '28-00000636a3e3' ])
W1Temp.getSensorsUids().then(function (sensorsUids) {
  console.log(sensorsUids);
setInterval(function(){ 
  for (var i = 0; i < sensorsUids.length; i++) {
    console.log('start sensor'+i);
    // get instance of temperature sensor
W1Temp.getSensor(sensorsUids[i]).then(function (sensor) {

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
console.log('stop sensor'+i);
}//end for
}, 1000);

});
