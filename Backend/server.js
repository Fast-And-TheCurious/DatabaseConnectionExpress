// Importing required modules
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require('dotenv').config();

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Parse JSON requests

// Import database functions and user manager module
const { createConnection } = require("./database");
const userManager = require("./userManager");

// Function to connect to the database
async function connectToDatabase() {
    try {
        await createConnection(); // Connect to MySQL database
        console.log("Connection established");  // Log successful connection
    } catch (error) {
        console.error("Error connecting to the database:", error); // Log error if connection fails
    }
}
  
connectToDatabase(); // Invoke function to connect to the database

// API endpoint to fetch user information
app.get('/api/userInfo', async (req, res) => {
    try {
        const userInfo = await new userManager().getUserInfo(); // Fetch user information from database
        res.json(userInfo); // Send JSON response with user information 
    } catch (error) {
        console.error("Error retrieving userInfo:", error); // Log error if fetching user information fails
        res.status(500).send("Internal Server Error"); // Send 500 status code for internal server error
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start server and listen on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log server start message with port number
});
