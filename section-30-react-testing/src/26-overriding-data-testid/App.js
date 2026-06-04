/*
 * Overriding data-testid — lesson notes
 *
 * Q: Why need to override test id?
 * A: Some apps use data-cy, data-qa, or data-automation-id instead of
 *    data-testid. RTL must know which attribute to read for getByTestId.
 *
 * Q: How to override test id?
 * A: In test file (beforeAll):
 *    configure({ testIdAttribute: 'data-qa-id' });
 *    Then query: screen.getByTestId('save-btn')
 *    (looks for data-qa-id="save-btn" on the element)
 *
 * Q: Test elements after override test id?
 * A: See App.test.js — elements use data-qa-id, not data-testid.
 *
 * Run only this lesson when practicing override:
 * npm test -- src/26-overriding-data-testid
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>26 - Overriding data-testid</h1>
      <p className="App__subtitle">Widget uses data-qa-id (not data-testid)</p>

      <section data-qa-id="settings-panel" className="App__panel">
        <h2>Integration settings</h2>
        <button type="button" data-qa-id="save-btn">
          Save
        </button>
        <button type="button" data-qa-id="reset-btn">
          Reset
        </button>
      </section>

      <p data-qa-id="status-message">Connection: Active</p>
    </main>
  );
}

export default App;
