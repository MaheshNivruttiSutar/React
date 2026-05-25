import { Routes, Route, NavLink } from 'react-router-dom'
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
                    {/* NavLink automatically adds "active" class when the route matches */}
                    <li>
                        <NavLink to="/"
                            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about"
                            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"
                            className={({ isActive }) => isActive ? "active-link" : ""}
                        >
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/books"
                            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
                        >
                            Books
                        </NavLink>
                    </li>
                </ul>
            </nav>

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


//NavLink Component Properties:
//
// NavLink is same as Link but with extra props for active state styling.
// It knows whether the current route matches the link's "to" prop.
//
// 1. to (required):
//    <NavLink to="/about">About</NavLink>
//    → same as Link — navigates to the given path
//
// 2. style (function — receives { isActive, isPending }):
//    <NavLink to="/about"
//        style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
//    >About</NavLink>
//    → applies dynamic inline styles based on active state
//
// 3. className (function — receives { isActive, isPending }):
//    <NavLink to="/about"
//        className={({ isActive }) => isActive ? "active-link" : "nav-link"}
//    >About</NavLink>
//    → applies dynamic CSS classes based on active state
//
// 4. children (function — receives { isActive, isPending }):
//    <NavLink to="/about">
//        {({ isActive }) => isActive ? "✓ About" : "About"}
//    </NavLink>
//    → renders dynamic content based on active state
//
// 5. end:
//    <NavLink to="/" end>Home</NavLink>
//    → matches ONLY exact path "/" (without "end", "/" matches every route)
//    → important for Home link so it doesn't stay active on /about, /books, etc.
//
// 6. replace:
//    <NavLink to="/about" replace>About</NavLink>
//    → replaces current entry in browser history (same as Link)
//
// 7. state:
//    <NavLink to="/about" state={{ from: "nav" }}>About</NavLink>
//    → passes hidden data to destination (same as Link)
//
// NavLink vs Link:
//    Link    → no active state awareness, just navigates
//    NavLink → knows if the route is active, great for navigation menus
//
// isPending vs isActive:
//    isActive  → true when the route matches the current URL
//    isPending → true when navigating to this route (useful with lazy loading)
