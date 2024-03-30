const station = require('../models/stationsModel');

function extractStringWithinParentheses(str) {
  const match = str.match(/\((.*?)\)/);
  return match ? match[1] : null;
}

exports.getStations = async (req, res) => {

  const input1Value = req.query.arrival;
  const input2Value = req.query.departure;

  // Query the database for matching data based on input1 and input2
  station.search({ arrival: input1Value, departure : input2Value }, (err, data) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(data)
      res.status(200).json(data);
    }
  });

};


