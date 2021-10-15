const request = require('request');
const uuid = require('uuid');
var uuid_instance = uuid.v4();

function sendTransaction() {
    request.post(
        'http://transactions:3000' + '/calculate',
        { json: { payload: uuid_instance } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
            else {
                console.log(error);
            }
        }
    );
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
const rndMinutes = randomIntFromInterval(11, 59)

function tick() {
    //get the mins of the current time
    var mins = new Date().getMinutes();
    if (mins == rndMinutes) {
      loopingCalls();
    }
  }
  
setInterval(tick, 1000);

function loopingCalls() {
    for (let step = 0; step < 1000; step++) {
        await sleep(10);
        sendTransaction();
      }
      console.log('crazy time');

}

setInterval(function(){sendTransaction();},550);
