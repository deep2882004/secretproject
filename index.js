// HINTS:
// 1. Import express and axios 
import express from "express";
import axios from "axios" ;
const app = express();
const port = process.env.PORT || 3000;
 
app.set("view engine", "ejs");
app.use(express.static("public"));




app.get("/", async (req, res) => {
    try {
        const linkForApi = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs", {
            secret: linkForApi.data.secret,
            user: linkForApi.data.username,
            id: linkForApi.data.id,
            
        });
    } catch (error) {
        console.error("Error fetching API data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/refresh", (req,res) =>{
  res.redirect("/")
});



app.listen(port , () => {
    console.log(`listining to port ${port}`)
});



// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
