const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if you have a different MySQL user
    password: '', // Add your MySQL password if any
    database: 'todo_app' // Ensure this matches your database name
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// API endpoints
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const { task, due_date } = req.body;
    db.query('INSERT INTO tasks (task, due_date) VALUES (?, ?)', [task, due_date], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, task, due_date });
    });
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task, due_date } = req.body;
    db.query('UPDATE tasks SET task = ?, due_date = ? WHERE id = ?', [task, due_date, id], (err) => {
        if (err) throw err;
        res.json({ id, task, due_date });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});