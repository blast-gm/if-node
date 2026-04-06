const fs = require('fs');
const path = require('path');

function loadRoutes(app) {
    const routesPath = path.join(__dirname, "../routes");

    fs.readdirSync(routesPath).forEach(file => {
        if (file.endsWith('.js')) {
            const route = require(path.join(routesPath, file));
            app.use(route);
        }
    });
}

module.exports = loadRoutes;