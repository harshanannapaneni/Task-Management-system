import react, { useEffect, useState } from 'react'
import axios from 'axios'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // Fetch tasks when the component mounts
    useEffect(() => {
        axios.get("http://localhost:9000/api/tasks").then(
            (response)=>{
                setTasks(response.data);
            }
        ).catch( err => {
            setError("Error fetching tasks");
        });
    },[]);

return (
    <div>
    <h1>Task List</h1>
    {error && <p>{error}</p>}
    <ul>
        {tasks.map(task => (
            <li key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.priority}</p>
                <p>{task.dueDate}</p>
            </li>
        ))}
    </ul>
</div>
)

}

export default TaskList