require("dotenv").config();
const express = require('express');
const got = require('got');

// Connect
require('./db');

const Calculation = require('./calculate');

const app = express();
const port = 3001;
app.use(express.json())


app.post('/calculation', (req, res) => {
    const newCalculation = new Calculation({...req.body});
    newCalculation.save().then(() => {
          res.send('new calculation added successfully')
    }).catch((err) => {
         res.status(500).send('internal Server Error');
    })
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
app.get('/calculation/:id', (req, res) => {
    Calculation.findById(req.params.id).then((calculation) => {
        if (calculation) {
           res.json(calculation)
        } else {
            res.status(404).send('calculation not found');
        }
     }).catch((err) => {
        res.status(500).send('internal server error');
    });
})
app.delete('/calculation/:id', (req, res) => {
    Calculation.findOneAndRemove(req.params.id).then((calculation) 	=> {
        if (calculation) {
             res.json('calculation deleted successfully')
        } else {
            res.status(404).send('calculation not found'); 
        }
    }).catch((err) => {
         res.status(500).send('internal server error');
    });
});
app.listen(port, () => {
     console.log(`calculation service running on port ${port}`);
})