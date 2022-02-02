module.exports = app => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();

  // Aqui, cada linha sera a rota para cada uma das funcoes que criamos em tutorial.controller.js

  router.get("/", users.findAll);

  router.get("/active", users.findAllPublished);

  router.get("/:id", users.findOne);

  router.post("/", users.create);

  router.put("/:id", users.update);

  router.delete("/:id", users.delete);

  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};