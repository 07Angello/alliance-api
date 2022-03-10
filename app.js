const express = require('express');
const { dbConnection } = require('./config/database');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./source/routes/routes');

dbConnection();

app.use( cors() );
app.use( express.static('public') );
app.use( express.json() );

app.use( routes );

module.exports = app;
