const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use( cors() );
app.use( express.static('public') );
app.use( express.json() );

module.exports = app;
