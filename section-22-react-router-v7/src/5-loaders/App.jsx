//Loaders:
// - Loaders are functions that fetch data BEFORE a route component renders.
// - They run in parallel with navigation, so data is ready when the page appears.
// - This replaces the useEffect + useState pattern for fetching data on page load.
//
// How it works:
// 1. Define a loader function that fetches and returns data.
// 2. Attach it to a route using the `loader` prop.
// 3. Access the data inside the component using the `useLoaderData()` hook.
//
// Example:
//   // Define the loader (can be in a separate file or inline)
//   const careersLoader = async () => {
//       const res = await fetch('http://localhost:4000/careers')
//       return res.json()
//   }
//
//   // Attach to route
//   <Route path="careers" element={<Careers />} loader={careersLoader} />
//
//   // Use in component
//   import { useLoaderData } from 'react-router-dom'
//   function Careers() {
//       const careers = useLoaderData()
//       return careers.map(c => <p key={c.id}>{c.title}</p>)
//   }
//
// Key points:
// - Loaders run before the component renders (no loading spinner needed).
// - They receive a `{ request, params }` argument for dynamic routes.
// - If a loader throws an error, the nearest errorElement handles it.
// - Loaders only work with createBrowserRouter + RouterProvider (not BrowserRouter).


// NOTE:
//Command to install json-server: npm install -g json-server
//Command to start the server: json-server --watch data/db.json --port 4000






import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
//Pages
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import NotFound from '../pages/NotFound.jsx'
import Careers from '../pages/careers/Careers.jsx'
//Layouts
import RootLayout from '../layouts/RootLayout.jsx'
import HelpLayout from '../layouts/HelpLayout.jsx'
import CareersLayout from '../layouts/CareersLayout.jsx'
//Help pages
import Faq from '../pages/help/Faq.jsx'
import Contact from '../pages/help/Contact.jsx'
import { careersLoader } from '../pages/careers/careersLoader.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<HelpLayout />}>
                <Route path='faq' element={<Faq />} />
                <Route path='contact' element={<Contact />} />
            </Route>

            <Route path="careers" element={<CareersLayout />}>
                <Route 
                index 
                element={<Careers />} 
                loader={careersLoader}
                />
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