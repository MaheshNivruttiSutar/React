/*
 * MSW | Mock Service Worker — lesson notes
 *
 * Q: What is MSW?
 * A: Mock Service Worker intercepts network requests in tests (and browser)
 *    using the same handlers — no real API needed.
 *
 * Q: Setup steps?
 * A: 1. npm install msw --save-dev
 *    2. handlers.js → define rest.get/post handlers
 *    3. server.js → setupServer(...handlers)
 *    4. In test: beforeAll listen, afterEach resetHandlers, afterAll close
 *
 * Q: Why MSW over jest.fn(fetch)?
 * A: Tests real fetch code path; handlers reusable; closer to production behavior.
 *
 * Q: Interview questions?
 * A: See App.test.js comments
 *
 * Run: npm test -- src/45-msw-mock-service-worker
 */

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState('Loading team...');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/team')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load team');
        return res.json();
      })
      .then((data) => {
        setMembers(data);
        setStatus('');
      })
      .catch(() => {
        setError('Could not load team directory');
        setStatus('');
      });
  }, []);

  return (
    <main className="App">
      <h1>45 - MSW | Mock Service Worker</h1>
      {status && <p role="status">{status}</p>}
      {error && <p className="App__error" role="alert">{error}</p>}
      {!status && !error && (
        <ul className="App__list" aria-label="team members">
          {members.map((member) => (
            <li key={member.id}>
              {member.name} — {member.role}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
