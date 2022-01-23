const express = require('express');
const request = require('request');
const winston = require('winston');
const uuid = require('uuid');
const app = express();
const port = 3000;
var uuid_instance = uuid.v4();
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

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
        request.post(
            'http://confirmations:3000' + '/confirmation',
            { json: { payload: uuid_instance } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    logger.info(body);
                }
                else {
                    
                }
            }
        );
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
    logger.info('transaction service running on port 3000');
})