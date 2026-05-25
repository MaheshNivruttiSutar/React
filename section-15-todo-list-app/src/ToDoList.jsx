import { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState(["Eat breakfast", "Go to the gym", "Read a book"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }
    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(prev => [...prev, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        setTasks(prev => prev.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index === 0) return;
        setTasks(prev => {
            const updated = [...prev];
            [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
            return updated;
        });
    }

    function moveTaskDown(index) {
        if (index === tasks.length - 1) return;
        setTasks(prev => {
            if (index === prev.length - 1) return prev;
            const updated = [...prev];
            [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
            return updated;
        });

    }

    return (
        <div className='todo-list'>
            <h2>To Do List</h2>
            <input type="text" placeholder='Enter a new task' value={newTask} onChange={handleInputChange} />
            <button className='add-button' onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="task">{task}</span>
                        <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                        <button className='move-up-button' onClick={() => moveTaskUp(index)}>👆</button>
                        <button className='move-down-button' onClick={() => moveTaskDown(index)}>👇</button>
                    </li>
                ))}
            </ol>
        </div>


    )
}
export default ToDoList