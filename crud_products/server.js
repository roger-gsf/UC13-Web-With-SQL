// Importa o módulo 'express', que é um framework para criar servidores web em Node.js
const express = require('express');

// Importa o módulo 'mysql2', que permite conectar e executar comandos no banco de dados MySQL
const mysql = require('mysql2');

// Importa o módulo 'body-parser', que ajuda a interpretar o corpo de requisições HTTP, especialmente em JSON
const bodyParser = require('body-parser');

// Cria uma aplicação Express
const app = express();

// Configura o Express para usar o body-parser e permitir o processamento de requisições com JSON
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Define o host do banco de dados (neste caso, localmente)
    user: 'root', // Define o usuário do banco de dados (geralmente 'root' em servidores locais)
    password: '', // Define a product_price do banco de dados (vazia no XAMPP por padrão)
    database: 'crud_products' // Define o product_name do banco de dados que será utilizado
});

// Conecta ao banco de dados MySQL
connection.connect(error => {
    if (error) {
        // Exibe uma mensagem de erro caso a conexão falhe
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }
    // Exibe uma mensagem confirmando a conexão ao banco, mostrando o ID da conexão
    console.log('Connected to the database with the ID ' + connection.threadId);
});

// Define o endpoint para adicionar um novo usuário via requisição POST
app.post('/products', (req, res) => {
    // Extrai os dados de 'product_name', 'product_desc' e 'product_price' do corpo da requisição (req.body)
    const { product_name, product_desc, product_price } = req.body;
    // Define a consulta SQL para inserir um novo usuário na tabela 'products'
    const sql = 'INSERT INTO products (product_name, product_desc, product_price) VALUES (?, ?, ?)';
    // Executa a consulta SQL, utilizando os valores fornecidos
    connection.query(sql, [product_name, product_desc, product_price], (error, results) => {
        if (error) {
            // Caso ocorra um erro ao inserir, envia uma resposta de erro com status 500
            res.status(500).send('Error adding product.');
            return;
        }
        // Envia uma resposta de sucesso com status 201 indicando que o usuário foi adicionado
        res.status(201).send('Product added succesfully.');
    });
});

// Define o endpoint para obter todos os usuários via requisição GET
app.get('/products', (req, res) => {
    // Executa uma consulta SQL para selecionar todos os registros da tabela 'products'
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) {
            // Caso ocorra um erro ao obter os usuários, envia uma resposta de erro com status 500
            res.status(500).send('Error getting Products.');
            return;
        }
        // Envia a lista de usuários como uma resposta JSON
        res.json(results);
    });
});

// Define o endpoint para obter um usuário específico pelo seu ID via requisição GET
app.get('/products/:product_id', (req, res) => {
    // Extrai o ID do usuário dos parâmetros da URL
    const { product_id } = req.params;
    // Executa uma consulta SQL para selecionar o usuário com o ID fornecido
    connection.query('SELECT * FROM products WHERE product_id = ?', [product_id], (error, results) => {
        if (error) {
            // Caso ocorra um erro ao obter o usuário, envia uma resposta de erro com status 500
            res.status(500).send('Error getting product.');
            return;
        }
        // Envia os dados do usuário específico como uma resposta JSON (primeiro resultado)
        res.json(results[0]);
    });
});

// Define o endpoint para atualizar os dados de um usuário via requisição PUT
app.put('/products/:product_id', (req, res) => {
    // Extrai o ID do usuário dos parâmetros da URL
    const { id } = req.params;
    // Extrai os novos dados de 'product_name', 'product_desc' e 'product_price' do corpo da requisição (req.body)
    const { product_name, product_desc, product_price } = req.body;
    // Define a consulta SQL para atualizar o usuário com o ID fornecido
    const sql = 'UPDATE products SET product_name = ?, product_desc = ?, product_price = ? WHERE id = ?';
    // Executa a consulta SQL com os novos valores e o ID do usuário
    connection.query(sql, [product_name, product_desc, product_price, id], (error, results) => {
        if (error) {
            // Caso ocorra um erro ao atualizar, envia uma resposta de erro com status 500
            res.status(500).send('Error updating product.');
            return;
        }
        // Envia uma mensagem de sucesso indicando que o usuário foi atualizado
        res.send('Product updated successfully.');
    });
});

// Define o endpoint para deletar um usuário via requisição DELETE
app.delete('/products/:product_id', (req, res) => {
    // Extrai o ID do usuário dos parâmetros da URL
    const { product_id } = req.params;
    // Executa uma consulta SQL para deletar o usuário com o ID fornecido
    connection.query('DELETE FROM products WHERE product_id = ?', [product_id], (error, results) => {
        if (error) {
            // Caso ocorra um erro ao deletar, envia uma resposta de erro com status 500
            res.status(500).send('Error deleting product.');
            return;
        }
        // Envia uma mensagem de sucesso indicando que o usuário foi deletado
        res.send('Product deleted successfully.');
    });
});

// Define a porta onde o servidor irá rodar
const PORT = 3000;

// Inicia o servidor e exibe uma mensagem no console com a porta em que o servidor está rodando
app.listen(PORT, () => {
    console.log(`Server running in the port ${PORT}`);
});