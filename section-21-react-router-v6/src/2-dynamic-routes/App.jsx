import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Book from '../pages/Book.jsx'
import NoFound from '../pages/NoFound.jsx'
import BookList from '../pages/BookList.jsx'
import NewBook from '../pages/NewBook.jsx'

function App() {
    return (
        <>
            <h1>Dynamic Routes Example</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/books">Books</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookList />} />
                {/* :id is a dynamic parameter — matches any value */}
                <Route path="/books/:id" element={<Book />} />
                <Route path="/books/new" element={<NewBook />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App

// Dynamic Routes Notes:
// - :id in the path is a URL parameter (dynamic segment)
// - /books/1, /books/2, /books/abc all match /books/:id
// - Use useParams() hook inside the component to access the value
//   Example: const { id } = useParams()
// - You can have multiple params: /books/:id/chapter/:chapterId
