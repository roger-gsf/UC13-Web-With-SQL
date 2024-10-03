const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
// Usamos o CORS para permitir que o frontend possa se conectar com o backend.
// Define quais páginas da web podem ter acesso.
app.use(cors({
  // origin: 'http://localhost'
}));

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_system",
});

app.post("/register", (req, res) => {
  const { user_email, user_password } = req.body;
  db.query(
    "INSERT INTO users (user_email, user_password) VALUES (?, ?)",
    [user_email, user_password],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(201); // Usuário registrado com sucesso
    }
  );
});

app.post("/login", (req, res) => {
  const { user_email, user_password } = req.body;
  db.query(
    "SELECT * FROM users WHERE user_email = ? AND user_password = ?",
    [user_email, user_password],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.sendStatus(200); // Login bem-sucedido
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
