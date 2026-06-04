import './App.css';
import { isFinished, readingProgress } from './bookUtils';

const book = {
  title: 'The Pragmatic Programmer',
  author: 'David Thomas & Andrew Hunt',
  pagesRead: 280,
  totalPages: 352,
};

function App() {
  const progress = readingProgress(book.pagesRead, book.totalPages);
  const finished = isFinished(book.pagesRead, book.totalPages);

  return (
    <main className="library-app">
      <h1 className="library-app__title">4 - Understand React Test Structure</h1>
      <article className="book-card" aria-label="book details">
        <h2 className="book-card__title">{book.title}</h2>
        <p className="book-card__author">by {book.author}</p>
        <p className="book-card__progress">{progress} complete</p>
        <span
          className={finished ? 'book-badge book-badge--done' : 'book-badge book-badge--reading'}
          role="status"
        >
          {finished ? 'Finished' : 'Still reading'}
        </span>
      </article>
    </main>
  );
}

export default App;
