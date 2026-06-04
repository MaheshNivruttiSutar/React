/*
 * RTL Query: getByAltText & getAllByAltText
 *
 * - Use of getByAltText — find one <img> (or area) by alt text
 * - Use of getAllByAltText — when several images share the same alt
 * - Test single image with getByAltText
 * - Test multiple images with getAllByAltText
 *
 * Run: npm test -- src/30-getByAltText-getAllByAltText
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>30 - getByAltText | getAllByAltText</h1>
      <p className="App__subtitle">Travel photo gallery</p>

      <img
        className="App__hero"
        src="https://img.freepik.com/premium-photo/beautiful-scenery-sunset-mountains_23-2149056988.jpg"
        alt="Himalayan peak at sunrise"
      />

      <h2>Thumbnails</h2>
      <div className="App__grid" aria-label="thumbnail gallery">
        <img
          src="https://img.freepik.com/premium-photo/beautiful-scenery-sunset-mountains_23-2149056988.jpg"
          alt="Gallery thumbnail"
        />
        <img
          src="https://img.freepik.com/premium-photo/beautiful-scenery-sunset-mountains_23-2149056988.jpg"
          alt="Gallery thumbnail"
        />
        <img
          src="https://img.freepik.com/premium-photo/beautiful-scenery-sunset-mountains_23-2149056988.jpg"
          alt="Gallery thumbnail"
        />
      </div>

      <img
        className="App__badge"
        src="https://img.freepik.com/premium-vector/sale-badge-icon_488544-120.jpg"
        alt="Limited offer badge"
      />
    </main>
  );
}

export default App;
