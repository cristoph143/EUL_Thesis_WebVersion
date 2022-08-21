// connect to database using mysql
// npm install --save mysql2
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'workbench_mysql123',
    database: 'thesis'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = 'INSERT INTO user (id, name, email, password, department, role) VALUES (1, "John Doe", "john.doe@gmail.com", "password", "IT", "admin"), (2, "Jane Doe", "jane.doe@gmail.com", "password", "IT", "user"), (3, "John Smith", "john.smith@gmail.com", "password", "IT", "teacher")'
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Result: ");
        // print the result in a json form
        console.log(JSON.stringify(result));
    });
});





// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const events = require('../backend/event.js');
// const mysql = require('mysql');

// // create db connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'workbench_mysql123',
//     database: 'thesis'
// });


// // db.connect();

// const port = process.env.PORT || 8080;

// const app = express()
//     .use(cors())
//     .use(bodyParser.json())
//     .use(events(connection));

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// }).on('error', err => {
//     console.log(err);
// }).on('listening', () => {
//     console.log(`Server listening on port ${port}`);
// }).on('close', () => {
//     console.log(`Server closed on port ${port}`);
// }).on('exit', () => {
//     console.log(`Server exited on port ${port}`);
// }).on('disconnect', () => {
//     console.log(`Server disconnected on port ${port}`);
// }).on('reconnect', () => {
//     console.log(`Server reconnected on port ${port}`);
// });

// // var mysql = require('mysql-wrapper');
// // var conn = mysql({
// //     host: 'localhost',
// //     port: '3306',
// //     user: 'root',
// //     password: 'workbench_mysql123',
// //     database: 'thesis'
// // });
// // conn.query(
// //     // insert into table user with id, name, email, password, department, and role
// //     'INSERT INTO users (id, name, email, password, department, role) VALUES (1, "John Doe", "john.doe@gmail.com", "password", "IT", "admin"), (2, "Jane Doe", "jane.doe@gmail.com", "password", "IT", "user"), (3, "John Smith", "john.smith@gmail.com", "password", "IT", "teacher")'
// // );