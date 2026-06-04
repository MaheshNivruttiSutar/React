/*
 * Snapshot testing — lesson notes
 *
 * Q: What is snapshot testing?
 * A: Jest saves the rendered output (HTML/JSON) the first time you run the test.
 *    On later runs it compares the new output to the saved "snapshot" file.
 *    If they differ, the test fails.
 *
 * Q: Example?
 * A: expect(container).toMatchSnapshot();
 *    See App.test.js — snapshot file is created at:
 *    __snapshots__/App.test.js.snap
 *
 * Q: When is this useful?
 * A: When UI structure is stable and you want to catch unexpected changes quickly.
 *    Good for simple presentational components. Not ideal for highly dynamic data
 *    (dates, random ids) unless you mock those values.
 *
 * Q: How to update snapshots?
 * A: npm test -- -u
 *    npm test -- src/13-snapshot-testing -u
 *    Or in watch mode press: u (update snapshot)
 */

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>13 - Snapshot Testing</h1>
      <p className="App__message">Hello, Mahesh Sutar</p>
      <button type="button">Get Started</button>
    </div>
  );
}

export default App;
