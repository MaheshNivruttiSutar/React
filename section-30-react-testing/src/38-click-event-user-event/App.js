/*
 * Click Event with User Event — lesson notes
 *
 * Q: Why use user-event library?
 * A: Simulates real user interactions more closely than fireEvent
 *    (pointer, focus, keyboard sequence).
 *
 * Q: Update User event library?
 * A: Already in package.json: @testing-library/user-event
 *    Use: await userEvent.click(button)  (v13+)
 *
 * Q: Write click event with state?
 * A: Button toggles likes count with useState.
 *
 * Q: Test click event with user event?
 * A: await userEvent.click(button) in async test.
 *
 * Run: npm test -- src/38-click-event-user-event
 */

import { useState } from 'react';
import './App.css';

function App() {
  const [likes, setLikes] = useState(0);

  return (
    <main className="App">
      <h1>38 - Click Event with User Event</h1>
      <p className="App__post">Post: React Testing tips</p>
      <p aria-live="polite">Likes: {likes}</p>
      <button type="button" onClick={() => setLikes((n) => n + 1)}>
        Like post
      </button>
    </main>
  );
}

export default App;
