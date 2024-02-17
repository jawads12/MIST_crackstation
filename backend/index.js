const express = require("express");
const db = require("./db");
const app = express();
const Book = require("./model/bookModel");
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api", (req, res) => {
  res.send("Hello API");
});

