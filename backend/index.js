const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");
const app = express();
const User = require("./model/userModel");
const Admin=require("./model/adminModel");
const Review = require("./model/reviewModel");
const News = require("./model/newsModel");
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api", (req, res) => {
  res.send("Hello API");
});

// GET endpoint to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send the list of users as the response
    res.json(users);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint for creating users
app.post("/api/users", async (req, res) => {
  try {
    // Extract user data from the request body
    const { first_name, last_name, email, password, gender, dob } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user using the User model
    const newUser = new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      gender: gender,
      dob: dob,
    });

    // Save the new user to the database
    await newUser.save();

    // Send the saved user object as the response
    res.status(201).json(newUser);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// POST endpoint for user login
app.post("/api/login", async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await User.findOne({ email: email });

    // If user is not found, send a response indicating authentication failed
    if (!user) {
      return res.status(401).json({ error: "Authentication failed. User not found." });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, send a response indicating authentication failed
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed. Incorrect password." });
    }

    // If authentication succeeds, send a success response
    res.status(200).json({ message: "Authentication successful", user: user });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// POST endpoint to submit a review
app.post("/api/reviews", async (req, res) => {
  try {
    // Extract review data from the request body
    const { email, date, comment } = req.body;

    // Create a new review using the Review model
    const newReview = new Review({
      email: email,
      date: date,
      comment: comment,
    });

    // Save the new review to the database
    await newReview.save();

    // Send the saved review object as the response
    res.status(201).json(newReview);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// GET endpoint to fetch reviews by email, sorted by date
app.get("/api/reviews/:email", async (req, res) => {
  try {
    // Extract email from the request parameters
    const { email } = req.params;

    // Find and sort reviews by date in descending order ('-date')
    const reviews = await Review.find({ email: email }).sort('-date');

    // Send the fetched reviews as the response
    res.status(200).json(reviews);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


