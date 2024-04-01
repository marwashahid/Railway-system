const express = require('express');
const mongoose = require('mongoose');
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Set views directory and template engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


// app.use(express.static(path.join(__dirname, 'public')));

// // Route for serving the index.html file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,  'public', 'index.html'));
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('index');
//   });
  

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/railway')
.then(()=> console.log('mongodb connected'))
.catch((err) => console.log("Mongo Error",err));

// Use userRoutes for handling user-related requests
app.use('/routes', stationRoutes);
app.use('/', userRoutes);
app.use('/SignIn',userRoutes);
app.use('/Check',userRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
