//React Router Basics:
// - React Router is a library that allows us to handle routing in a React app.
// - It enables navigation between different pages/views without a full page reload (SPA).
// - In v7, React Router uses a data-driven approach with loaders, actions, and route-based data fetching.
//
// Key Concepts:
// - Routes: Define which component to render for a given URL path.
// - createBrowserRouter: Creates a router instance using the browser's history API (new in v6.4+/v7).
// - RouterProvider: A component that provides the router context to the app.
// - Link: A component to navigate between routes without page reload.
// - Outlet: A placeholder where child routes render inside a parent layout.
//
// Installation:
// npm install react-router
//
// Basic Flow:
// 1. Define routes using createBrowserRouter([...])
// 2. Wrap your app with <RouterProvider router={router} />
// 3. Use <Link to="/path"> for navigation
// 4. Use <Outlet /> in layout components to render nested routes
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'

function App() {
    return (
        <>
            <BrowserRouter>
                <header>
                    <nav>
                        <h1>Jobarouter</h1>
                        <NavLink to="/">Home</NavLink> <br />
                        <NavLink to="/about">About</NavLink>
                    </nav>
                </header>


                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    )
}

export default App
