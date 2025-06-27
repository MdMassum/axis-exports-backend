require("dotenv").config();

const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')

// route imports
const products = require("../src/routes/productRoute")
const users = require("../src/routes/userRoute")
const order = require('../src/routes/orderRoute')
const contact = require('../src/routes/contactRoute')

const app = express();
const bodyparser = require('body-parser');

const allowedOrigins = [
  'http://localhost:5173',
  'https://axis-exports.vercel.app',
  'https://www.axisinternationalexports.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true
}));

// to access req.body
app.use(bodyparser.json()); 
app.use(express.json());
app.use(cookieParser());

//available routes
app.get('/',(req,res)=>{
  res.json({
    success:true,
    message:"Server Up and Running"
  })
})
app.use('/api/v1',products);
app.use('/api/v1',users);
app.use('/api/v1',order);
app.use('/api/v1',contact);

// middleware for errors
app.use(errorMiddleware)
module.exports = app