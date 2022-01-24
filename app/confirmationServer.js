const express = require('express');
var winston = require('winston');
const {transports, createLogger, format} = require('winston');
const port = 3000;
const app = express();
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

app.post('/confirmation', (req, res) => {
    res.sendStatus(200);
	logger.info('confirmed');
})

app.listen(port, () => {
    logger.info('confirmation service running on port 3000');
})