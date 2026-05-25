//Breadcrumbs:
// - Breadcrumbs show the user's current location in the app hierarchy (e.g., Home > Careers > Details).
// - React Router provides the `useLocation()` and `useMatches()` hooks to build breadcrumbs.
// - There is NO `useBreadcrumb()` hook — you build breadcrumbs manually using route data.
//
// How it works:
// 1. Use `useLocation()` to get the current pathname.
// 2. Split the pathname into segments and create links for each level.
// 3. Or use `useMatches()` which returns all matched routes with their data/handles.
//
// Example using useLocation:
//   import { useLocation, Link } from 'react-router-dom'
//   function Breadcrumbs() {
//       const location = useLocation()
//       const crumbs = location.pathname.split('/').filter(c => c !== '')
//       return (
//           <nav className="breadcrumbs">
//               <Link to="/">Home</Link>
//               {crumbs.map((crumb, index) => {
//                   const path = `/${crumbs.slice(0, index + 1).join('/')}`
//                   return <span key={path}> &gt; <Link to={path}>{crumb}</Link></span>
//               })}
//           </nav>
//       )
//   }
//
// Example using useMatches + route handles:
//   // In route definition, add a `handle` with breadcrumb info:
//   <Route path="careers" handle={{ crumb: "Careers" }} element={<CareersLayout />} />
//
//   // In Breadcrumbs component:
//   import { useMatches, Link } from 'react-router-dom'
//   function Breadcrumbs() {
//       const matches = useMatches()
//       const crumbs = matches.filter(m => m.handle?.crumb)
//       return crumbs.map(match => <Link to={match.pathname}>{match.handle.crumb}</Link>)
//   }
//
// Key points:
// - useMatches() gives all currently matched routes (great for data-driven breadcrumbs).
// - `handle` is a custom property you can attach to any route for metadata like breadcrumb labels.
// - Place the Breadcrumbs component in your layout so it appears on every page.



import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
//Pages
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import NotFound from '../pages/NotFound.jsx'
import Careers from '../pages/careers/Careers.jsx'
import CareerDetails from '../pages/careers/CareerDetails.jsx'
//Layouts
import RootLayout from '../layouts/RootLayout.jsx'
import HelpLayout from '../layouts/HelpLayout.jsx'
import CareersLayout from '../layouts/CareersLayout.jsx'
//Help pages
import Faq from '../pages/help/Faq.jsx'
import Contact from '../pages/help/Contact.jsx'
import { careersLoader } from '../pages/careers/careersLoader.jsx'
import { careersDetailsLoader } from '../pages/careers/careersDetailsLoader.jsx'
import CareersError from '../pages/careers/CareersError.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<HelpLayout />}>
                <Route path='faq' element={<Faq />} />
                <Route path='contact' element={<Contact />} />
            </Route>

            <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
                <Route
                    index
                    element={<Careers />}
                    loader={careersLoader}
                />
                <Route
                    path=":id"
                    element={<CareerDetails />}
                    loader={careersDetailsLoader}
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