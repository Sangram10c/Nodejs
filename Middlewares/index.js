const fs = require('fs');

function logRequest(req, res, next) {
    const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`;
    fs.appendFile('requests.log', log + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
}

module.exports = logRequest;
