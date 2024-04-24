
module.exports = (function () {
  const express = require('express');
  const path = require('path');
  
  const router = express.Router();
  
  router.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/dist/index.html"));
  });

  return router;
})();