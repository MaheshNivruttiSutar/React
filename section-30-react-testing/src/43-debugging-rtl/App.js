/*
 * Debugging in React Testing Library — lesson notes
 *
 * - Automatic debugging → RTL prints DOM on test failure
 * - prettyDOM(element) → formatted HTML string
 * - debug() / screen.debug() → print current document.body
 * - DEBUG_PRINT_LIMIT=10000 npm test → larger debug output
 * - logRoles(container) → list available roles in output
 *
 * See App.test.js for examples (commented).
 *
 * Run: npm test -- src/43-debugging-rtl
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>43 - Debugging in React Testing Library</h1>
      <nav aria-label="main nav">
        <a href="/home">Home</a>
        <a href="/docs">Docs</a>
      </nav>
      <button type="button">Run sync</button>
      <p role="status">Ready to debug tests</p>
    </main>
  );
}

export default App;
