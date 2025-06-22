const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Flock!');
});
app.get('/about', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});