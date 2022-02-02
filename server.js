const express = require("express");
const db = require("./app/models");
const cors = require("cors");
const app = express();

var pgLocal = {
  origin: "http://localhost:8787"
};

app.use(cors(pgLocal));

//analisa as requisicoes do tipo de conteudo
app.use(express.json());

//analisa as requisicoes do tipo de conteudo
app.use(express.urlencoded({ extended: true }));

//rota simples:
app.get("/", (req, res) => {
  res.json({ mes: "Bem-Vindo a minha REST API" })
});

db.mongo
  .connect(db.url, {
    useNewURLParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Banco de Dados: Conectado");
  })
  .catch(err => {
    console.log("Banco de Dados: Nao conectado", err);
    process.exit();
  });

//configurando porta para escutar requisicoes:
const PORT = process.env.PORT || 8786;

app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}`) });
