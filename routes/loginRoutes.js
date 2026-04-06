const express = require('express');
const router = express.Router();
const path = require('path');
const { login, register } = require('../utils/auth');

// Mostrar pagina de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Rota de registro
router.post('/register', register);

// Rota de login
router.post('/login', login);   

module.exports = router;