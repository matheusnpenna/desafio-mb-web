module.exports = (function () {
  const express = require('express');
  const CompanyService = require("../services/CompanyService");

  const router = express.Router();

  router.post("/api/register", async (req, res) => {
    const data = req.body;
    const service = new CompanyService(data);

    const errors = service.validateCompanyData();
    
    if (Object.keys(errors).length) {
      res.status(400).send(errors);
    } else {
      res.status(200).send({
        message: "Registro criado com sucesso!"
      })
    }
  });

  return router;
})();