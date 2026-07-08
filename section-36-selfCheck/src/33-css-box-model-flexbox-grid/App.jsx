import './App.css';

function App() {
  return (
    <div className="App p-8">
      <h1 className="text-2xl font-bold mb-2">
        33 — CSS box model and responsive layout
      </h1>
      <p className="text-gray-600 mb-8">
        Can you explain the CSS box model and build a responsive layout using
        flexbox or grid?
      </p>

      <div className="grid min-h-[60vh] gap-4 p-4 border border-dashed border-gray-300 bg-gray-300 rounded-xl grid-cols-1 md:grid-cols-[200px_1fr] md:grid-rows-[auto_1fr_auto]">
        <header className="md:col-span-2 flex justify-between items-center p-4 border bg-amber-500 border-gray-300 rounded-xl">
          <span className="font-semibold">Logo</span>
          <nav className="flex gap-4 text-sm text-gray-900 font-bold font-size-lg">
            <span>Home</span>
            <span>About</span>
          </nav>
        </header>

        <aside className="p-4 border bg-blue-500 border-gray-300 rounded-xl">
          Sidebar
        </aside>

        <main className="p-4 border bg-green-500 border-gray-300 rounded-xl">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            <article className="p-4 border bg-yellow-500 border-gray-300 rounded-xl">
              Card 1
            </article>
            <article className="p-4 border bg-purple-500 border-gray-300 rounded-xl">
              Card 2
            </article>
            <article className="p-4 border bg-red-500 border-gray-300 rounded-xl">
              Card 3
            </article>
          </div>
        </main>

        <footer className="md:col-span-2 p-4 border bg-gray-500 border-gray-300 rounded-xl text-center text-sm text-gray-200">
          Footer
        </footer>
      </div>
    </div>
  );
}

export default App;
