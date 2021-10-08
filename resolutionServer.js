require("dotenv").config();
const express = require('express');
const got = require('got');

// Connect
require('db');

const Resolution = require('./resolve');

const app = express();
const port = 3003;
app.use(express.json())

app.post('/resolution', (req, res) => {
    const newResolution = new Resolution({...req.body});
    newResolution.save().then(() => {
          res.send('new resolution added successfully')
    }).catch((err) => {
         res.status(500).send('internal server error');
    })
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
app.get('/resolution/:id', (req, res) => {
    Resolution.findById(req.params.id).then((resolution) => {
        if (resolution) {
           res.json(resolution)
        } else {
            res.status(404).send('resolution not found');
        }
     }).catch((err) => {
        res.status(500).send('internal server error');
    });
})
app.delete('/resolution/:id', (req, res) => {
    Resolution.findOneAndRemove(req.params.id).then((resolution) 	=> {
        if (resolution) {
             res.json('resolution deleted successfully')
        } else {
            res.status(404).send('resolution not found'); 
        }
    }).catch((err) => {
         res.status(500).send('internal Server Error');
    });
});
app.listen(port, () => {
     console.log(`resolution service running on port ${port}`);
})