//Router Provider:
// - RouterProvider is the new recommended way to set up routing in React Router v6.4+/v7.
// - Instead of wrapping your app with <BrowserRouter>, you create a router using createBrowserRouter()
//   and pass it to <RouterProvider router={router} />.
//
// Why RouterProvider over BrowserRouter?
// - RouterProvider unlocks the data API features: loaders, actions, error elements, etc.
// - BrowserRouter (used below) only supports the basic <Routes>/<Route> pattern without data APIs.
// - RouterProvider decouples route definitions from the component tree.
//
// Basic pattern with RouterProvider:
//   const router = createBrowserRouter([
//     { path: "/", element: <Home /> },
//     { path: "/about", element: <About /> },
//   ])
//   createRoot(root).render(<RouterProvider router={router} />)
//
// Below is still using the BrowserRouter approach (classic way).
// Next sections will switch to createBrowserRouter + RouterProvider.








import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
//Pages
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
//Layouts
import RootLayout from '../layouts/RootLayout.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
        </Route>
    )
)

function App() {
    return (



        <RouterProvider router={router} />

    )
}

export default App
