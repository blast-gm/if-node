const { readJSON, writeJSON } = require('./jsonDB');

const FILE = 'memberData.json';

// GET → pegar valor
function get(member, key) {

    const data = readJSON(FILE);

    const user = data.find(u => u.member === member);

    if (!user) return null;

    return user.data[key] ?? null;

}

// CHECK → verificar existência
function has(member, key) {

    const data = readJSON(FILE);

    const user = data.find(u => u.member === member);

    if (!user) return false;

    return key in user.data;

}

// CONTROL → salvar ou alterar
function set(member, key, value) {

    const data = readJSON(FILE);

    let user = data.find(u => u.member === member);

    if (!user) {

        user = {
            member,
            data: {}
        };

        data.push(user);

    }

    user.data[key] = value;

    writeJSON(FILE, data);

}

module.exports = {
    get,
    has,
    set
};