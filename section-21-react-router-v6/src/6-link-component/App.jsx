import { Routes, Route, Link } from 'react-router-dom'
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
            <h1>Link Component Example</h1>
            <nav>
                <ul>
                    {/* Link prevents full page reload — uses client-side navigation */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/books">Books</Link></li>

                    {/* Link with replace — replaces current history entry instead of pushing */}
                    <li><Link to="/about" replace>About (replace)</Link></li>

                    {/* Link with state — pass data to the next page */}
                    <li><Link to="/about" state={{ from: "nav" }}>About (with state)</Link></li>
                </ul>
            </nav>

            <p>
                {/* Regular anchor tag — causes full page reload (DON'T use for internal links) */}
                <a href="/about">About (anchor tag - full reload)</a>
            </p>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/books/new" element={<NewBook />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App

// Link Component Notes:
// - <Link to="/path"> replaces <a href="/path"> for internal navigation
// - Link does NOT reload the page — it uses client-side routing (faster)
// - <a href> causes a full page reload — avoid for internal links
// - Link props:
//   - to: the URL path to navigate to (required)
//   - replace: if true, replaces current entry in browser history
//   - state: pass hidden data to the destination page
// - Always use Link (or NavLink) for navigation within your React app


//Link Component Properties:
// - to: the URL path to navigate to (required)
// - replace: if true, replaces current entry in browser history
// - state: pass hidden data to the destination page
// - className: add a class to the link
// - style: add inline styles to the link
// - onClick: add a function to the link
// - children: the content of the link
// - title: add a title to the link
// - aria-label: add an aria-label to the link
// - aria-current: add an aria-current to the link

//Link Component Example:
//
// 1. Basic Link (to):
//    <Link to="/about">About</Link>
//    → navigates to /about without page reload
//
// 2. Replace (replace):
//    <Link to="/about" replace>About</Link>
//    → replaces current URL in history (back button skips this page)
//
// 3. State (state):
//    <Link to="/about" state={{ from: "home", userId: 5 }}>About</Link>
//    → passes hidden data to /about (not visible in URL)
//    → access it with: const { state } = useLocation()
//
// 4. ClassName (className):
//    <Link to="/about" className="nav-link">About</Link>
//    → adds CSS class to the rendered <a> tag
//
// 5. Style (style):
//    <Link to="/about" style={{ color: "red", fontWeight: "bold" }}>About</Link>
//    → adds inline styles to the link
//
// 6. onClick (onClick):
//    <Link to="/about" onClick={() => console.log("clicked!")}>About</Link>
//    → runs function when link is clicked (navigation still happens)
//
// 7. target (target):
//    <Link to="/about" target="_blank">About</Link>
//    → opens link in a new tab
//
// 8. Relative path (to):
//    <Link to="details">Details</Link>
//    → navigates relative to current route (e.g., /books → /books/details)
//    <Link to="..">Go Back</Link>
//    → navigates to parent route
//
// 9. Link vs <a> tag:
//    <Link to="/about">About</Link>     → client-side navigation (fast, no reload)
//    <a href="/about">About</a>          → full page reload (slow, re-fetches everything)
//    <a href="https://google.com">Google</a> → use <a> for external links only
