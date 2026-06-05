/*
 * queryBy | queryAllBy | Query Types | Hidden Elements
 *
 * Query types:
 * - getBy*    → throws if 0 or many matches (element must exist now)
 * - queryBy*  → returns null if not found (good for "not on screen")
 * - findBy*   → async, waits for element (see lesson 35)
 *
 * Q: Use of queryBy type?
 * A: Assert absence without try/catch:
 *    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
 *
 * Q: How to test elements with query?
 * A: queryByRole, queryByText, queryAllByRole return null / [] when missing.
 *
 * Q: Example of queryBy and queryAllBy?
 * A: See App.test.js — logout message hidden, multiple hidden tags.
 *
 * Q: Interview questions?
 * A: - getBy vs queryBy? → getBy throws, queryBy returns null
 *    - When queryAllBy? → multiple matches or assert count is 0
 *    - Hidden elements? → { hidden: true } includes aria-hidden / CSS hidden
 *
 * Run: npm test -- src/34-queryBy-queryAllBy-hidden-elements
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <main className="App">
      <h1>34 - queryBy | queryAllBy | Hidden Elements</h1>

      {loggedIn ? (
        <p role="status">Welcome, Mahesh</p>
      ) : (
        <p role="status">Please log in</p>
      )}

      <button type="button" onClick={() => setLoggedIn((v) => !v)}>
        Toggle session
      </button>

      <ul aria-label="error list" className="App__errors">
        <li className="App__error App__error--hidden" aria-hidden="true">
          Invalid email
        </li>
        <li className="App__error App__error--hidden" aria-hidden="true">
          Password too short
        </li>
      </ul>

      <p className="App__draft App__draft--hidden" aria-hidden="true">
        Draft autosaved
      </p>
    </main>
  );
}

export default App;
