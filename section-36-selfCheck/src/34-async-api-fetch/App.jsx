import { useEffect, useState } from 'react';
import './App.css';

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log("data", data);
  return data;
}

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="App">
      <h1>34 — Async function that fetches from an API</h1>
      <p>Can you write an async function that fetches data from an API?</p>
      <br />
      <ul>
        {users.map((user) => (
          <li className='user-item' key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
