const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require('cors')
const app = express();
app.use(bodyParser.json());


app.use(cors(/*{
  origin: 'http//localhost'
}*/));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_system",
});

app.post("/index", (req, res) => {
  const { user_email, user_password } = req.body;
  db.query(
    "SELECT * FROM users WHERE user_email = ? AND user_password = ?",
    [user_email, user_password],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.sendStatus(200); // Successful login
      } else {
        res.status(401).send("Invalid credencials");
      }
    }
  );
});

app.post("/register", (req, res) => {
  const { user_email, user_password } = req.body;
  db.query(
    "INSERT INTO users (user_email, user_password) VALUES (?, ?)",
    [user_email, user_password],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(201); // User registered successfully
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
