const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3001;

// Configurar CORS (ajuste o origin para seu front-end)
app.use(cors({ origin: "http://localhost:5173" }));

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

// Rota POST para cadastro com checagem de duplicidade
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, idade, dataNascimento, email, usuario, senha } = req.body;

    // Validação básica dos campos
    if (!nome || !idade || !dataNascimento || !email || !usuario || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Verificar se já existe usuário com mesmo email ou usuário
    const queryCheck = `SELECT email, usuario FROM usuarios WHERE email = ? OR usuario = ?`;

    db.get(queryCheck, [email, usuario], async (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Erro ao consultar usuários" });
      }

      if (row) {
        if (row.email === email && row.usuario === usuario) {
          return res
            .status(409)
            .json({ error: "E-mail e usuário já cadastrados" });
        } else if (row.email === email) {
          return res.status(409).json({ error: "E-mail já cadastrado" });
        } else if (row.usuario === usuario) {
          return res.status(409).json({ error: "Usuário já cadastrado" });
        }
      }

      // Se não houver conflitos, prossegue com o cadastro
      const saltRounds = 10;
      const hashedSenha = await bcrypt.hash(senha, saltRounds);

      const queryInsert = `
        INSERT INTO usuarios (nome, idade, dataNascimento, email, usuario, senha)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.run(
        queryInsert,
        [nome, idade, dataNascimento, email, usuario, hashedSenha],
        function (err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Erro ao cadastrar usuário" });
          }

          res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            id: this.lastID,
          });
        }
      );
    });
  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/login", async (req, res) => {
  const { loginInput, senhaInput } = req.body;

  const query = `SELECT * FROM usuarios WHERE usuario = ?`;

  db.get(query, [loginInput], async (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }

    if (!row) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senhaInput, row.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }
    res.json({ message: "Login realizado com sucesso", type: true });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
