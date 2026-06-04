/*
 * Before and After hooks — lesson notes
 *
 * Q: Use of before and after hook?
 * A: Run setup/teardown code around tests so you do not repeat the same
 *    lines in every test(). Keeps tests short and consistent.
 *
 * Q: beforeAll and beforeEach?
 * A: beforeAll  → runs ONCE before all tests in a describe() block.
 *    beforeEach → runs BEFORE EVERY test in that describe() block.
 *    Example: beforeAll(fetch config once), beforeEach(render component).
 *
 * Q: afterAll and afterEach?
 * A: afterEach → runs AFTER EVERY test (cleanup DOM, reset mocks).
 *    afterAll  → runs ONCE after all tests finish (close server, restore globals).
 *
 * Q: Example?
 * A: See App.test.js in this folder.
 *    Run: npm test -- src/12-before-and-after-hooks
 *
 * Order for 2 tests in one describe:
 *   beforeAll → beforeEach → test1 → afterEach → beforeEach → test2 → afterEach → afterAll
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>12 - beforeEach | beforeAll | afterAll | afterEach</h1>
      <ul className="App__hooks">
        <li>beforeAll — once before all tests</li>
        <li>beforeEach — before each test</li>
        <li>afterEach — after each test</li>
        <li>afterAll — once after all tests</li>
      </ul>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>Count: {count}</p>
    </div>
  );
}

export default App;
