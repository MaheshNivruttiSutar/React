/*
 * Multiple elements with Role & Custom Role — lesson notes
 *
 * Q: Multiple elements with the same role issue?
 * A: getByRole('button') throws if MORE than one button exists.
 *    Fix: pass { name: /accessible name/i } OR use getAllByRole('button').
 *
 * Q: Multiple buttons with role?
 * A: Each button needs a unique accessible name (visible text or aria-label).
 *    getByRole('button', { name: /play/i })
 *
 * Q: Multiple input box with role?
 * A: Link inputs with <label> so each textbox has a unique name.
 *    getByRole('textbox', { name: /track name/i })
 *
 * Q: Custom Role?
 * A: Non-semantic tags can expose a role: <div role="progressbar" aria-label="…">
 *    getByRole('progressbar', { name: /playback progress/i })
 *
 * Run: npm test -- src/19-multiple-elements-with-role-custom-role
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>19 - Multiple elements with Role | Custom Role</h1>
      <p className="App__subtitle">Music player controls</p>

      <div role="toolbar" aria-label="playback controls">
        <button type="button">Play</button>
        <button type="button">Pause</button>
        <button type="button">Stop</button>
      </div>

      <form aria-label="library search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="track-search">Track name</label>
        <input id="track-search" type="text" defaultValue="Blue in Green" />

        <label htmlFor="artist-search">Artist name</label>
        <input id="artist-search" type="text" defaultValue="Miles Davis" />
      </form>

      <div
        className="App__progress"
        role="progressbar"
        aria-label="Playback progress"
        aria-valuenow={45}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        45% played
      </div>

      <p role="status">Now playing: Blue in Green</p>
    </main>
  );
}

export default App;
