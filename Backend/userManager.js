// Import database select function
const { select } = require("./database");

// Define userManager class
class userManager {
     // Method to fetch user information from the database
    async getUserInfo(){
        try {
            // SQL query to select user information
            const query = "SELECT person_id, person_name, person_surname FROM databaseGet";
            // Execute SQL query and await result
            const result = await select(query);

             // Check if result is empty or null
            if (!result || result.length === 0) {
                return { error: "No users found", statusCode: 404 }; // Return error response if no users found
            }

            return result; // Return user information
        } catch (error) {
            console.error("An error occurred while fetching users information:", error); // Log error if fetching user information fails
            return { error: "An error occurred while processing the request", statusCode: 500 }; // Return error response for internal server error
        }
    }
}

// Export userManager class
module.exports = userManager;
