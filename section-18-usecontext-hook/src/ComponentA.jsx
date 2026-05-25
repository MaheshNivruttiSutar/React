import { useState } from 'react';
import ComponentB from './ComponentB.jsx';
import { UserContext } from './UserContext.js';

function ComponentA() {
    const [user, setUser] = useState("John");

    return (
        <div className="box">
            <h1>Component A</h1>
            <h2>{"Hello " + user}</h2>
            <UserContext.Provider value={{ user, setUser }}>
                <ComponentB />
            </UserContext.Provider>
        </div>
    );
}
export default ComponentA;
