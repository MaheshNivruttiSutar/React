import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'

function App() {
    return (
        <>
            <h1>Router Types Example</h1>
            <p>Check main.jsx to see all router types</p>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    )
}

export default App

// Router Types Notes (see main.jsx for full examples):
// 1. BrowserRouter - Uses browser history API (most common for web apps)
//    URL looks like: http://localhost:5173/about
//
// 2. HashRouter - Uses hash in URL
//    URL looks like: http://localhost:5173/#/about
//
// 3. MemoryRouter - Stores history in memory, not in URL
//    Useful for testing or non-browser environments
//
// 4. StaticRouter - For server-side rendering (SSR) only
//    Cannot be used in Vite client-side apps
//
// 5. NativeRouter - For React Native mobile apps only
//    Cannot be used in web apps
