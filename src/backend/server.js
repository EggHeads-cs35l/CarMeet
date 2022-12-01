const express = require('express');
const app = express();
const server = require("http").createServer(app);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./router/router');
const io = require("socket.io")(server);
const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS).then(()=>{console.log("connected")});
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/app', routeUrls);
server.listen(4000, () =>{console.log("Running")});

io.on("connection", (socket) => {
    socket.on("join", async (gameId) => {});
    socket.on("message", (message) => {});
});
