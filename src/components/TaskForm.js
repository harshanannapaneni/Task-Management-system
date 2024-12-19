import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/taskform.css";
import { createTask, updateTask } from "../services/api";

const TaskForm = ({ fetchTasks, editingTask, setEditingTask, setShowForm }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await updateTask(editingTask.id, task);
      } else {
        await createTask(task);
      }
      fetchTasks();
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>
      <input
        type="text"
        name="title"
        className="task-input"
        value={task.title}
        placeholder="Task Title"
        onChange={handleChange}
      />
      <textarea
        className="task-textarea"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />
      <select
        className="task-select"
        value={task.priority}
        name="priority"
        onChange={handleChange}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        className="task-input"
        value={task.dueDate}
        onChange={handleChange}
      />
      <button type="submit" className="task-submit-btn">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
