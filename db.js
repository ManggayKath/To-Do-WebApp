const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this if your MySQL username is different
    password: '', // Change this if your MySQL password is different
    database: 'todo_list' // Ensure this matches the name of your database
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = db;