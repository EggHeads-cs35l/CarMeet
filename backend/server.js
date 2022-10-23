const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./router/router');
const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, ()=>{console.log("connected")});

app.use(express.json());
app.use(cors());
app.use('/app', routeUrls);
app.listen(4000, () =>{console.log("Running")});