const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota GET para exibir o formulário
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});

// Rota POST para receber e salvar os dados
app.post('/register', (req, res) => {
  const { nome, email, senha, idade, cidade } = req.body;

  const userData = { nome, email, senha, idade, cidade };

  // Sanitiza o nome do arquivo (remove caracteres inválidos)
  const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = path.join(__dirname, 'users', `${safeEmail}.json`);

  // Cria o arquivo JSON com os dados
  fs.writeFile(fileName, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error('Erro ao salvar arquivo:', err);
      return res.status(500).send('Erro ao salvar os dados do usuário.');
    }

    // Exibe página de sucesso
    res.send(`
      <h1>Usuário cadastrado com sucesso!</h1>
      <p>Os dados de ${nome} foram salvos corretamente.</p>
      <a href="/">Cadastrar outro usuário</a>
    `);
  });
});

// Garante que a pasta 'users' existe
if (!fs.existsSync('./users')) {
  fs.mkdirSync('./users');
}


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${3000}`);
});
