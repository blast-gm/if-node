const { readJSON, writeJSON } = require('./jsonDB');

const FILE = 'globalData.json';

function get(key) {

    const data = readJSON(FILE);

    return data[key] ?? null;

}

function has(key) {

    const data = readJSON(FILE);

    return key in data;

}

function set(key, value) {

    const data = readJSON(FILE);

    data[key] = value;

    writeJSON(FILE, data);

}

module.exports = {
    get,
    has,
    set
};