/*
 * Querying Within Elements — lesson notes
 *
 * Find element within an element using within(parent):
 *
 *   const list = screen.getByRole('list', { name: /team members/i });
 *   const item = within(list).getByText('Priya Shah');
 *
 * Useful when the same text appears in multiple sections.
 *
 * Run: npm test -- src/37-querying-within-elements
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>37 - Querying Within Elements</h1>

      <section aria-label="engineering team">
        <h2>Engineering</h2>
        <ul aria-label="engineering members">
          <li>Mahesh Sutar</li>
          <li>Priya Shah</li>
        </ul>
      </section>

      <section aria-label="qa team">
        <h2>QA</h2>
        <ul aria-label="qa members">
          <li>Rahul Mehta</li>
          <li>Priya Shah</li>
        </ul>
      </section>
    </main>
  );
}

export default App;
