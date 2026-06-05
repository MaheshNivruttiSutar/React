/*
 * onChange Event | Keyboard Interactions — lesson notes
 *
 * Q: What is Keyboard Interaction?
 * A: userEvent.type, tab, clear, etc. simulate typing like a real user.
 *
 * Q: Write code for on-change event?
 * A: Controlled input updates message state on change.
 *
 * Q: Test on change event?
 * A: await userEvent.type(input, 'text') then assert output.
 *
 * Q: Interview questions?
 * A: - fireEvent vs userEvent? → userEvent is closer to real UX
 *    - type vs paste? → type simulates key presses
 *    - clear input? → await userEvent.clear(input)
 *
 * Run: npm test -- src/39-onChange-keyboard-interactions
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const message = city ? `You typed: ${city}` : 'Start typing a city name';

  return (
    <main className="App">
      <h1>39 - onChange Event | Keyboard Interactions</h1>
      <label htmlFor="city">City</label>
      <input
        id="city"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="e.g. Pune"
      />
      <p role="status">{message}</p>
    </main>
  );
}

export default App;
