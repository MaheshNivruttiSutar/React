/*
 * File and Folder naming convention — lesson notes
 *
 * Q: What file name we can use for test case file?
 * A: Put tests next to the source file with one of these suffixes:
 *    - file_name.test.js   (example in this folder)
 *    - file_name.spec.js   (same meaning, also valid in Jest)
 *    - App.test.js         (test file for App.js)
 *
 * Q: Folder name for testing files?
 * A: In this course, each lesson has its own folder, e.g.:
 *    src/11-file-and-folder-naming-convention/
 *    Tests live in the SAME folder as the code they test (colocated).
 *    Jest also supports __tests__/ subfolders if you prefer that style.
 *
 * Q: Run test case with naming convention?
 * A: npm test -- file_name.test.js
 *    npm test -- src/11-file-and-folder-naming-convention
 *    npm test -- -t "formatMessage"
 */

import './App.css';
import { formatMessage } from './file_name';

function App() {
  return (
    <div className="App">
      <h1>11 - File and Folder Naming Convention</h1>
      <p>{formatMessage('Mahesh Sutar')}</p>
      <ul className="App__list">
        <li>
          <code>file_name.js</code> → source file
        </li>
        <li>
          <code>file_name.test.js</code> → test file (same folder)
        </li>
        <li>
          <code>App.js</code> → <code>App.test.js</code>
        </li>
      </ul>
    </div>
  );
}

export default App;
