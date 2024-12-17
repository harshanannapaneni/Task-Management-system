import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/dashboard.css";
import TaskForm from "../components/TaskForm";

const DashboardPage = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try{
            const response = await axios.get('/tasks');
            setTasks(response.data);
        }
        catch(err){
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try{
            await axios.delete('/tasks/${id}');
            fetchTasks();
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Your Tasks</h1>
                <button className="task-btn" onClick={() => setShowForm(true)}>
                    Add Task
                </button>
            </div>

        {showForm && (
            <TaskForm fetchTasks={fetchTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            setShowForm={setShowForm} />
        )}

        <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <span className="task-title">{task.title}</span>
            <div className="task-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                    setEditingTask(task);
                    setShowForm(true);
                }}
                >
                    Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                    Delete
                </button>
                </div>
            </div>
        ))}
        </div>
    </div>
    );
};
                
export default DashboardPage;