/*
 * getByRole Query — lesson notes
 *
 * Q: What is the Role in getByRole?
 * A: The accessibility role browsers expose: button, heading, textbox, table,
 *    link, checkbox, etc. screen.getByRole('button', { name: /submit/i })
 *
 * Q: What is semantic elements?
 * A: Semantic HTML has built-in meaning for assistive tech:
 *    - Semantic: <button>, <h1>–<h6>, <table>, <nav>, <input>, <a>
 *    - Non-semantic: <div>, <span> (no role unless you add role/aria-*)
 *    Prefer semantic tags so getByRole works naturally.
 *
 * Q: Test textbox with getByRole?
 * A: Present:  getByRole('textbox', { name: /full name/i })
 *    Value:     expect(input).toHaveValue('Mahesh Sutar')
 *    Disabled:  expect(input).toBeDisabled()
 *    See App.test.js → describe('textbox')
 *
 * Q: Test button with getByRole?
 * A: getByRole('button', { name: /submit application/i })
 *    expect(button).toBeEnabled() / toBeDisabled()
 *
 * Run: npm test -- src/18-getByRole-query
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>18 - getByRole Query</h1>
      <h2>Job application form</h2>

      <form aria-label="job application">
        <label htmlFor="full-name">Full name</label>
        <input id="full-name" type="text" defaultValue="Mahesh Sutar" />

        <label htmlFor="employee-id">Employee ID (locked)</label>
        <input
          id="employee-id"
          type="text"
          defaultValue="EMP-2048"
          disabled
        />

        <button type="submit">Submit application</button>
        <button type="button" disabled>
          Archive record
        </button>
      </form>

      <table>
        <caption>Recent applications</caption>
        <thead>
          <tr>
            <th scope="col">Applicant</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mahesh Sutar</td>
            <td>Frontend Developer</td>
          </tr>
          <tr>
            <td>Priya Shah</td>
            <td>QA Engineer</td>
          </tr>
        </tbody>
      </table>

      {/* Non-semantic: div has no button role unless role="button" is added */}
      <div className="App__note">Use semantic tags for reliable getByRole queries.</div>
    </main>
  );
}

export default App;
