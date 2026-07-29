import { useEffect, useState } from 'react';
import './App.css';

/** @typedef {import('./types.js').User} User */

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  /** @type {User[]} */
  const data = await response.json();
  console.log('users', data);
  return data;
}

/** @param {{ user: User }} props */
function UserCard({ user }) {
  return (
    <li className='user-item'>
      {user.name} — {user.email} — {user.address.city}
      {user.phone ? ` — ${user.phone}` : ''}
    </li>
  );
}

function App() {
  const [users, setUsers] = useState(/** @type {User[]} */([]));

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="App">
      <h1>36 — Typed interface for an API response</h1>
      <p>Can you define a typed interface for an API response?</p>
      <br />
      <p>Typed User shape — name, email, address.city, phone? (optional):</p>
      <br />
      <ul>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}

export default App;
