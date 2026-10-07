import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

export const Tasks = () => {
    const { logout, user } = useAuth();
    const { tasks, addTask, toggleTask, deleteTask } = useTasks();
    const [newTask, setNewTask] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            addTask(newTask);
            setNewTask('');
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mis Tareas</h2>
                <div>
                    <span className="me-3">{user?.email}</span>
                    <button onClick={logout} className="btn btn-outline-danger btn-sm">Cerrar Sesión</button>
                </div>
            </div>

            <div className="task-container">
                <form onSubmit={handleAdd} className="d-flex gap-2 mb-4">
                    <input
                        type="text"
                        className="form-control"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Añadir nueva tarea..."
                    />
                    <button type="submit" className="btn btn-success">Añadir</button>
                </form>

                <ul className="list-group">
                    {tasks.map(task => (
                        <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-light' : ''}`}>
                            <div className="d-flex align-items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.text}
                                </span>
                            </div>
                            <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-danger">Eliminar</button>
                        </li>
                    ))}
                    {tasks.length === 0 && <li className="list-group-item text-center text-muted">No hay tareas pendientes</li>}
                </ul>
            </div>
        </div>
    );
};