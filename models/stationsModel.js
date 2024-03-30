const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    train_name: {
        type: String}
    ,
    departure: {
        type: String,

    },
    arrival : {
        type: String
    },
    date :
    {
        type : Date
    }
    // Add more fields as needed
});

const station = mongoose.model('Station', stationSchema);

module.exports = station;
