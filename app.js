const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'my-secret-key', resave: true, saveUninitialized: true }));

const usersDb = {};

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/registrar', (req, res) => {
  res.sendFile(path.join(__dirname, 'registrar.html'));
});

app.post('/registrar', async (req, res) => {
  const { username, password } = req.body;

  if (usersDb[username]) {
    res.status(400).json({ error: 'Usuário já existe. Escolha outro nome de usuário.' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    usersDb[username] = { password: hashedPassword };
    res.status(200).json({ message: `Usuário ${username} registrado com sucesso!` });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = usersDb[username];

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'usuario.html'));
  } else {
    res.redirect('/login');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
