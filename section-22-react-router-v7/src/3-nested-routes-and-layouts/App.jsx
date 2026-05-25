//Nested Routes & Layouts:
// - Nested routes allow you to define child routes inside a parent route.
// - The parent route renders a "layout" component that wraps all its children.
// - The layout uses <Outlet /> to render the matching child route content.
//
// How it works:
// - A parent <Route> has an `element` prop that acts as the layout (e.g., header, nav, footer).
// - Child <Route> elements are nested inside the parent and render within <Outlet />.
// - Only the child content changes on navigation; the layout stays persistent.
//
// Example structure:
//   <Route path="/" element={<RootLayout />}>     ← layout with nav, header, footer
//       <Route index element={<Home />} />         ← renders at "/"
//       <Route path="about" element={<About />} /> ← renders at "/about"
//   </Route>
//
// Key points:
// - `index` route = default child route (renders when parent path matches exactly).
// - <Outlet /> in RootLayout is where child route components appear.
// - You can nest layouts multiple levels deep (e.g., /careers/123 with a CareersLayout).
// - This avoids repeating nav/header/footer in every page component.











import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
//Pages
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
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
        </Route>
    )
)

function App() {
    return (



        <RouterProvider router={router} />

    )
}

export default App