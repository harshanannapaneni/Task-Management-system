import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import TaskForm from "../components/TaskForm";
import { deleteTask, getTasks } from "../services/api";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching the tasks ", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting the task ", err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Tasks</h1>
        <button className="task-btn" onClick={() => setShowForm(true)}>
          Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          fetchTasks={fetchTasks}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setShowForm={setShowForm}
        />
      )}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks found. Add a task to get started!</p>
        ) : (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <span className="task-title">{task.title}</span>
              <div className="task-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
