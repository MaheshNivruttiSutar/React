/*
 * API Call for Testing — lesson notes
 *
 * Q: How to test components that call APIs?
 * A: Mock fetch in the test file so no real network request runs.
 *
 * Q: Mock fetch with jest?
 * A: jest.spyOn(global, 'fetch').mockResolvedValue({
 *      ok: true,
 *      json: async () => ({ text: '...', author: '...' }),
 *    });
 *
 * Q: What to assert?
 * A: Loading state → success data on screen → or error message on failure.
 *
 * Q: Interview questions?
 * A: See App.test.js comments
 *
 * Run: npm test -- src/46-api-call-testing
 */

import { useState } from 'react';
import './App.css';

const API_URL = 'https://api.example.com/quotes/daily';

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadQuote() {
    setLoading(true);
    setError('');
    setQuote(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setQuote(data);
    } catch {
      setError('Unable to fetch quote');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="App">
      <h1>46 - API Call for Testing</h1>
      <p>Daily inspiration board</p>

      <button type="button" onClick={loadQuote}>
        Load quote
      </button>

      {loading && <p role="status">Fetching quote...</p>}
      {error && <p className="App__error" role="alert">{error}</p>}
      {quote && (
        <blockquote className="App__quote">
          <p>{quote.text}</p>
          <footer className="App__author">— {quote.author}</footer>
        </blockquote>
      )}
    </main>
  );
}

export default App;
