const express = require('express');
const rp = require('request-promise');
const uuid = require('uuid');
const app = express();
const port = 3000;

require('./db');
const Resolution = require('./resolve');
app.use(express.json())

app.post('/resolution', (req, res) => {
    const newResolution = new Resolution({...req.body});
    newResolution.save().then(() => {
          res.send('new resolution added successfully')
    }).catch((err) => {
         res.status(500).send('internal server error');
    })
    rp({
        method: 'POST',
        uri: 'http://confirmations:3000' +'/confirmation',
        body: {
            payload : uuid.v4()
        }
        });
})

app.get('/resolutions', (req, res) => {
   Resolution.find().then((resolution) => {
        if (resolution.length !== 0) {
              res.json(resolution)
        } else {
            res.status(404).send('resolution not found');
       }
    }).catch((err) => {
         res.status(500).send('internal Server Error!');
    });
})


app.listen(port, () => {
     console.log(`resolution service running on port ${port}`);
})