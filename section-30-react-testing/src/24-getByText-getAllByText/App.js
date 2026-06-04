/*
 * RTL Query: getByText & getAllByText
 *
 * - Use of getByText — find one element by visible text content
 * - Use of getAllByText — when the same text appears more than once
 * - Test single button, h1 and p tag
 * - Test multiple button, h1 and p tags
 *
 * Run: npm test -- src/24-getByText-getAllByText
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>24 - getByText | getAllByText</h1>
      <p className="App__lead">Choose a plan for your team</p>

      <section aria-label="starter plan">
        <h2>Starter</h2>
        <p>Best for individuals</p>
        <button type="button">Upgrade</button>
      </section>

      <section aria-label="team plan">
        <h2>Team</h2>
        <p>Best for small teams</p>
        <button type="button">Upgrade</button>
      </section>

      <section aria-label="enterprise plan">
        <h2>Enterprise</h2>
        <p>Best for large orgs</p>
        <button type="button">Upgrade</button>
      </section>

      <p className="App__footer">All plans include email support</p>
    </main>
  );
}

export default App;
