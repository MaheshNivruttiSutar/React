import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Book from '../pages/Book.jsx'
import NoFound from '../pages/NoFound.jsx'
import BookList from '../pages/BookList.jsx'
import NewBook from '../pages/NewBook.jsx'

function App() {
    return (
        <>
            <h1>Route Specificity Example</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/books">Books</Link></li>
                    <li><Link to="/books/new">New Book</Link></li>
                    <li><Link to="/books/1">Book 1 (dynamic)</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookList />} />
                {/* React Router v6 automatically picks the most specific match */}
                {/* /books/new matches BOTH routes below, but "new" is more specific than ":id" */}
                <Route path="/books/:id" element={<Book />} />
                <Route path="/books/new" element={<NewBook />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App

// Route Specificity Notes:
// - React Router v6 automatically ranks routes by specificity
// - /books/new is MORE specific than /books/:id
// - So /books/new always renders NewBook, even if listed after :id
// - Order of routes does NOT matter in v6 (unlike v5 where order mattered)
// - Static segments ("new") always win over dynamic segments (":id")
// - More segments = more specific (/a/b/c beats /a/b)
