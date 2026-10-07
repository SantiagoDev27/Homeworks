import React, { createContext, useState, useContext } from 'react';

export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

interface TaskContextType {
    tasks: Task[];
    addTask: (text: string) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
    editTask: (id: string, newText: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (text: string) => setTasks([...tasks, { id: Date.now().toString(), text, completed: false }]);
    const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
    const toggleTask = (id: string) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const editTask = (id: string, newText: string) => setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, editTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within TaskProvider");
    return context;
};