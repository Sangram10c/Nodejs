const express = require('express');
require('./connection');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const userRouter = require('./Routes/Url');

const app = express();

app.use(express.json());
app.use(userRouter);



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});