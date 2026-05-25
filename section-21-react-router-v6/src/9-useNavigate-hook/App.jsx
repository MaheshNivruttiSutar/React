import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import Book from '../pages/Book.jsx'
import NoFound from '../pages/NoFound.jsx'
import BookList from '../pages/BookList.jsx'
import NewBookWithNavigate from './NewBookWithNavigate.jsx'

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
                <Route path="/contact" element={<Contact />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/books/new" element={<NewBookWithNavigate />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App



//useNavigate Hook Properties:
//
// useNavigate() returns a navigate function for programmatic navigation.
// Use it when you need to navigate on events (button click, form submit, timer, etc.)
//
// Setup:
//    const navigate = useNavigate()
//
// 1. Navigate to a path:
//    navigate("/about")
//    → goes to /about
//
// 2. Navigate with replace:
//    navigate("/about", { replace: true })
//    → goes to /about and replaces current entry in history
//    → user can't press "Back" to return
//
// 3. Navigate with state:
//    navigate("/about", { state: { from: "home", userId: 5 } })
//    → passes hidden data to /about
//    → access it with: const { state } = useLocation()
//
// 4. Navigate with both replace and state:
//    navigate("/about", { replace: true, state: { from: "login" } })
//
// 5. Go back (browser history):
//    navigate(-1)
//    → same as pressing browser's Back button
//
// 6. Go back 2 pages:
//    navigate(-2)
//
// 7. Go forward:
//    navigate(1)
//    → same as pressing browser's Forward button
//
// 8. Navigate to relative path:
//    navigate("details")
//    → if current URL is /books, goes to /books/details
//    navigate("..")
//    → goes to parent route
//
// Common Use Cases:
//
// a) After form submit:
//    function handleSubmit() {
//        saveData()
//        navigate("/success")
//    }
//
// b) After login:
//    function handleLogin() {
//        loginUser()
//        navigate("/dashboard", { replace: true })
//    }
//
// c) Redirect after delay:
//    useEffect(() => {
//        setTimeout(() => navigate("/home"), 3000)
//    }, [])
//
// useNavigate vs <Navigate>:
//    useNavigate()  → programmatic (in event handlers, useEffect, etc.)
//    <Navigate>     → declarative (in JSX, redirects when rendered)
//
// useNavigate vs Link:
//    useNavigate()  → navigate from code (no visible link)
//    <Link>         → navigate from user click (renders an <a> tag)