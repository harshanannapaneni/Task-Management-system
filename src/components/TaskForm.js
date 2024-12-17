import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/taskform.css"

const TaskForm = ({fetchTasks, editingTask, setEditingTask, setShowForm}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if(editingTask){
            setTitle(editingTask.Title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setDueDate(editingTask.dueDate);
        }
    },[editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const payload = {title, description, priority, dueDate};
            if(editingTask){
                await axios.put(`/tasks/${editingTask.id}`, payload);
            }
            else{
                axios.post('/tasks',payload);
            }
            fetchTasks();
            setEditingTask(null);
            setShowForm(false);
        }
        catch(err){
            console.error(err)
        }
    };
    return (
        <form className="task-form" onSubmit={{handleSubmit}}>
            <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>
            <input type="text"
                    className="task-input"
                    value={title}
                    placeholder="Task Title"
                    onChange={(e)=>setTitle(e.target.value)} />
            <textarea className="task-textarea"
                        placeholder="Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)} />
            <select className="task-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <input type="date"
                    className="task-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
         />
         <button type="submit" className="task-submit-btn">
            {editingTask ? "Update Task" : "Add Task"}
        </button>
        </form>
    );
};

export default TaskForm;