import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import Book from '../pages/Book.jsx'
import NoFound from '../pages/NoFound.jsx'
import NewBook from '../pages/NewBook.jsx'
import BookListWithSearch from './BookListWithSearch.jsx'

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
                <Route path="/books" element={<BookListWithSearch />} />
                <Route path="/books/:id" element={<Book />} />
                <Route path="/books/new" element={<NewBook />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </>
    )
}

export default App



//Search Params Properties:
//
// useSearchParams() reads and writes URL query parameters.
// URL query params: /books?search=react&page=2
//
// Setup:
//    const [searchParams, setSearchParams] = useSearchParams()
//
// ── Reading params (searchParams methods) ──
//
// 1. get(key) — get single value:
//    searchParams.get("search")          → "react"  (from ?search=react)
//    searchParams.get("missing")         → null     (if param doesn't exist)
//
// 2. getAll(key) — get all values for a key:
//    // URL: ?color=red&color=blue
//    searchParams.getAll("color")        → ["red", "blue"]
//
// 3. has(key) — check if param exists:
//    searchParams.has("search")          → true/false
//
// 4. toString() — get full query string:
//    searchParams.toString()             → "search=react&page=2"
//
// 5. entries() — iterate all params:
//    for (const [key, value] of searchParams.entries()) {
//        console.log(key, value)
//    }
//
// 6. keys() / values():
//    [...searchParams.keys()]            → ["search", "page"]
//    [...searchParams.values()]          → ["react", "2"]
//
// ── Writing params (setSearchParams) ──
//
// 7. Set params (replaces all):
//    setSearchParams({ search: "react" })
//    → URL becomes: /books?search=react
//
// 8. Set multiple params:
//    setSearchParams({ search: "react", page: "2" })
//    → URL becomes: /books?search=react&page=2
//
// 9. Update using previous value:
//    setSearchParams(prev => {
//        prev.set("page", "3")
//        return prev
//    })
//    → keeps existing params, only updates "page"
//
// 10. Delete a param:
//    setSearchParams(prev => {
//        prev.delete("search")
//        return prev
//    })
//
// 11. Set with replace (no history entry):
//    setSearchParams({ search: "react" }, { replace: true })
//
// Common Use Cases:
//
// a) Search/filter:
//    <input onChange={(e) => setSearchParams({ search: e.target.value })} />
//
// b) Pagination:
//    <button onClick={() => setSearchParams({ page: "2" })}>Page 2</button>
//
// c) Sorting:
//    <button onClick={() => setSearchParams({ sort: "name", order: "asc" })}>Sort</button>
//
// Search Params vs Route Params:
//    Route params  → /books/:id      → part of the path, required
//    Search params → /books?search=x → optional, for filtering/sorting/pagination
//
// Search Params vs State:
//    Search params → visible in URL, shareable, bookmarkable
//    State         → hidden, lost on page refresh