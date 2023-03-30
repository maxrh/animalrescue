require('dotenv').config();
const express = require('express'); // <-- common js import
// import express from 'express'; <-- es 6 import

const cors = require('cors');
const animals = require('./routes/animals.routes');

const app = express();

// import db-connection
require("./db");

// accept request from any origin
app.use(cors());

// expect json data
app.use(express.json())

// routes
app.use('/api/v1', animals);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
