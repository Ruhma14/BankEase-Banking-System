const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const accountRoutes = require("./routes/accountRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/account", accountRoutes);


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "BankEase Backend is running!"
    });

});


// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT, () => {

            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            );

        });

    })
    .catch((error) => {

        console.log("MongoDB connection failed:");
        console.log(error.message);

    });