const express = require('express');
const rp = require('request-promise');
const uuid = require('uuid');
const app = express();
const port = 3000;

app.use(express.json())

app.get('/calculate', (req, res) => {
    rp({
        method: 'POST',
        uri: 'http://calculations:3000' +'/calculation',
        body: {
            payload : uuid.v4()
            }
        });
 })

 app.listen(port, () => {
    console.log(`transaction service running on port ${port}`);
})
