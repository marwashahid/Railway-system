require('dotenv').config();
const axios = require('axios');
const express = require('express');
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
console.log(process.env.MONGO_URI);

// require("dotenv").config();
require("./config/database").connect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// Use userRoutes for handling user-related requests
app.use('/routes', stationRoutes);
app.use('/', userRoutes);
app.use('/SignIn',userRoutes);
app.use('/Check',userRoutes);
app.use('/forgetpassword',userRoutes);
app.use('/newpassword',userRoutes);
app.use('/otp-form',userRoutes);
app.use('/send-otp',userRoutes);
app.use('/verify-otp',userRoutes);




const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});