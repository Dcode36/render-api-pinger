const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 6000;

// API route for testing
app.get("/", (req, res) => {
  res.send("Server is active and running, and pinging APIs individually!");
});

// URLs to keep alive
const urlsToPing = [
  "https://style-craft-server.onrender.com/",
  "https://taks-management-apis.onrender.com/",
  "https://zomato-clone-06.onrender.com/api",
  "https://render-api-pinger.onrender.com/", // Replace with your Render URL after deployment
];

// Function to ping a specific API
const pingApi = (url, interval) => {
  setInterval(async () => {
    try {
      const response = await axios.get(url);
      console.log(`Pinged ${url} successfully:`, response.status);
    } catch (error) {
      console.error(`Error pinging ${url}:`, error.response?.status || error.message);
    }
  }, interval);
};

// Set up individual pings with different intervals
const setupPingIntervals = () => {
  // Assign different intervals (in milliseconds) for each API
  const intervals = [15000, 20000, 25000, 30000]; // Convert minutes to milliseconds

  urlsToPing.forEach((url, index) => {
    const interval = intervals[index] || 30000; // Default to 30s if intervals array is shorter
    console.log(`Setting up ping for ${url} every ${interval / 1000} seconds`);
    pingApi(url, interval);
  });
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  setupPingIntervals(); // Start pinging APIs individually
});
