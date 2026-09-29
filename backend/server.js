const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// POST API
app.post("/api/books", async (req, res) => {

    try {

        const {
            title,
            author,
            isbn,
            category,
            publicationYear
        } = req.body;


        // Validate fields
        if (!title || !author || !isbn || !category || !publicationYear) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        // Create book
        const book = new Book({
            title,
            author,
            isbn,
            category,
            publicationYear
        });


        // Save book to MongoDB
        const savedBook = await book.save();


        // Send response
        res.status(201).json({
            message: "Book added successfully",
            book: savedBook
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});