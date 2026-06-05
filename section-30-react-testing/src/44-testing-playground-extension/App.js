/*
 * Testing Playground Chrome Extension — lesson notes
 *
 * Q: What is Testing Playground?
 * A: A browser extension that suggests the best RTL query for any element
 *    you click on the running app (getByRole, getByLabelText, etc.).
 *
 * Q: How to use it?
 * A: 1. Install "Testing Playground" from Chrome Web Store
 *    2. Run npm start and open the app in the browser
 *    3. Open DevTools → Testing Playground tab
 *    4. Click an element → copy the suggested query into your test
 *
 * Q: Why use Testing Playground?
 * A: It follows RTL priority (role first), avoids brittle queries,
 *    and speeds up writing tests for real UI.
 *
 * Q: Interview questions?
 * A: See App.test.js comments
 *
 * Run: npm test -- src/44-testing-playground-extension
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('beginner');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() && email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <main className="App">
      <h1>44 - Testing Playground Chrome Extension</h1>
      <p>Workshop signup — use Testing Playground on this form in the browser.</p>

      <form className="App__form" aria-label="workshop signup" onSubmit={handleSubmit}>
        <label htmlFor="workshop-name">
          Full name
          <input
            id="workshop-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="workshop-email">
          Email address
          <input
            id="workshop-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="workshop-track">
          Track
          <select
            id="workshop-track"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <button type="submit">Reserve seat</button>
      </form>

      {submitted && (
        <p className="App__success" role="status">
          Seat reserved for {name} ({track} track)
        </p>
      )}
    </main>
  );
}

export default App;
