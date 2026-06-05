/*
 * Test with JS Query | Custom Query — lesson notes
 *
 * When RTL built-in queries are not enough, you can:
 * 1) Use a small JS helper (querySelector on container)
 * 2) Register a custom query with buildQueries (advanced)
 *
 * Prefer getByRole / getByLabelText first. Custom queries are a fallback.
 * See App.test.js → queryByDataCy helper.
 *
 * Run: npm test -- src/36-custom-query-javascript
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>36 - Custom Query | JavaScript Query</h1>
      <section data-cy="profile-card" className="App__card">
        <h2 data-cy="profile-name">Mahesh Sutar</h2>
        <p data-cy="profile-role">Integration Developer</p>
        <button type="button" data-cy="connect-btn">
          Connect
        </button>
      </section>
    </main>
  );
}

export default App;
