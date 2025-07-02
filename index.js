const express = require('express');
const app = express();
require("./connection");
const PORT = 5000;
const userRouter = require('./Routes/User');
const logRequest = require('./Middlewares/index');


app.use(express.json());

//middleware
app.use(logRequest);

// User Routes 
app.use(userRouter);





app.listen(PORT, () => console.log("Server start at port 5000"));