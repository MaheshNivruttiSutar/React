/*
 * Functional Component method testing — lesson notes
 * (Different example from lesson 15 — todo list, not a counter.)
 *
 * Q: Discuss possible case for method testing?
 * A: 1) Test via UI (type + click Add task) — matches real user flow.
 *    2) Test addTaskToList() in taskUtils.js — no DOM, no click.
 *    3) Rare: expose handler through ref (usually avoid).
 *
 * Q: Define the button, click event and method?
 * A: <button onClick={handleAddTask}>Add task</button>
 *    handleAddTask reads input and updates the task list.
 *
 * Q: Test method with event?
 * A: fireEvent.change(input, { target: { value: 'Buy milk' } });
 *    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
 *
 * Q: Test method without event?
 * A: addTaskToList([], 'Buy milk') — see taskUtils.test.js
 *
 * Run: npm test -- src/16-functional-component-method-testing
 */

import { useState } from 'react';
import './App.css';
import { addTaskToList } from './taskUtils';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = () => {
    const result = addTaskToList(tasks, taskInput);

    if (result.error) {
      setError(result.error);
      return;
    }

    setTasks(result.tasks);
    setTaskInput('');
    setError('');
  };

  return (
    <div className="App">
      <h1>16 - Functional Component Method Testing</h1>
      <p className="App__hint">Example: add tasks to a list (not a counter)</p>

      <label htmlFor="task">New task</label>
      <input
        id="task"
        type="text"
        placeholder="e.g. Buy groceries"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />

      <button type="button" onClick={handleAddTask}>
        Add task
      </button>

      {error ? (
        <p role="alert" className="App__error">
          {error}
        </p>
      ) : null}

      <ul aria-label="task list">
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
