/*
 * Test Case Run Options — lesson notes
 *
 * Q: How to run specific test files?
 * A: Pass the file or folder path after -- :
 *    npm test -- src/7-test-case-run-options
 *    npm test -- src/7-test-case-run-options/App.test.js
 *    npm test -- --watchAll=false src/7-test-case-run-options   (run once, no watch)
 *
 * Q: What is watch mode?
 * A: Default when you run npm test. Jest keeps running and re-runs tests when
 *    you save files. You get an interactive menu with keyboard shortcuts (a, f, p, t, q).
 *
 * Q: How to run the failed test case?
 * A: In watch mode, press f — runs only tests that failed on the last run.
 *    (Break a test on purpose, save, then press f after it fails.)
 *
 * Q: How to run all test cases?
 * A: In watch mode, press a — runs every test file (not only files related to changes).
 *    Or from terminal: npm test -- --watchAll
 *
 * Q: How to quit watch mode?
 * A: In watch mode, press q.
 *
 * Q: How to filter test files for run?
 * A: In watch mode, press p — type a regex to match file names/paths (e.g. 7-test).
 *
 * Q: How to filter test case?
 * A: In watch mode, press t — type a regex to match test names (e.g. button).
 *    Or from terminal: npm test -- -t "button"
 */

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>7 - Test Case Run Options</h1>
      <p className="App__intro">
        Run <code>npm test</code> in the terminal, then try the shortcuts below.
      </p>
      <ul className="App__commands" aria-label="jest watch mode shortcuts">
        <li>
          <strong>Specific file:</strong> npm test -- src/7-test-case-run-options
        </li>
        <li>
          <strong>Watch mode:</strong> default — tests re-run on save
        </li>
        <li>
          <strong>Failed only:</strong> press <kbd>f</kbd>
        </li>
        <li>
          <strong>All tests:</strong> press <kbd>a</kbd>
        </li>
        <li>
          <strong>Quit:</strong> press <kbd>q</kbd>
        </li>
        <li>
          <strong>Filter file:</strong> press <kbd>p</kbd> → e.g. <code>7-test</code>
        </li>
        <li>
          <strong>Filter test name:</strong> press <kbd>t</kbd> → e.g. <code>button</code>
        </li>
      </ul>
      <button type="button">Practice button</button>
    </div>
  );
}

export default App;
