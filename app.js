// Basic
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

// Security middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// database
const mongoose = require("mongoose");


// Security middleware implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())


// body parser implement
app.use(bodyParser.json())

// request rate limit
const limiter = rateLimit({windowMs: 15*60*1000, max:3000})
app.use(limiter)


const URI = "mongodb+srv://ToDo:WZ8duZ1AckA6hTTa@cluster0.ca9qvzi.mongodb.net/ToDo"
mongoose.connect(URI).then(()=>{
    console.log("connection successful")
}).catch(error=>{
    console.log(error)
})

// route implement
app.use("/api/v1", router)

// undefined route
app.use("*", (req,res)=>{
    res.status(404).json({status: "fail", data: "Not Found"})
})


module.exports = app;