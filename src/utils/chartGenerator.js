// src/utils/chartGenerator.js
const axios = require('axios');

async function generateChart(data) {
  const chartConfig = {
    type: 'line',
    data: {
      labels: data.labels, // e.g., ['Jan', 'Feb', 'Mar']
      datasets: [{
        label: 'Price History',
        data: data.prices, // e.g., [100, 90, 85]
        fill: false,
        borderColor: 'blue'
      }]
    }
  };

  const response = await axios.get('https://quickchart.io/chart', {
    params: {
      c: JSON.stringify(chartConfig),
      width: 500,
      height: 300,
    }
  });

  return response.data.url; // Returns URL to the generated chart image
}

module.exports = { generateChart };
