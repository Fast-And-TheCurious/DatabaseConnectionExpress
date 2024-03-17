// This is the client-side JavaScript
// Event listener to execute code when DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/userInfo'); // Fetch user information from server
        const data = await response.json(); // Extract JSON data from response
        console.log(data); // Log the fetched data to the console (nice to verify your code is doing what you intend it to)

        // Assuming only one record is returned (there is only 1 in the table, you can make it respond dynamically but for this example it isn't)
        const user = data[0];

         // Update HTML elements with user data
         document.getElementById("ID+Name+Surname").textContent = `${user.person_id}: ${user.person_name} ${user.person_surname}`;
         document.getElementById("userId").textContent = `User ID: ${user.person_id}`;
         document.getElementById("name").textContent = `Name: ${user.person_name}`;
         document.getElementById("surname").textContent = `Surname: ${user.person_surname}`;

    } catch (error) {
        console.error("Error fetching user information:", error); // Log error if fetching user information fails
        const DBText = document.getElementById("DBText");  // Get reference to HTML element
        DBText.textContent = "An error occurred while fetching data.";  // Update HTML element with error message
    }
});
