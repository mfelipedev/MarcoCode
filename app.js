const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'my-secret-key', resave: true, saveUninitialized: true }));

// Simulação de banco de dados (objeto para armazenar usuários com senhas criptografadas)
const usersDb = {};

// Configurar o servidor para servir arquivos estáticos do diretório atual
app.use(express.static(__dirname));

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota de registro
app.get('/registrar', (req, res) => {
  res.sendFile(path.join(__dirname, 'registrar.html'));
});

// Rota de registro (POST)
app.post('/registrar', async (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já existe
  if (usersDb[username]) {
    res.status(400).json({ error: 'Usuário já existe. Escolha outro nome de usuário.' });
  } else {
    // Hash da senha antes de armazenar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Adicionar o novo usuário à lista
    usersDb[username] = { password: hashedPassword };
    res.status(200).json({ message: `Usuário ${username} registrado com sucesso!` });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Lógica de login aqui
  const user = usersDb[username];

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// Rota de dashboard (área protegida)
app.get('/dashboard', (req, res) => {
  // Verificar se o usuário está autenticado
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'usuario.html'));
  } else {
    res.redirect('/login'); // Redirecionar para o login se não estiver autenticado
  }
});

// Adicionando mensagem de log
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
