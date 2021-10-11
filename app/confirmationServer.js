const express = require('express');
const port = 3000;
const app = express();
app.use(express.json())


app.post('/confirmation', (req, res) => {
    console.log('confirmation accepted');
    res.sendStatus(200);
})

app.listen(port, () => {
     console.log(`confirmation service running on port ${port}`);
})