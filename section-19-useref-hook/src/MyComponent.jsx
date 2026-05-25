// useState() = Re-renders the component when the state value changes.

// useRef()   = "use Reference" Does not cause re-renders when its value changes.
//              When you want a component to "remember" some information,
//              but you don't want that information to trigger new renders.

//              1. Accessing/Interacting with DOM elements
//              2. Handling Focus, Animations, and Transitions
//              3. Managing Timers and Intervals

import { useState, useEffect, useRef } from 'react';

function MyComponent() {

    const [stateCount, setStateCount] = useState(0);
    const refCount = useRef(0);
    const renderCount = useRef(0);

    const inputRef = useRef(null);
    const boxRef = useRef(null);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        console.log("COMPONENT RENDERED — total renders:", renderCount.current);
    });

    function incrementState() {
        setStateCount(prev => prev + 1);
    }

    function incrementRef() {
        refCount.current = refCount.current + 1;
        console.log("Ref count is now:", refCount.current);
    }

    function focusInput() {
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = "#fff8c5";
    }

    function changeBoxColor() {
        const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#a78bfa", "#60a5fa"];
        const random = colors[Math.floor(Math.random() * colors.length)];
        boxRef.current.style.backgroundColor = random;
    }

    return (
        <div className="useref-demo">
            <h1>useRef vs useState</h1>

            <section className="card">
                <h2>1. Counters — see the difference</h2>
                {/* eslint-disable-next-line react-hooks/refs */}
                <p>Render count (via useRef): <strong>{renderCount.current}</strong></p>
                <p>State count (via useState): <strong>{stateCount}</strong></p>
                {/* eslint-disable-next-line react-hooks/refs */}
                <p>Ref count (via useRef): <strong>{refCount.current}</strong> (UI lags — check console)</p>
                <button onClick={incrementState}>+1 state (re-renders)</button>
                <button onClick={incrementRef}>+1 ref (no re-render)</button>
            </section>

            <section className="card">
                <h2>2. Focus an input via DOM ref</h2>
                <button onClick={focusInput}>Focus the input</button>
                <input ref={inputRef} placeholder="I get focused" />
            </section>

            <section className="card">
                <h2>3. Mutate DOM directly (no re-render)</h2>
                <button onClick={changeBoxColor}>Random color</button>
                <div ref={boxRef} className="color-box">Click the button →</div>
            </section>

            <p className="hint">
                Tip: open DevTools console. Click <em>+1 ref</em> 5 times — you'll see
                the ref count grow in the console, but the UI stays the same.
                Then click <em>+1 state</em> once — the component re-renders and the
                ref count "catches up" because it's read during render.
            </p>
        </div>
    );
}
export default MyComponent;
