const db = require("../models");
const User = db.users;

// Crie e Salve um novo usuário
exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Conteúdo não pode estar vazio!" });
    return;
  }

  const user = new User({
    name: req.body.name,
    active: req.body.active
  });

  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar o usuário."
      });
    });
};

// Recupere todos os usuários do DB
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu na recuperação dos usuários."
      });
    });
};

// Encontre um usuário com o id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado o usuário de id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erro ao recuperar usuário de id: " + id });
    });
};

// Atualize um usuário por meio do id
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({
      message: "Dados da atualização não podem estar vazios!"
    });
  }

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel atualizar o usuário de id: ${id}. Talvez o usuário não foi encontrado!`
        });
      } else res.send({ message: "usuário foi atualizado com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar usuário de id: " + id
      });
    });
};

// Delete um usuário com o id
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel deletar usuário de id: ${id}. Talvez o usuário não foi encontrado!`
        });
      } else {
        res.send({
          message: "usuário foi deletado com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel excluir o usuário de id: " + id
      });
    });
};

// Delete todos os usuários no DB
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} usuários foram deletados com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto os usuários eram deletados."
      });
    });
};

// Veja todos os usuários ativos
exports.findAllPublished = (req, res) => {
  User.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto recuperava os usuários."
      });
    });
};
