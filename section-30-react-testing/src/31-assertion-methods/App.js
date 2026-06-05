/*
 * Assertion Methods — lesson notes
 *
 * Q: What are Assertion Methods?
 * A: expect(...).matcher() checks a condition. With jest-dom you assert on
 *    DOM nodes: visibility, text, attributes, values, etc.
 *
 * Q: Test elements with approx 10 assertion methods?
 * A: See App.test.js — toBeInTheDocument, toHaveTextContent, toHaveAttribute,
 *    toHaveClass, toBeVisible, toBeEnabled, toBeDisabled, toHaveValue,
 *    toBeChecked, toContainElement, toHaveAccessibleName
 *
 * Q: Assertion Not Methods?
 * A: Add .not before the matcher:
 *    expect(el).not.toBeInTheDocument();
 *    expect(button).not.toBeDisabled();
 *
 * Run: npm test -- src/31-assertion-methods
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [notify, setNotify] = useState(true);

  return (
    <main className="App">
      <h1>31 - Assertion Methods</h1>
      <p className="App__order-id" data-status="shipped">
        Order #ORD-9081
      </p>

      <p className="App__status">Status: Shipped</p>

      <label className="App__checkbox">
        <input
          type="checkbox"
          checked={notify}
          onChange={(e) => setNotify(e.target.checked)}
          aria-label="Email updates"
        />
        Email me updates
      </label>

      <label htmlFor="tracking">Tracking note</label>
      <input
        id="tracking"
        type="text"
        defaultValue="Out for delivery"
        readOnly
      />

      <button type="button" className="App__track-btn">
        Track package
      </button>

      <button type="button" className="App__cancel-btn" disabled>
        Cancel order
      </button>

      {notify ? (
        <p role="alert" className="App__alert">
          Notifications on
        </p>
      ) : null}
    </main>
  );
}

export default App;
