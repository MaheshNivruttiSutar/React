/*
 * RTL Query: getAllByLabelText — lesson notes
 *
 * - Use of getAllByLabelText
 *   When more than one element shares the same label text, getByLabelText fails.
 *   getAllByLabelText returns an array of matching controls.
 *
 * - Test multiple input field
 *   Three short-answer fields all labeled "Your answer".
 *
 * - Test multiple checkbox
 *   Weekday reminders — each checkbox uses label "Notify me on".
 *
 * Run: npm test -- src/22-getAllByLabelText
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>22 - getAllByLabelText</h1>
      <p className="App__subtitle">Team feedback survey</p>

      <section aria-label="short answers">
        <h2>Quick questions</h2>
        <label htmlFor="answer-1">Your answer</label>
        <input id="answer-1" type="text" defaultValue="Clear communication" />

        <label htmlFor="answer-2">Your answer</label>
        <input id="answer-2" type="text" defaultValue="Faster releases" />

        <label htmlFor="answer-3">Your answer</label>
        <input id="answer-3" type="text" defaultValue="Better docs" />
      </section>

      <section aria-label="weekday notifications">
        <h2>Reminder days</h2>
        <label className="App__checkbox">
          <input id="notify-mon" type="checkbox" defaultChecked />
          Notify me on
        </label>
        <label className="App__checkbox">
          <input id="notify-wed" type="checkbox" />
          Notify me on
        </label>
        <label className="App__checkbox">
          <input id="notify-fri" type="checkbox" defaultChecked />
          Notify me on
        </label>
      </section>
    </main>
  );
}

export default App;
