import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    console.log(data);
    setUsers(data.users);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setState runs after await, not synchronously
    fetchData();
  }, []);

  return (
   <div>
    <h1>MSW</h1>
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.firstName} {user.lastName}</li>
      ))}
    </ul>
   </div>
  )
}

export default App
