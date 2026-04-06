const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');  
const path = require('path');

const loadRoutes = require('./utils/loadRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Sessão para armazenar o nome do usuário
app.use(session({
    secret: 'Tm0sjH7873GkPH4PqVWDTI5f',
    resave: false,
    saveUninitialized: false
}));
// Fim da Sessão

app.use(express.static(path.join(__dirname, 'public')));

// Carregar automaticamente as rotas
loadRoutes(app);

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000');
});