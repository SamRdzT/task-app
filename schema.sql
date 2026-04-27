-- Active: 1773625961293@@localhost@3306@task_app
-- Active: 1773625961293@@localhost@3306@task_app
-- 1. Crear la base de datos (opcional si ya existe)
CREATE DATABASE IF NOT EXISTS task_app;
USE task_app;

-- 2. Crear la tabla de tareas
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);