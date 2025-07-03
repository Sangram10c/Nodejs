const express = require('express');
const app = express();
require("./connection");
const PORT = 5000;
const path = require('path');
const userRouter = require('./Routes/User');
const logRequest = require('./Middlewares/index');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./Views'));

app.use(express.json());

//middleware
app.use(logRequest);

// User Routes 
app.use(userRouter);





app.listen(PORT, () => console.log("Server start at port 5000"));