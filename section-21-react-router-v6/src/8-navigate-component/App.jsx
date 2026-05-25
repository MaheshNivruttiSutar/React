import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import Book from '../pages/Book.jsx'
import NoFound from '../pages/NoFound.jsx'
import BookList from '../pages/BookList.jsx'
import NewBook from '../pages/NewBook.jsx'

function App() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/books">Books</Link></li>
                    <li><Link to="/old-about">Old About (redirects)</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/books/new" element={<NewBook />} />

                {/* Navigate component redirects from one route to another */}
                {/* "replace" removes the old URL from browser history */}
                <Route path="/old-about" element={<Navigate to="/about" replace />} />

                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App



//Navigate Component Properties:
//
// <Navigate> is a component that redirects to another route when rendered.
// It's the JSX/declarative way to redirect (vs useNavigate which is programmatic).
//
// 1. to (required):
//    <Navigate to="/about" />
//    → redirects to /about as soon as this component renders
//
// 2. replace:
//    <Navigate to="/about" replace />
//    → replaces current entry in browser history
//    → user can't press "Back" to go to the old URL
//    Without replace:
//    <Navigate to="/about" />
//    → pushes new entry in history, user can press "Back" to return
//
// 3. state:
//    <Navigate to="/about" state={{ from: "redirect" }} />
//    → passes hidden data to the destination page
//    → access it with: const { state } = useLocation()
//
// Common Use Cases:
//
// a) Route redirect (old URL → new URL):
//    <Route path="/old-about" element={<Navigate to="/about" replace />} />
//
// b) Protected routes (redirect if not logged in):
//    function ProtectedRoute({ children }) {
//        const isLoggedIn = false
//        if (!isLoggedIn) return <Navigate to="/login" replace />
//        return children
//    }
//    <Route path="/dashboard" element={
//        <ProtectedRoute><Dashboard /></ProtectedRoute>
//    } />
//
// c) Default redirect (e.g., / → /home):
//    <Route path="/" element={<Navigate to="/home" replace />} />
//
// Navigate vs useNavigate:
//    <Navigate>      → declarative (JSX), redirects when component renders
//    useNavigate()   → programmatic (hook), redirects on events (click, submit, etc.)
//
// Navigate vs Link:
//    <Link>          → user clicks to navigate (shows a clickable link)
//    <Navigate>      → automatic redirect (no user interaction needed)