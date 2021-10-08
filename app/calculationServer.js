const express = require('express');
const rp = require('request-promise');
const uuid = require('uuid');
const app = express();
const port = 3000;

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
    rp({
     method: 'POST',
     uri: 'http://resolutions:3000' +'/resolution',
     body: {
         payload : uuid.v4()
     }
     });
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