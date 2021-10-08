require("dotenv").config();
const express = require('express');
const got = require('got');

// Connect
require('db');

const Confirmation = require('./confirm');

const app = express();
const port = 3002;
app.use(express.json())

app.post('/confirmation', (req, res) => {
    const newConfirmation = new Confirmation({...req.body});
    newConfirmation.save().then(() => {
          res.send('new confirmation added successfully')
    }).catch((err) => {
         res.status(500).send('internal server error');
    })
})

app.get('/confirmations', (req, res) => {
   Confirmation.find().then((confirmation) => {
        if (confirmation.length !== 0) {
              res.json(confirmation)
        } else {
            res.status(404).send('confirmation not found');
       }
    }).catch((err) => {
         res.status(500).send('internal Server Error!');
    });
})
app.get('/confirmation/:id', (req, res) => {
    Confirmation.findById(req.params.id).then((confirmation) => {
        if (confirmation) {
           res.json(confirmation)
        } else {
            res.status(404).send('confirmation not found');
        }
     }).catch((err) => {
        res.status(500).send('internal server error');
    });
})
app.delete('/confirmation/:id', (req, res) => {
    Confirmation.findOneAndRemove(req.params.id).then((confirmation) 	=> {
        if (confirmation) {
             res.json('confirmation deleted successfully')
        } else {
            res.status(404).send('confirmation not found'); 
        }
    }).catch((err) => {
         res.status(500).send('internal Server Error');
    });
});
app.listen(port, () => {
     console.log(`confirmation service running on port ${port}`);
})