import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import NoFound from '../pages/NoFound.jsx'
import NewBook from '../pages/NewBook.jsx'
import BookListWithState from './BookListWithState.jsx'
import BookWithState from './BookWithState.jsx'

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
                <Route path="/books" element={<BookListWithState />} />
                <Route path="/books/:id" element={<BookWithState />} />
                <Route path="/books/new" element={<NewBook />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App


//Navigation State Properties:
//
// Navigation state lets you pass hidden data between routes.
// Unlike search params, state is NOT visible in the URL.
//
// ── Sending State ──
//
// 1. Via Link:
//    <Link to="/about" state={{ from: "home", userId: 5 }}>About</Link>
//
// 2. Via NavLink:
//    <NavLink to="/about" state={{ from: "nav" }}>About</NavLink>
//
// 3. Via Navigate component:
//    <Navigate to="/about" state={{ from: "redirect" }} />
//
// 4. Via useNavigate hook:
//    const navigate = useNavigate()
//    navigate("/about", { state: { from: "login", userId: 5 } })
//
// ── Receiving State ──
//
// 5. Using useLocation():
//    import { useLocation } from 'react-router-dom'
//    const { state } = useLocation()
//    console.log(state)        → { from: "home", userId: 5 }
//    console.log(state?.from)  → "home"
//
// 6. Full location object (useLocation returns):
//    {
//        pathname: "/about",       → current path
//        search: "?page=2",        → query string
//        hash: "#section1",        → URL hash
//        state: { from: "home" },  → navigation state (hidden)
//        key: "abc123"             → unique key for this location
//    }
//
// ── Important Notes ──
//
// 7. State can be any serializable value:
//    state={{ name: "React", count: 5, items: [1, 2, 3] }}
//
// 8. State is null if nothing was passed:
//    const { state } = useLocation()
//    // Always use optional chaining: state?.from
//
// 9. State persists on page refresh (stored in browser session history)
//    But it's LOST when:
//    → user types URL directly in address bar
//    → user opens link in new tab
//    → user shares the URL (state is not in the URL)
//
// Common Use Cases:
//
// a) "Back" button context:
//    // Know where user came from to show a proper back button
//    <Link to="/book/1" state={{ from: "search" }}>Book 1</Link>
//    // In Book page: if state.from === "search" → show "Back to Search"
//
// b) Pass data to avoid re-fetching:
//    <Link to="/book/1" state={{ name: "React Guide", price: 29 }}>Book 1</Link>
//    // Book page can show name/price immediately without loading
//
// c) Flash messages after redirect:
//    navigate("/dashboard", { state: { message: "Login successful!" } })
//
// State vs Search Params:
//    State         → hidden, not shareable, lost if URL is copied
//    Search Params → visible in URL (?key=val), shareable, bookmarkable