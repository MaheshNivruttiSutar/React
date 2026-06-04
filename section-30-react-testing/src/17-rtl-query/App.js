/*
 * RTL Query — lesson notes
 *
 * Q: What is RTL Query?
 * A: Functions from @testing-library/react that find DOM nodes the way
 *    users do — by role, label, visible text, placeholder, alt text, etc.
 *    Examples: getByRole, getByLabelText, getByText, queryByText, findByRole.
 *
 * Q: Why need RTL Query?
 * A: - Avoid brittle selectors (class names, querySelector, container hacks).
 *    - Tests reflect real accessibility and user behavior.
 *    - Clear errors when an element is missing or duplicated.
 *
 * Q: Steps in testing UI?
 * A: 1) render(<Component />)     — mount UI
 *    2) screen.getBy...(…)        — find element
 *    3) expect(...).toBe…()       — assert behavior or content
 *
 * Q: How RTL Query finds elements?
 * A: It searches the accessible DOM tree (roles, labels, names users see).
 *    Prefer queries tied to what appears on screen, not implementation details.
 *
 * Q: Type of RTL Queries?
 * A: By timing:
 *    - getBy*    → must exist now (throws if 0 or many)
 *    - queryBy*  → returns null if not found (good for “not on page”)
 *    - findBy*   → waits async (returns Promise)
 *    Each has getAllBy / queryAllBy / findAllBy for multiple matches.
 *
 *    By priority (use higher items first):
 *    Role → Label → Placeholder → Text → Display value → Alt → Title → Test id
 *
 * Run: npm test -- src/17-rtl-query
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>17 - RTL Query</h1>
      <p className="App__tagline">Book club membership</p>

      <img
        src="https://img.freepik.com/premium-vector/open-book-icon-logo-vector_7649-176.jpg"
        alt="Open book club logo"
        className="App__logo"
      />

      <nav aria-label="member navigation">
        <a href="/orders">View reading list</a>
      </nav>

      <form aria-label="join form">
        <label htmlFor="member-email">Member email</label>
        <input
          id="member-email"
          type="email"
          placeholder="you@example.com"
          defaultValue="mahesh@example.com"
        />
        <button type="submit">Join club</button>
      </form>

      <p role="status">Status: Active member</p>
    </main>
  );
}

export default App;
