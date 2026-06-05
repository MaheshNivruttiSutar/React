/*
 * act function — lesson notes
 *
 * Q: Use of act function?
 * A: Wraps state updates so React applies them before assertions.
 *    RTL usually calls act for you (render, fireEvent, userEvent).
 *
 * Q: Issue before using act function?
 * A: Warning: "not wrapped in act(...)" when updates happen outside
 *    testing helpers — assertions may run on stale UI.
 *
 * Q: Apply act function?
 * A: import { act } from 'react';
 *    act(() => { setState(newValue); });
 *    See App.test.js
 *
 * Q: Interview questions?
 * A: - What is act? → flush React updates before verify
 *    - Do I always need act? → No, RTL handles most cases
 *
 * Run: npm test -- src/40-act-function
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);

  return (
    <main className="App">
      <h1>40 - act Function</h1>
      <p aria-live="polite">Points: {points}</p>
      <button type="button" onClick={() => setPoints((n) => n + 10)}>
        Add 10 points
      </button>
    </main>
  );
}

export default App;
