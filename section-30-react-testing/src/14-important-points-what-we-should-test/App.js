/*
 * Important points for testing — lesson notes
 *
 * Q: What we should test?
 * A: - User-visible behavior (text, buttons, forms, navigation)
 *    - Business logic (pure functions in utils files)
 *    - Edge cases (empty input, invalid data, error messages)
 *    - Critical user flows (login, submit, add to cart)
 *    - Accessibility roles/labels users rely on
 *
 * Q: What things we should not test?
 * A: - Third-party library internals (React, Jest, MUI already have tests)
 *    - Implementation details (state variable names, private functions)
 *    - CSS pixel-perfect layout (unless critical)
 *    - Code that is trivial (getters with no logic)
 *    - Snapshot everything without meaningful assertions
 *
 * Q: Important points?
 * A: - Test behavior, not implementation (UI may refactor; behavior stays)
 *    - Write tests users care about (RTL queries: role, label, text)
 *    - Keep tests small, readable, and independent
 *    - Prefer unit tests for utils + integration tests for components
 *    - Do not chase 100% coverage — focus on high-risk areas
 *    - Run: npm test -- src/14-important-points-what-we-should-test
 */

import { useState } from 'react';
import './App.css';
import { validateLogin } from './loginUtils';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const result = validateLogin(email, password);
    setMessage(result);
  }

  return (
    <div className="App">
      <h1>14 - Important Points | What We Should Test</h1>

      <section aria-label="what to test">
        <h2>What we should test</h2>
        <ul>
          <li>User-visible behavior</li>
          <li>Business logic &amp; edge cases</li>
          <li>Critical flows (login, submit)</li>
        </ul>
      </section>

      <section aria-label="what not to test">
        <h2>What we should not test</h2>
        <ul>
          <li>Third-party library internals</li>
          <li>Private implementation details</li>
          <li>Trivial code with no logic</li>
        </ul>
      </section>

      <form onSubmit={handleSubmit} aria-label="login form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {message ? (
        <p role="alert" className="App__message">
          {message}
        </p>
      ) : null}
    </div>
  );
}

export default App;
