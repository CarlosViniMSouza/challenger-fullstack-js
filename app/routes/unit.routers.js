module.exports = app => {
  const units = require("../controllers/unit.controller");
  var router = require("express").Router();

  // Aqui, cada linha sera a rota para cada uma das funcoes que criamos em unit.controller.js

  router.get("/", units.findAll);

  router.get("/published", units.findAllPublished);

  router.get("/:id", units.findOne);

  router.post("/", units.create);

  router.put("/:id", units.update);

  router.delete("/:id", units.delete);

  router.delete("/", units.deleteAll);

  app.use('/api/units', router);
}