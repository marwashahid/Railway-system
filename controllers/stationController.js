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

      const stations = data;

      // Build the HTML table
      let tableHtml = '<table border="1"><tr><th>Arrival</th><th>Departure</th></tr>';
      stations.forEach(station => {
        tableHtml += `<tr><td>${station.arrival}</td><td>${station.departure}</td></tr>`;
      });
      tableHtml += '</table>';

      // Send the HTML response
      res.status(200).send(tableHtml);

     // res.status(200).json(data);
    }
  });
};


