// Import MySQL module
const mysql = require("mysql2");

// Database connection configuration
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // Host address from MySQL Workbench for your database
  user: process.env.DB_USER,  // Username from MySQL Workbench
  password: process.env.DB_PASSWORD, // Password to your database
  database: process.env.DB_DATABASE,  // The name of the schema/Database name all your tables are in
  
  });
  
  // Export database connection
  module.exports = connection;

  // Function to establish database connection
function createConnection() {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error("Error connecting to MySQL server:", err);
          reject(err); // Reject promise with error
        } else {
          console.log("Connected to MySQL server!"); // Log successful connection
          resolve(); // Resolve promise
        }
      });
    });
  }
  // Function to execute SQL update queries
  function update(query, values) {
    return new Promise((resolve, reject) => {
      console.log('Executing query:', query, 'with values:', values);
      
      connection.query(query, values, function (err, results) {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
        } else {
          console.log('Query executed successfully.');
          resolve(results);
        }
      });
    });
  }
  
// Function to execute SQL select queries
  function select(query, values) {
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          console.error("Error with receiving data:", err);
          reject(err);
        } else {
          console.log("Received the data!");
          resolve(result);
        }
      });
    });
  }

  // Function to close database connection
  function endConnection() {
    connection.end((err) => {
      if (err) throw err;
      console.log("Disconnected from MySQL database!");
    });
  }
  
  
// Export database functions
  module.exports = { createConnection, update, select, endConnection };