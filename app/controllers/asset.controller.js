const db = require("../models");
const Asset = db.assets;

// Crie e Salve uma nova peca
exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Conteúdo não pode estar vazio!" });
    return;
  }

  const asset = new Asset({
    image: req.body.image,
    name: req.body.name,
    description: req.body.description,
    model: req.body.model,
    owner: req.body.owner,
    status: req.body.status ? req.body.status : false,
    heath_level: req.body.heath_level
  });

  asset
    .save(asset)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar a peça."
      });
    });
};

// Recupere todas as pecas do DB
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Asset.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu na recuperação das peças."
      });
    });
};

// Encontre uma peca com o id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Asset.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado a peça de id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erro ao recuperar peça de id: " + id });
    });
};

// Atualize uma peca por meio do id
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({
      message: "Dados da atualização não podem estar vazios!"
    });
  }

  Asset.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel atualizar peça de id: ${id}. Talvez a peça não foi encontrada!`
        });
      } else res.send({ message: "Peça foi atualizada com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar peça de id: " + id
      });
    });
};

// Delete uma peca com o id
exports.delete = (req, res) => {
  const id = req.params.id;

  Asset.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel deletar peça de id: ${id}. Talvez a peça não foi encontrada!`
        });
      } else {
        res.send({
          message: "Peça foi deletada com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel excluir a peça de id: " + id
      });
    });
};

// Delete todas as pecas no DB
exports.deleteAll = (req, res) => {
  Asset.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} peças foram deletadas com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro correu enquanto as peças eram deletadas."
      });
    });
};

// Veja todas as pecas publicados
exports.findAllPublished = (req, res) => {
  Asset.find({ status: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto recuperava as peças."
      });
    });
};
