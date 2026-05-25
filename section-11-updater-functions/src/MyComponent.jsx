//An updater function is a pure function passed to setState() that receives the latest state and returns the next state 
// — guaranteeing correct, sequential, and safe updates even when React batches or delays them.

import { useState } from 'react';

function MyComponent() {
    const [count, setCount] = useState(0);

    function incrementCount() {
        //Takes the Pending state and returns the next state
        //React put your updater functions in a queue and process them one by one in the order they were called.
        setCount(count => count + 1);
        setCount(count => count + 1);
        setCount(count => count + 1);
    }
    function decrementCount() {
        setCount(count => count - 1);
        setCount(count => count - 1);
    }
    function resetCount() {
        setCount(() => 0);
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button className="button" onClick={incrementCount}>Increment</button>
            <button className="button" onClick={decrementCount}>Decrement</button>
            <button className="button" onClick={resetCount}>Reset</button> 
        </div>
    )
}
export default MyComponent