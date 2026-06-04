/*
 * Test OnChange Event with Input Box — lesson notes
 *
 * 1. Make input box in the component
 *    → <input type="text" ... />
 *
 * 2. Define state and use with onChange event
 *    → const [name, setName] = useState('');
 *    → onChange={(e) => setName(e.target.value)}
 *
 * 3. Import component in test file
 *    → import App from './App';
 *
 * 4. Write code for test case
 *    → render(<App />);
 *    → fireEvent.change(input, { target: { value: 'Mahesh' } });
 *    → expect(input).toHaveValue('Mahesh');
 *
 * 5. Run test case
 *    → npm test -- src/9-test-on-change-event
 */


import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h1>9 - Test on Change Event</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name ? <p className="App__display">Hello, {name}</p> : null}
    </div>
  );
}

export default App;
