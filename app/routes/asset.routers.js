module.exports = app => {
  const assets = require("../controllers/asset.controller");
  var router = require("express").Router();

  // Aqui, cada linha sera a rota para cada uma das funcoes que criamos em asset.controller.js

  router.get("/", assets.findAll);

  router.get("/status", assets.findAllPublished);

  router.get("/:id", assets.findOne);

  router.post("/", assets.create);

  router.put("/:id", assets.update);

  router.delete("/:id", assets.delete);

  router.delete("/", assets.deleteAll);

  app.use('/api/assets', router);
}