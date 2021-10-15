const express = require('express');
const request = require('request');
const uuid = require('uuid');
const app = express();
const port = 3000;
var uuid_instance = uuid.v4();
require('./db');

const Calculation = require('./calculate');
app.use(express.json())

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
const rndMinutes = randomIntFromInterval(11, 59)

function tick() {
    //get the mins of the current time
    var mins = new Date().getMinutes();
    if (mins == rndMinutes) {
      bleed();
    }
  }
  

function bleed() {
    setTimeout(bleed, Math.random() * 50000)
    const lostObjects = [];
    const lostObj = {memory: "leaked"};
    [...Array(3000)].map(i => lostObjects.push(lostObj));
  }

app.post('/calculation', (req, res) => {
    setInterval(tick, 1000);
    const newCalculation = new Calculation({...req.body});
    newCalculation.save().then(() => {
          res.send('new calculation added successfully')
    }).catch((err) => {
         res.status(500).send('internal Server Error');
    })
        request.post(
            'http://resolutions:3000' + '/resolution',
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
        console.log('calculated');
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
     console.log(`calculation service running on port ${port}`);
})