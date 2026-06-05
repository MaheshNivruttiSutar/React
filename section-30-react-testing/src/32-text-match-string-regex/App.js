/*
 * Text Match with String and Regex — lesson notes
 *
 * Q: What is Text Match?
 * A: The second argument to getByText / queryByText etc. can be:
 *    - string (full or partial match by default)
 *    - RegExp (/react/i)
 *
 * Q: Text Match with String?
 * A: screen.getByText('Exact text')
 *    screen.getByText('partial', { exact: false })
 *
 * Q: Text Match with Regex?
 * A: screen.getByText(/react/i)     — case-insensitive
 *    screen.getByText(/^status:/i)   — pattern match
 *
 * Run: npm test -- src/32-text-match-string-regex
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>32 - Text Match with String and Regex</h1>
      <p className="App__role">Role: React Developer</p>
      <p className="App__location">Location: Pune, India</p>
      <p className="App__status">Status: Open to work</p>
      <button type="button">Apply now</button>
    </main>
  );
}

export default App;
