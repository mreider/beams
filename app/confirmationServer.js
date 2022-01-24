const express = require('express');
const winston = require('winston');
const port = 3000;
const app = express();
app.use(express.json())
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

app.post('/confirmation', (req, res) => {
    res.sendStatus(200);
	logger.info('confirmed');
    start();
})

app.listen(port, () => {
    logger.info('confirmation service running on port 3000');
})