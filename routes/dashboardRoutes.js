const express = require('express');
const router = express.Router();
const path = require('path');
const { checkAuth } = require('../utils/auth');
const fs = require('fs');


// Rota do dashboard, protegida por autenticação
router.get('/dashboard', checkAuth, (req, res) => {
    const filePath = path.join(__dirname, '../public/dashboard/dashboard.html');
    let html = fs.readFileSync(filePath, 'utf-8');
    
    const username = req.session.user;

    const navbar = `
    <div class="navbar">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Registrar</a></li>
            <li><a href="/account">Minha Conta</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>
    </div>
`;

    html = html.replace('{{navbar}}', navbar);
    res.send(html);

});

router.get('/account', checkAuth, (req, res) => {
    const filePath = path.join(__dirname, '../public/dashboard/account.html');
    let html = fs.readFileSync(filePath, 'utf-8');
    
    const username = req.session.user;

    const navbar = `
    <div class="navbar">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Registrar</a></li>
            <li><a href="/account">Minha Conta</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>
    </div>
`;

    html = html.replace('{{navbar}}', navbar);
    res.send(html); 
});

// Rota de logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;