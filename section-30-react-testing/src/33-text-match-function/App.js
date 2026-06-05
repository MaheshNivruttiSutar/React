/*
 * Text Match with Function — lesson notes
 *
 * Q: What is Text Match?
 * A: Matchers accept string, RegExp, OR a function:
 *    (content, element) => boolean
 *
 * Q: Text Match with Function?
 * A: Use when string/regex is awkward (split nodes, custom rules):
 *    screen.getByText((content, element) => {
 *      return element?.tagName === 'P' && content.includes('CEL-');
 *    })
 *
 * Run: npm test -- src/33-text-match-function
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>33 - Text Match with Function</h1>
      <p className="App__client">Client: Celigo Integrations</p>
      <p className="App__ticket">Ticket: CEL-2048</p>
      <p className="App__priority">Priority: High</p>
      <span className="App__badge">LIVE</span>
    </main>
  );
}

export default App;
