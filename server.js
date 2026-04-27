const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión simple para Localhost
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

async function startServer() {
    const pool = await mysql.createPool(dbConfig);

    // GET - Obtener tareas
    app.get('/api/tasks', async (req, res) => {
        const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(rows);
    });

    // POST - Crear tarea
    app.post('/api/tasks', async (req, res) => {
        const { title } = req.body;
        const [result] = await pool.query('INSERT INTO tasks (title) VALUES (?)', [title]);
        res.json({ id: result.insertId, title, completed: false });
    });

    // PUT - Toggle
    app.put('/api/tasks/:id/toggle', async (req, res) => {
        await pool.query('UPDATE tasks SET completed = NOT completed WHERE id = ?', [req.params.id]);
        res.sendStatus(200);
    });

    // DELETE - Eliminar
    app.delete('/api/tasks/:id', async (req, res) => {
        await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        res.sendStatus(204);
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Servidor listo en http://localhost:${PORT}`));
}

startServer().catch(err => console.error("Error al conectar:", err));