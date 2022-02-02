const express = require("express");
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
app.get("/", (req, res) => { res.json({ mes: "Bem-Vindo a minha REST API" }) });

//configurando porta para escutar requisicoes:
const PORT = process.env.PORT || 8786;

app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}`) });
