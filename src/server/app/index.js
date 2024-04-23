const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());;

app.get("/*", (req, res) => {
  // if (dotenv.NODE_ENV == "development")
  //   res.sendFile(path.join(__dirname, "../../frontend/index.html"));
  // else
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
    
});

module.exports = app;