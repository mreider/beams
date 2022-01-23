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

function blockCpuFor(ms) {
	var now = new Date().getTime();
	var result = 0
	while(shouldRun) {
		result += Math.random() * Math.random();
		if (new Date().getTime() > now +ms)
			return;
	}	
}

function start() {
	shouldRun = true;
	blockCpuFor(1000*desiredLoadFactor);
	setTimeout(start, 1000* (1 - .5));
}

app.post('/confirmation', (req, res) => {
    res.sendStatus(200);
    start();
})

app.listen(port, () => {
    logger.info('confirmation service running on port 3000');
})