/*
 * Test Input Box — lesson notes
 *
 * 1. Make Input box in App Component.
 * 2. Write Test case function.
 * 3. Test input box is present or not.
 * 4. Test input box:
 *    - name
 *    - placeholder
 *    - id
 *    - value
 *    - type
 */

import './App.css';
function App() {
  return (
  <div className="App">
    <p>Test Input Box: Write Test case function.</p>
    <p title="textbox">Mahesh Sutar</p>
    <label htmlFor="name">Name: </label>
    <input type="text" placeholder="Enter your name" id="name" defaultValue="Mahesh Sutar" />
    <img src="https://img.freepik.com/premium-photo/beautiful-girl-with-multicolored-hair_1048944-29857649.jpg" alt="Portrait" />
  </div>
  );
}

export default App;
