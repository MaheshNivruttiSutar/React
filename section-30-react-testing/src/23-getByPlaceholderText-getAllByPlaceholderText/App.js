/*
 * RTL Query: getByPlaceholderText & getAllByPlaceholderText
 *
 * - Use of getByPlaceholderText — one match by placeholder attribute
 * - Use of getAllByPlaceholderText — many inputs share the same placeholder
 * - Test single input field
 * - Test multiple input fields
 *
 * Run: npm test -- src/23-getByPlaceholderText-getAllByPlaceholderText
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>23 - getByPlaceholderText | getAllByPlaceholderText</h1>
      <p className="App__subtitle">Hotel booking search</p>

      <label htmlFor="city" className="App__visually-hidden">
        City
      </label>
      <input
        id="city"
        type="text"
        placeholder="Search city (e.g. Pune)"
        defaultValue="Pune"
      />

      <h2>Guest names</h2>
      <input type="text" placeholder="Guest full name" defaultValue="Mahesh Sutar" />
      <input type="text" placeholder="Guest full name" defaultValue="Priya Shah" />
      <input type="text" placeholder="Guest full name" defaultValue="Rahul Mehta" />
    </main>
  );
}

export default App;
