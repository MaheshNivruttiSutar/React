import { useContext } from 'react';
import { UserContext } from './UserContext.js';

function ComponentD() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="box box-d">
            <h1>Component D</h1>
            <h2>{"Bye " + user}</h2>
            <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Change user name"
            />
        </div>
    );
}
export default ComponentD;
