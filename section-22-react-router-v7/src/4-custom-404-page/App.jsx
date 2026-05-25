//Custom 404 Page:
// - A custom 404 page is displayed when a user navigates to a URL that doesn't match any defined route.
// - By default, React Router shows its own error boundary with "No route matches URL".
// - To show a custom "Not Found" page, add a catch-all route with path="*" at the end of your routes.
//
// How to implement:
// - Create a NotFound component (e.g., pages/NotFound.jsx)
// - Add a <Route path="*" element={<NotFound />} /> as the last child route.
// - The "*" wildcard matches any URL that hasn't been matched by previous routes.
//
// Example:
//   <Route path="/" element={<RootLayout />}>
//       <Route index element={<Home />} />
//       <Route path="about" element={<About />} />
//       <Route path="*" element={<NotFound />} />   ← catches all unmatched routes
//   </Route>
//
// Note: The "*" route should always be the LAST route inside the parent.








import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
//Pages
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import NotFound from '../pages/NotFound.jsx'
//Layouts
import RootLayout from '../layouts/RootLayout.jsx'
import HelpLayout from '../layouts/HelpLayout.jsx'
//Help pages
import Faq from '../pages/help/Faq.jsx'
import Contact from '../pages/help/Contact.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<HelpLayout />}>
                <Route path='faq' element={<Faq />} />
                <Route path='contact' element={<Contact />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

function App() {
    return (
        <RouterProvider router={router} />

    )
}

export default App