const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/data', (req, res) => {
    const message = req.body.message;
    console.log('Received from frontend:', message);
    res.json({ reply: `Server received: "${message}"` });
});

app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});
