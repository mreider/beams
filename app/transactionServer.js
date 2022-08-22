const express = require('express');
const request = require('request');
var winston = require('winston');
const {transports, createLogger, format} = require('winston');
const uuid = require('uuid');
const app = express();
const port = 3000;
var uuid_instance = uuid.v4();
app.use(express.json())
const logger = winston.createLogger({
	format: format.combine(
		format.timestamp(),
		format.json()
	),
    transports: [
        new winston.transports.Console()
    ]
});

app.post('/calculate', (req, res) => {
        res.sendStatus(200);
        request.post(
            'http://calculations:3000' + '/calculation',
            { json: { payload: uuid_instance } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    logger.info("calcuation successful");
                }
                else {
                    logger.info(error);
                }
            }
        );
});

 app.listen(port, () => {
    logger.info('transaction service running on port 3000');
})
