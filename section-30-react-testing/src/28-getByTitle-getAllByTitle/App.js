/*
 * RTL Query: getByTitle & getAllByTitle
 *
 * - Use of getByTitle — find element by title attribute (tooltip text)
 * - Use of getAllByTitle — when several elements share the same title
 * - Test single element with getByTitle
 * - Test multiple elements with getAllByTitle
 *
 * Run: npm test -- src/28-getByTitle-getAllByTitle
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>28 - getByTitle | getAllByTitle</h1>
      <p className="App__subtitle">Document editor tooltips</p>

      <img
        src="https://img.freepik.com/premium-vector/document-file-icon_488544-360.jpg"
        alt="Document"
        title="Project specification PDF"
        className="App__icon"
      />

      <div className="App__toolbar">
        <button type="button" title="Save document">
          Save
        </button>
        <button type="button" title="Print document">
          Print
        </button>
        <button type="button" title="Help">
          Help
        </button>
      </div>

      <div className="App__glossary">
        <abbr title="HyperText Markup Language">HTML</abbr>
        <abbr title="Cascading Style Sheets">CSS</abbr>
        <abbr title="HyperText Markup Language">HTML5</abbr>
      </div>
    </main>
  );
}

export default App;
