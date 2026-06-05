/*
 * Functional Props Testing and Mocking — lesson notes
 *
 * 1. Add Props and click event to Component → onSave prop on SavePanel
 * 2. Function mocking in testing file → const onSave = jest.fn()
 * 3. Write test case to test functional Props → click, expect(onSave).toHaveBeenCalled()
 * 4. Interview Questions → see App.test.js comments
 *
 * Run: npm test -- src/42-functional-props-mocking
 */

import './App.css';
import SavePanel from './SavePanel';

function App({ onSave }) {
  return (
    <main className="App">
      <h1>42 - Functional Props Testing | Function Mocking</h1>
      <SavePanel title="Integration settings" onSave={onSave} />
    </main>
  );
}

export default App;
