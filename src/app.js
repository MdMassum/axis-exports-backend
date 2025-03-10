const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const errorMiddleware = require('./middleware/error')

// route imports
const products = require("../src/routes/productRoute")
const users = require("../src/routes/userRoute")
const order = require('../src/routes/orderRoute')

const cookieParser = require('cookie-parser')

// to access req.body
app.use(bodyparser.json()); 
app.use(express.json());
app.use(cookieParser());


//available routes
app.use('/api/v1',products);
app.use('/api/v1',users);
app.use('/api/v1',order);

// middleware for errors
app.use(errorMiddleware)
module.exports = app