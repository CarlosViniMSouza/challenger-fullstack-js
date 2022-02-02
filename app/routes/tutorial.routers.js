module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller");
  var router = require("express").Router();

  // Aqui, cada linha sera a rota para cada uma das funcoes que criamos em tutorial.controller.js

  router.get("/", tutorials.findAll);

  router.get("/published", tutorials.findAllPublished);

  router.get("/:id", tutorials.findOne);

  router.post("/", tutorials.create);

  router.put("/:id", tutorials.update);

  router.delete("/:id", tutorials.delete);

  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);
};