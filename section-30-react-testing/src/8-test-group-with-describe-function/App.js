/*
 * Test Grouping With Describe — lesson notes
 *
 * Q: What is describe?
 * A: A Jest function that groups related test() blocks under one label.
 *    Example: describe('App', () => { test('...', () => {}); });
 *
 * Q: How to make test cases group?
 * A: Wrap tests in describe('group name', () => { ... }).
 *    Tests in the same file can have multiple describe blocks.
 *
 * Q: Run test case with describe?
 * A: npm test -- src/8-test-group-with-describe-function
 *    npm test -- -t "heading"     → runs tests whose name matches "heading"
 *    npm test -- -t "App component" → runs tests inside that describe block
 *
 * Q: Skip in describe?
 * A: describe.skip('name', () => { ... }) — skips the whole group.
 *    test.skip('name', () => { ... })     — skips one test.
 *    See App.test.js → describe.skip('skipped example group')
 *
 * Q: Only in describe?
 * A: describe.only('name', () => { ... }) — runs only that group.
 *    test.only('name', () => { ... })     — runs only that test.
 *    Remove .only before commit! (Other tests show as skipped.)
 *
 * Q: Nested describe?
 * A: Put describe() inside another describe() for sub-groups.
 *    Example: describe('App', () => { describe('input', () => { ... }); });
 *    See App.test.js → describe('input fields')
 */

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>8 - Test Group with describe Function</h1>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        defaultValue="Mahesh Sutar"
      />
      <button className="button" type="button">Save</button>
    </div>
  );
}

export default App;
