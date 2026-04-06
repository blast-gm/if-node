const { readJSON, writeJSON } = require('./jsonDB');

// Função de login
function login(req, res) {
    const { username, password } = req.body;

    const users = readJSON('users.json');

    const user = users.find(u => 
        u.username === username && u.password === password
    );

    if (user) {
        req.session.user = user.username; // Armazena o nome do usuário na sessão
        res.redirect('/dashboard');
    } else {
        res.send('Login inválido');
    }
}

// Registro de usuário
function register(req, res) {
    const { username, password, email } = req.body;

    const users = readJSON('users.json');

    const userExists = users.find(u => u.username === username);

    if (userExists) {
        res.send('Usuário já existe');
    }

    users.push({ username, password, email });
    writeJSON('users.json', users);
    res.send('Registro bem-sucedido');
}

// Middleware de autenticação
function checkAuth(req, res, next) {
    if (req.session.user) {
        next(); // Usuário autenticado, continua para a próxima função
    } else {
        res.redirect('/login'); // Redireciona para a página de login se não estiver autenticado
    }
}

module.exports = {
    login,
    register,
    checkAuth
};