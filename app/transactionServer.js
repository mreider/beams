const express = require('express');
const request = require('request');
const uuid = require('uuid');
const app = express();
const port = 3000;
var uuid_instance = uuid.v4();
app.use(express.json())

app.get('/calculate', (req, res) => {
        res.sendStatus(200);
        request.post(
            'http://calculations:3000' + '/calculation',
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
});

 app.listen(port, () => {
    console.log('transaction service running on port ${port}');
})
