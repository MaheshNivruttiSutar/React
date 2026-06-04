/*
 * RTL Query: getAllByRole — lesson notes
 *
 * - Handle multiple elements when getByRole throws (more than one match).
 * - Multiple buttons with the same role → getAllByRole('button')
 * - Multiple select options with same role → getAllByRole('option')
 *
 * Returns an array. Use .length or [index] to assert each item.
 * Run: npm test -- src/20-getAllByRole
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>20 - getAllByRole</h1>
      <p className="App__subtitle">Pizza builder toolbar</p>

      <div role="toolbar" aria-label="pizza actions">
        <button type="button">Add topping</button>
        <button type="button">Remove topping</button>
        <button type="button">Reset pizza</button>
      </div>

      <label htmlFor="topping-select">Choose a topping</label>
      <select id="topping-select" defaultValue="cheese">
        <option value="cheese">Extra cheese</option>
        <option value="mushroom">Mushroom</option>
        <option value="olive">Black olive</option>
        <option value="pepper">Green pepper</option>
      </select>

      <h2>Selected toppings</h2>
      <ul>
        <li>Cheese</li>
        <li>Mushroom</li>
        <li>Olive</li>
      </ul>
    </main>
  );
}

export default App;
