/*
 * Query Types + findBy | findAllBy — lesson notes
 *
 * Query types:
 * - getBy*    → must exist now (throws if missing)
 * - queryBy*  → returns null if missing
 * - findBy*   → async, waits until element appears (returns Promise)
 *
 * - use of findBy → API data, setTimeout, animations
 * - Write React code → load message after delay (see below)
 * - Test element with findBy → await screen.findByText(/ready/i)
 * - Test elements with findAllBy → await screen.findAllByRole('listitem')
 *
 * Run: npm test -- src/35-findBy-findAllBy-async
 */

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('Loading...');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('Sync complete');
      setTasks(['Import orders', 'Validate mappings', 'Publish flow']);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="App">
      <h1>35 - findBy | findAllBy | Async Elements</h1>
      <p role="status">{status}</p>
      <ul aria-label="sync tasks">
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
