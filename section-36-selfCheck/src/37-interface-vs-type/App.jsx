import './App.css';

/** @typedef {import('./types.js').User} User */
/** @typedef {import('./types.js').Role} Role */
/** @typedef {import('./types.js').Account} Account */

/** @type {Account[]} */
const accounts = [
  { name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'user' },
  { name: 'Carol', email: 'carol@example.com', role: 'guest' },
];

/** @type {Role[]} */
const roles = ['admin', 'user', 'guest'];

const admins = accounts.filter((account) => account.role === 'admin');

console.log('accounts', accounts);
console.log('roles', roles);
console.log('admins', admins);

function App() {
  return (
    <div className="App">
      <h1>37 — interface vs type</h1>
      <p>Do you understand the difference between interface and type?</p>
      <br />
      <p>interface — object shape (User: name, email):</p>
      <ul>
        {accounts.map((account) => (
          <li className='compare-item' key={account.email}>
            {account.name} — {account.email}
          </li>
        ))}
      </ul>
      <br />
      <p>type — union (Role = 'admin' | 'user' | 'guest'):</p>
      <ul>
        {roles.map((role) => (
          <li className='compare-item' key={role}>{role}</li>
        ))}
      </ul>
      <br />
      <p>type — intersection (Account = User & {'{ role }'}) — admins only:</p>
      <ul>
        {admins.map((account) => (
          <li className='compare-item' key={account.email}>
            {account.name} — {account.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
