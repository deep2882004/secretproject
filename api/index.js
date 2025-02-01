import express from "express";
import axios from "axios";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

// Set EJS as the view engine
app.set("views", "views"); 
app.set("view engine", "ejs");

app.use(express.static("public"));

// Home Route
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", {
      secret: response.data.secret,
      user: response.data.username,
      id: response.data.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Refresh Route
app.get("/refresh", (req, res) => {
  res.redirect("/");
});

// Export as a serverless function
export default function handler(req, res) {
  return app(req, res);
}
