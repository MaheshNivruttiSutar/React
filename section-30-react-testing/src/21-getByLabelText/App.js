/*
 * RTL Query: getByLabelText — lesson notes
 *
 * - use of getByLabelText
 *   Finds form controls by their associated <label> text (accessible name).
 *   Best for inputs and checkboxes linked with htmlFor / wrapping <label>.
 *
 * - Test input field with getByLabelText
 *   screen.getByLabelText(/work email/i) → type="email" input
 *
 * - Test checkbox with getByLabelText
 *   screen.getByLabelText(/send weekly digest/i) → checkbox
 *
 * Run: npm test -- src/21-getByLabelText
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [digest, setDigest] = useState(false);

  return (
    <main className="App">
      <h1>21 - getByLabelText</h1>
      <p className="App__subtitle">Newsletter preferences</p>

      <form aria-label="newsletter signup" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="work-email">Work email</label>
        <input
          id="work-email"
          type="email"
          placeholder="name@company.com"
          defaultValue="mahesh@celigo.com"
        />

        <label htmlFor="phone">Phone (optional)</label>
        <input id="phone" type="tel" placeholder="+1 555 0100" />

        <label className="App__checkbox">
          <input
            id="digest"
            type="checkbox"
            checked={digest}
            onChange={(e) => setDigest(e.target.checked)}
          />
          Send weekly digest
        </label>

        <button type="submit">Save preferences</button>
      </form>

      {digest ? <p role="status">Digest enabled</p> : null}
    </main>
  );
}

export default App;
