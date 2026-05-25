// ============================================================
// useEffect Hook — Quick Notes
// ============================================================
//
// 1. WHAT IS IT?
//    - A React Hook that runs code in response to something happening.
//    - Used to handle side effects in function components.
//    - Tells React: "DO SOME CODE WHEN ___ happens."
//
// 2. WHEN DOES IT RUN? (pick one)
//    - The component re-renders
//    - The component mounts
//    - The state of a value changes
//
// 3. SYNTAX
//    useEffect(function, [dependencies])
//      - First arg  → the function to run
//      - Second arg → optional dependency array
//
// 4. THREE FORMS
//    1. useEffect(() => {})            // runs after every re-render
//    2. useEffect(() => {}, [])        // runs only on mount
//    3. useEffect(() => {}, [value])   // runs on mount + when value changes
//
// 5. COMMON USES
//    #1 Event Listeners (resize, scroll, keypress)
//    #2 DOM manipulation (e.g., update document.title)
//    #3 Subscriptions (real-time updates, sockets, Firebase)
//    #4 Fetching data from an API
//    #5 Cleanup when a component unmounts
//
// 6. CLEANUP FUNCTION
//    - Return a function from inside useEffect for cleanup.
//    - Runs before next effect and on unmount.
//    - Used for: clearing intervals, removing listeners, closing connections.
//
//    useEffect(() => {
//      const id = setInterval(tick, 1000);
//      return () => clearInterval(id);
//    }, []);
//
// 7. RULES
//    - Call only at the top level of a component.
//    - Call only inside function components or custom hooks.
//    - Always include all reactive values in the dependency array.
//    - Never lie about dependencies.
//
// 8. COMMON PITFALLS
//    - No dependency array → runs every render (often unwanted).
//    - Setting state inside effect with no deps → infinite loop.
//    - Missing dependency → stale data bugs.
//    - No cleanup → memory leaks.
//
// 9. MENTAL MODEL
//    - Don't think "when does this run?"
//    - Think "what should this effect stay in sync with?"
//    - React handles re-running and cleanup automatically based on deps.
//
// 10. ONE-LINE SUMMARY
//     useEffect = run side-effect code after render,
//                 controlled by a dependency array,
//                 with optional cleanup.
// ============================================================

//1. useEffect(() => {})            // runs after every re-render
//2. useEffect(() => {}, [])        // runs only on mount
//3. useEffect(() => {}, [value])   // runs on mount + when value changes



import { useEffect, useState } from 'react';


// //Example 1:
// function MyComponent() {
//     const [count, setCount] = useState(0);
//     const [color, setColor] = useState('red');

//     //document.title controls the text shown in the browser tab (the little label at the top of the window/tab), not anything on the visible page itself.
//     useEffect(() => {
//         document.title = `Count: ${count} ${color}`;
//     }, [count, color]);

//     function addCount() {
//         setCount(prev => prev + 1);
//     }

//     function subtractCount() {
//         setCount(prev => prev - 1);
//     }
//     function changeColor() {
//         setColor(prev => prev === 'red' ? 'blue' : 'red');
//     }

//     return (
//         <div>
//             <p style={{ color: color }}>Count: {count}</p>
//             <button onClick={addCount}>Add</button>
//             <button onClick={subtractCount}>Subtract</button><br />
//             <button onClick={changeColor}>Change Color</button>
//         </div>
//     )
// }
// export default MyComponent




// //Example 2: Window resize listener with cleanup
// function MyComponent() {
//     const [width, setWidth] = useState(window.innerWidth);
//     const [height, setHeight] = useState(window.innerHeight);

//     function handleResize() {
//         setWidth(window.innerWidth);
//         setHeight(window.innerHeight);
//     }

//     useEffect(() => {
//         window.addEventListener("resize", handleResize);
//         console.log("EVENT LISTENER ADDED");

//         return () => {
//             window.removeEventListener("resize", handleResize);
//             console.log("EVENT LISTENER REMOVED");
//         };
//     }, []);

//     return (
//         <>
//             <p>Window Width: {width}px</p>
//             <p>Window Height: {height}px</p>
//         </>
//     );
// }
// export default MyComponent;




// //Example 3: setInterval timer with cleanup
// // Demonstrates: mount-only effect ([]), cleanup is critical to avoid duplicate timers.
// function MyComponent() {
//     const [seconds, setSeconds] = useState(0);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setSeconds(prev => prev + 1);
//         }, 1000);
//         console.log("TIMER STARTED");

//         return () => {
//             clearInterval(intervalId);
//             console.log("TIMER STOPPED");
//         };
//     }, []);

//     return (
//         <div>
//             <h2>Timer: {seconds}s</h2>
//         </div>
//     );
// }
// export default MyComponent;




// //Example 4: Fetching data from an API on mount
// // Demonstrates: data fetching, loading state, error handling, mount-only effect.
// function MyComponent() {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/users/1")
//             .then(res => res.json())
//             .then(data => {
//                 setUser(data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h2>{user.name}</h2>
//             <p>Email: {user.email}</p>
//             <p>Phone: {user.phone}</p>
//         </div>
//     );
// }
// export default MyComponent;




// //Example 5: Effect that re-runs when a dependency changes
// // Demonstrates: dependency array with a value, effect re-runs when input changes.
// function MyComponent() {
//     const [search, setSearch] = useState("");
//     const [length, setLength] = useState(0);

//     useEffect(() => {
//         setLength(search.length);
//         console.log("Search changed to:", search);
//     }, [search]);

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Type something..."
//             />
//             <p>Characters typed: {length}</p>
//         </div>
//     );
// }
// export default MyComponent;




//Example 6: Multiple useEffects in one component
// Demonstrates: you can have several useEffects, each in sync with different things.
function MyComponent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");

    // Effect A — runs on every mount
    useEffect(() => {
        console.log("Component mounted");
        return () => console.log("Component unmounted");
    }, []);

    // Effect B — runs only when `count` changes
    useEffect(() => {
        document.title = `Count: ${count}`;
        console.log("Count changed:", count);
    }, [count]);

    // Effect C — runs only when `name` changes
    useEffect(() => {
        console.log("Name changed:", name);
    }, [name]);

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>

            <br /><br />

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <p>Hello, {name || "stranger"}!</p>
        </div>
    );
}
export default MyComponent;
