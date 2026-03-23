const express = require('express');   //import express(it is a framework of node js to create server )
const mongoose = require('mongoose');   //import mongoose(it is a library to connect node js with mongodb)
const cors = require('cors');   //import cors(it allows frontend and backend to communicate with each other)
const app = express();   //create an instance of express
app.use(cors()); //Allows cross-origin requests (frontend → backend)
app.use(express.json()); //Allows parsing of JSON request bodies
app.use('/api/auth', require('./routes/auth')); //Routes for authentication (register, login)
app.use("/api/todos", require("./routes/todo")); //Routes for todo items
mongoose.connect("mongodb://127.0.0.1:27017/todoApp").then(()=>
    console.log("Connected to MongoDB")).catch(err=>
    console.error("Error connecting to MongoDB:", err)
);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});