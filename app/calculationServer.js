const express = require('express');
const request = require('request');
const uuid = require('uuid');
const app = express();
const port = 3000;
var uuid_instance = uuid.v4();
require('./db');

const Calculation = require('./calculate');
app.use(express.json())


app.post('/calculation', (req, res) => {
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