/*
 * API Test with MSW — lesson notes
 *
 * Q: How to test API calls with MSW end-to-end?
 * A: Component calls fetch → MSW handler returns mock JSON → assert UI updates.
 *
 * Q: Test loading, success, and error?
 * A: Success: default handler. Error: server.use(rest.get(..., res.networkError()))
 *
 * Q: Difference from lesson 46?
 * A: Lesson 46 mocks fetch directly; lesson 47 uses MSW handlers (real fetch runs).
 *
 * Q: Interview questions?
 * A: See App.test.js comments
 *
 * Run: npm test -- src/47-api-test-msw
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadRecipes() {
    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setRecipes(data);
    } catch {
      setError('Recipe service unavailable');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="App">
      <h1>47 - API Test with MSW</h1>
      <p>Regional recipe shelf</p>

      <button type="button" onClick={loadRecipes}>
        Load recipes
      </button>

      {loading && <p role="status">Loading recipes...</p>}
      {error && <p className="App__error" role="alert">{error}</p>}
      {recipes.length > 0 && (
        <ul className="App__list" aria-label="recipe list">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              {recipe.title} ({recipe.cuisine})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
