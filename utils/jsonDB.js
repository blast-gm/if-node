const fs = require('fs');
const path = require('path');

function getFilePath(fileName) {
    return path.join(__dirname, '../data', fileName);
}

// Função para ler dados do arquivo JSON
function readJSON(fileName) {
    const filePath = getFilePath(fileName);

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Função para escrever dados no arquivo JSON
function writeJSON(fileName, data) {
    const filePath = getFilePath(fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Atualizar item
function updateItem(fileName, key, value, newData) {
    const data = readJSON(fileName);
    const index = data.findIndex(item => item[key] === value);

    if (index === -1) {
        return false; // Item não encontrado
    }

    //atualiza apenas os campos enviados

    data[index] = { ...data[index], ...newData };
    writeJSON(fileName, data);
    return true; // Item atualizado com sucesso
}

module.exports = {
    readJSON,
    writeJSON,
    updateItem
};  