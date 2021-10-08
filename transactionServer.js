const express = require('express');
const rp = require('request-promise');
const uuid = require('uuid');
const Transaction = require('./transact');
const app = express();
const port = 3004;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const calculate_server_string = process.env.CALCULATE_SERVER + ':' + process.env.CALCULATE_PORT

require('db');
app.use(express.json())

app.post('/transaction', (req, res) => {
    const newTransaction = new Transaction({...req.body});
    newTransaction.save().then(() => {
          res.send('new transaction added successfully')
    }).catch((err) => {
         res.status(500).send('internal server error');
    })
}


app.get('/transactions', (req, res) => {
   Transaction.find().then((transaction) => {
        if (transaction.length !== 0) {
              res.json(transaction)
        } else {
            res.status(404).send('transaction not found');
       }
    }).catch((err) => {
         res.status(500).send('internal server error');
    });
})
app.get('/transaction/:id', (req, res) => {
    Transaction.findById(req.params.id).then((transaction) => {
        if (transaction) {
           res.json(transaction)
        } else {
            res.status(404).send('transaction not found');
        }
     }).catch((err) => {
        res.status(500).send('internal Server Error!');
    });
})
app.delete('/transaction/:id', (req, res) => {
    Transaction.findOneAndRemove(req.params.id).then((transaction) 	=> {
        if (transaction) {
             res.json('transaction deleted successfully')
        } else {
            res.status(404).send('transaction not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('internal server error!');
    });
});
app.listen(port, () => {
     console.log(`transaction service running on port ${port}`);
})

// hit the calculate server
app.get('/calculate', (req, res) => {
    rp({
        method: 'POST',
        uri: calculate_server_string +'/',
        body: {
            payload : uuid.v4()
        }
                });
 })
