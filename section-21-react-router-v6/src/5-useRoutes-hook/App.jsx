import { useRoutes, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import Book from '../pages/Book.jsx'
import NoFound from '../pages/NoFound.jsx'
import BookList from '../pages/BookList.jsx'
import NewBook from '../pages/NewBook.jsx'

function App() {
    const routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/books", element: <BookList /> },
        { path: "/books/:id", element: <Book /> },
        { path: "/books/new", element: <NewBook /> },
        { path: "*", element: <NoFound /> },
    ])

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

            {routes}
        </>
    )
}

export default App


// useRoutes Hook Notes:
// - useRoutes is an alternative to <Routes> and <Route> components
// - Instead of JSX, you define routes as a JavaScript array of objects
// - Each object has: path (URL), element (component to render)
// - You can nest routes using the "children" property
// - useRoutes returns a React element (or null) that you render in JSX
// - It must be used inside a <BrowserRouter> (same as <Routes>)
// - Useful when you want to define routes dynamically or from a config file