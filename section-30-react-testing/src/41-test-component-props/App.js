/*
 * Test Component Props — lesson notes
 *
 * 1. Make Component → UserCard.js
 * 2. Pass Props and Display on UI → <UserCard name role location />
 * 3. Write test case to test Props → render with props, assert text
 * 4. Interview Questions → see App.test.js comments
 *
 * Run: npm test -- src/41-test-component-props
 */

import './App.css';
import UserCard from './UserCard';

function App() {
  return (
    <main className="App">
      <h1>41 - Test Component Props</h1>
      <UserCard name="Mahesh Sutar" role="Integration Developer" location="Pune" />
    </main>
  );
}

export default App;
