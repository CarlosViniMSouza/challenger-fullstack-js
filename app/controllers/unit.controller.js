const db = require("../models");
const Unit = db.units;

// Crie e Salve uma nova unidade
exports.create = (req, res) => {

  if (!req.body.unit_lot) {
    res.status(400).send({ message: "Conteúdo não pode estar vazio!" });
    return;
  }

  const unit = new Unit({
    assets: req.body.asset.assets,
    published: req.body.published ? req.body.published : false
  });

  unit
    .save(unit)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar a unidade."
      });
    });
};

// Recupere todas as unidades do DB
exports.findAll = (req, res) => {
  const unit_lot = req.query.unit_lot;
  var condition = unit_lot ? { unit_lot: { $regex: new RegExp(unit_lot), $options: "i" } } : {};

  Unit.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu na recuperação das unidades."
      });
    });
};

// Encontre uma unidade com o id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Unit.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado a unidade de id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erro ao recuperar unidade de id: " + id });
    });
};

// Atualize uma unidade por meio do id
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
          message: `Não foi possivel atualizar unidade de id: ${id}. Talvez a unidade não foi encontrada!`
        });
      } else res.send({ message: "Unidade foi atualizada com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar unidade de id: " + id
      });
    });
};

// Delete uma unidade com o id
exports.delete = (req, res) => {
  const id = req.params.id;

  Unit.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel deletar unidade de id: ${id}. Talvez a unidade não foi encontrada!`
        });
      } else {
        res.send({
          message: "Unidade foi deletada com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel excluir a unidade de id: " + id
      });
    });
};

// Delete todas as unidades no DB
exports.deleteAll = (req, res) => {
  Unit.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} unidades foram deletadas com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro correu enquanto as unidades eram deletadas."
      });
    });
};

// Veja todas as unidades publicados
exports.findAllPublished = (req, res) => {
  Unit.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto recuperava as unidades."
      });
    });
};
