const request = require('request');
const express = require('express')
var winston = require('winston');
const {transports, createLogger, format} = require('winston');
const schedule = require('node-schedule');
const uuid = require('uuid');
const app = express()
app.use(express.static(__dirname + '/public'));

var uuid_instance = uuid.v4();
const logger = winston.createLogger({
	format: format.combine(
		format.timestamp(),
		format.json()
	),
    transports: [
        new winston.transports.Console()
    ]
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function sendTransaction() {
    request.post(
        'http://transactions:3000' + '/calculate',
        { json: { payload: uuid_instance } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                logger.info("calculation successful");
            }
            else {
                logger.info(error);
            }
        }
    );
}


const crazy_rule = new schedule.RecurrenceRule();
crazy_rule.hour = [9,14,21];
crazy_rule.minute = 30;

const normal_time = schedule.scheduleJob('*/5 * * * * *', function(){
  sendTransaction();
});

const crazy_time = schedule.scheduleJob({hour: crazy_rule.hour, minute: crazy_rule.minute}, function() {
    loopingCalls();
  });
  
async function loopingCalls() {
    for (let step = 0; step < 1000; step++) {
        await sleep(300);
        sendTransaction();
      }
      logger.info('crazy time');
}

app.listen(3000,'0.0.0.0');