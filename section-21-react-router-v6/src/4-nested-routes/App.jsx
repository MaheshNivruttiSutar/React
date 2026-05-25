import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import Book from '../pages/Book.jsx'
import NoFound from '../pages/NoFound.jsx'
import NewBook from '../pages/NewBook.jsx'
import BookLayout from './BookLayout.jsx'

function App() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/books">Books</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/books" element={<BookLayout />}>
                    <Route path=":id" element={<Book />} />
                    <Route path="new" element={<NewBook />} />
                </Route>
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App
