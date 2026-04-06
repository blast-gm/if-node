const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { checkAuth } = require('../utils/auth');

const memberData = require('../utils/memberData');

// Rota do dashboard, protegida por autenticação    

router.get('/account', checkAuth, (req, res) => {

    const username = req.session.user;

    const realname = memberData.get(username, "realname");
    const address = memberData.get(username, "address");
    const phone = memberData.get(username, "phone");
    const birthdate = memberData.get(username, "birthdate");
    
    const filePath = path.join(__dirname, '../public/dashboard/account.html');
    let html = fs.readFileSync(filePath, 'utf-8');

    html = html.replace('{{realname}}', realname || '');
    html = html.replace('{{address}}', address || '');
    html = html.replace('{{phone}}', phone || '');
    html = html.replace('{{birthdate}}', birthdate || '');

    res.send(html);
});

router.post('/account', checkAuth, (req, res) => {

    const { realname, address, phone, birthdate } = req.body;
    
    const username = req.session.user;

    memberData.set(username, "realname", realname);
    memberData.set(username, "address", address);
    memberData.set(username, "phone", phone);
    memberData.set(username, "birthdate", birthdate);

    res.send("Perfil atualizado com sucesso!");

});

module.exports = router;