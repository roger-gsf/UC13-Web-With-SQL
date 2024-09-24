const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // user_password padrão do XAMPP é vazia
  database: "my_db",
});

// Conectar ao banco de dados
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: " + error.stack);
    return;
  }
  console.log("Connected to the database with ID " + connection.threadId);
});

// Endpoint para adicionar um usuário (POST)
app.post("/users", (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  const sql =
    "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)";
  connection.query(
    sql,
    [user_name, user_email, user_password],
    (error, results) => {
      if (error) {
        res.status(500).send("Error adding user.");
        return;
      }
      res.status(201).send("User added succesfully.");
    }
  );
});

// Endpoint para obter todos os usuários (GET)
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).send("Error getting users.");
      return;
    }
    res.json(results);
  });
});

// Endpoint para obter um usuário por ID (GET)
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error getting user.");
        return;
      }
      res.json(results[0]);
    }
  );
});

// Endpoint para atualizar um usuário (PUT)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { user_name, user_email, user_password } = req.body;
  const sql =
    "UPDATE users SET user_name = ?, user_email = ?, user_password = ? WHERE id = ?";
  connection.query(
    sql,
    [user_name, user_email, user_password, id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error updating user.");
        return;
      }
      res.send("Usuário atualizado com sucesso.");
    }
  );
});

// Endpoint para deletar um usuário (DELETE)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      res.status(500).send("Erro ao deletar usuário.");
      return;
    }
    res.send("Usuário deletado com sucesso.");
  });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
