const express = require('express');
const port = 3000;
const app = express();
app.use(express.json())

var desiredLoadFactor = .5;

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
	setTimeout(start, 1000* (1 - desiredLoadFactor));
}

app.post('/confirmation', (req, res) => {
    console.log('confirmation accepted');
    res.sendStatus(200);
    start();
})

app.listen(port, () => {
     console.log(`confirmation service running on port ${port}`);
})