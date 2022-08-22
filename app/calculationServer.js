const express = require('express');
const request = require('request');
var winston = require('winston');
const {transports, createLogger, format} = require('winston');
const schedule = require('node-schedule');
const uuid = require('uuid');
const app = express();
const port = 3000;
var uuid_instance = uuid.v4();
require('./db');
const logger = winston.createLogger({
	format: format.combine(
		format.timestamp(),
		format.json()
	),
    transports: [
        new winston.transports.Console()
    ]
});

const Calculation = require('./calculate');
app.use(express.json())


const rule = new schedule.RecurrenceRule();
rule.hour = [9,14,21];
rule.minute = 30;

const bleed_time = schedule.scheduleJob({hour: rule.hour, minute: rule.minute}, function() {
    bleed();
});

function bleed() {
    setTimeout(bleed, Math.random() * 50000)
    const lostObjects = [];
    const lostObj = {memory: "leaked"};
    [...Array(3000)].map(i => lostObjects.push(lostObj));
  }

app.post('/calculation', (req, res) => {
    const newCalculation = new Calculation({...req.body});
    newCalculation.save().then(() => {
        res.sendStatus(200);
    }).catch((err) => {
         res.status(500).send('internal Server Error');
    })
        request.post(
            'http://resolutions:3000' + '/resolution',
            { json: { payload: uuid_instance } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    logger.info("resolution successful");
                }
                else {
                    logger.info(error);
                }
            }
        );
        logger.info("calculation successful");
})

app.get('/calculations', (req, res) => {
   Calculation.find().then((calculation) => {
        if (calculation.length !== 0) {
              res.json(calculation)
        } else {
            res.status(404).send('calculation not found');
       }
    }).catch((err) => {
         res.status(500).send('internal server error');
    });
})

app.listen(port, () => {
    logger.info('calculation service running on port 3000');
})