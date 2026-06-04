/*
 * Test Click Event with Button — lesson notes
 *
 * 1. Make button and state in the component
 *    → const [count, setCount] = useState(0);
 *    → <button>Click me</button>
 *
 * 2. Update state with button click event
 *    → onClick={() => setCount(count + 1)}
 *
 * 3. Import component in test file
 *    → import App from './App';
 *
 * 4. Write code for test click event
 *    → render(<App />);
 *    → fireEvent.click(screen.getByRole('button', { name: /click me/i }));
 *    → expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
 *
 * 5. Run test case
 *    → npm test -- src/10-click-event-test-case
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>10 - Click Event Test Case with Button</h1>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p className="App__count">Count: {count}</p>
    </div>
  );
}

export default App;
