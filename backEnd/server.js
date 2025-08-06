const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3001;

// Middleware para interpretar JSON
app.use(express.json());

// Conexão com o banco SQLite
const dbPath = path.resolve(__dirname, "banco.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("Conectado ao banco SQLite.");
  }
});

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    dataNascimento TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    usuario TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`);

// Rota POST para cadastro
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, idade, dataNascimento, email, usuario, senha } = req.body;

    if (!nome || !idade || !dataNascimento || !email || !usuario || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Criptografar senha
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);

    const query = `
      INSERT INTO usuarios (nome, idade, dataNascimento, email, usuario, senha)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [nome, idade, dataNascimento, email, usuario, hashedSenha],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: "Erro ao cadastrar usuário" });
        }

        res
          .status(201)
          .json({ message: "Usuário cadastrado com sucesso", id: this.lastID });
      }
    );
  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
