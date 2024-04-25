
module.exports = (function () {
  const express = require('express');
  const path = require('path');
  
  const router = express.Router();
  
  router.get("/registration", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  router.get("/", (req, res) => {
    res.redirect("/registration");
  });
  return router;
})();