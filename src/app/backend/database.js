const mysql = require('mysql2');
const config = require('../config/config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    port: config.port,
    database: config.database,
    password: config.password,
});

module.exports = pool.promise();