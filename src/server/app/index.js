const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(bodyParser.json());;
app.use(cors())
app.use(require('./routes/api'))
app.use(require('./routes/views'))

module.exports = app;