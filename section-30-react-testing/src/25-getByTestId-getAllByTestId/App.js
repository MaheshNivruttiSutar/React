/*
 * RTL Query: getByTestId & getAllByTestId
 *
 * - Use of getByTestId — one element with data-testid
 * - Use of getAllByTestId — many elements sharing a test id pattern
 * - Test single element with test id
 * - Test multiple elements with test id
 *
 * Prefer role/label/text first. Use test id when no better query exists.
 * Run: npm test -- src/25-getByTestId-getAllByTestId
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>25 - getByTestId | getAllByTestId</h1>
      <p className="App__subtitle">Sales dashboard (test ids for widgets)</p>

      <article data-testid="revenue-card" className="App__card">
        <h2>Revenue</h2>
        <p data-testid="revenue-value">₹ 12,40,000</p>
      </article>

      <ul data-testid="orders-list" className="App__list">
        <li data-testid="order-row">Order #101 — Shipped</li>
        <li data-testid="order-row">Order #102 — Processing</li>
        <li data-testid="order-row">Order #103 — Delivered</li>
      </ul>

      <span data-testid="last-sync">Last sync: 2 min ago</span>
    </main>
  );
}

export default App;
