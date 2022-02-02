const db = require("../models");
const Tutorial = db.tutorials;

// Crie e Salve um novo tutorial
exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({ message: "Conteúdo não pode estar vazio!" });
    return;
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar o tutorial."
      });
    });
};

// Recupere todos os tutoriais do DB
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu na recuperação dos tutoriais."
      });
    });
};

// Encontre um tutorial com o id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado o tutorial de id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erro ao recuperar tutorial de id: " + id });
    });
};

// Atualize um tutorial por meio do id
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({
      message: "Dados da atualização não podem estar vazios!"
    });
  }

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel atualizar o tutorial de id: ${id}. Talvez o tutorial não foi encontrado!`
        });
      } else res.send({ message: "Tutorial foi atualizado com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar tutorial de id: " + id
      });
    });
};

// Delete um tutorial com o id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Nãoo foi possivel deletar tutorial de id: ${id}. Talvez o tutorial não foi encontrado!`
        });
      } else {
        res.send({
          message: "Tutorial foi deletado com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel excluir o tutorial de id: " + id
      });
    });
};

// Delete todos os tutorials no DB
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} tutoriais foram deletados com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto os tutoriais eram deletados."
      });
    });
};

// Veja todos os tutoriais publicados
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu enquanto recuperava os tutoriais."
      });
    });
};
