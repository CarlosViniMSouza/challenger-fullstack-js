const express = require("express");
const db = require("./app/models");
const cors = require("cors");
const app = express();

var pgLocal = {
  origin: "http://localhost:8787"
};

app.use(cors(pgLocal));

// Analisa as requisicoes do tipo de conteudo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


// Rota simples:
app.get("/", (req, res) => {
  res.json({ mes: "Bem-Vindo a minha REST API" })
});

require("./app/routes/tutorial.routers")(app);
require("./app/routes/asset.routers")(app);
require("./app/routes/user.routers")(app);

// Configurando porta para escutar requisicoes:
const PORT = process.env.PORT || 8786;

app.listen(PORT, () => { console.log(`Servidor rodando na porta ${PORT}`) });
