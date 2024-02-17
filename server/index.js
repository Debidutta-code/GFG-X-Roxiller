const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/dashboard', async (req, res) => {
  try {
    const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json'); // Use 'fetch' to make HTTP request
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to calculate statistics
app.get('/statistics/:month', async (req, res) => {
  const { month } = req.params;
  const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
  const data = await response.json();

  // Assuming each month has 5 elements in the array of objects
  // Calculate the index range based on the selected month
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = months.indexOf(month);
  const startIndex = monthIndex * 5;
  const endIndex = startIndex + 5;

  const selectedMonthData = data.slice(startIndex, endIndex);

  res.json(selectedMonthData);
});
app.get('/bar-chart/:month', async (req, res) => {
  try {
    const { month } = req.params;

    // Fetch data from external API
    const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const jsonData = await response.json();
    
    // Filter items based on the selected month
    const selectedMonthData = jsonData.filter(item => {
      const itemMonth = new Date(item.dateOfSale).toLocaleString('en-US', { month: 'long' }); // Get month name
      return itemMonth.toLowerCase() === month.toLowerCase();
    });

    // Define price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: "above", max: "900" } // For prices above 900
    ];

    // Initialize counts for each price range
    const counts = priceRanges.map(range => ({
      range: `${range.min}-${range.max}`,
      count: 0
    }));

    // Count items in each price range
    console.log(selectedMonthData);
    selectedMonthData.forEach(item => {
      const { price } = item;
      for (const range of priceRanges) {
        if (price >= range.min && price <= range.max) {
          const index = priceRanges.indexOf(range);
          counts[index].count++;
          break;
        }
      }
    });

    res.json(counts);
  } catch (error) {
    console.error('Error generating bar chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(8080, () => {
  console.log('Server started on port 8080');
});
