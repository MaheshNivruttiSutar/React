//Error Elements:
// - Error elements are components that render when a route's loader, action, or component throws an error.
// - They are defined using the `errorElement` prop on a route.
// - Inside the error component, use the `useRouteError()` hook to access the error.
//
// How it works:
// 1. Define an error element component:
//      import { useRouteError } from 'react-router-dom'
//      function CareersError() {
//          const error = useRouteError()
//          return <div>Error: {error.message}</div>
//      }
//
// 2. Attach it to a route:
//      <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
//
// Key points:
// - Errors bubble up: if a child route has no errorElement, the parent's catches it.
// - errorElement catches errors from loaders, actions, and rendering.
// - Use useRouteError() hook (NOT props) to get the error object.
// - You can throw errors in loaders: throw Error('Could not find data')


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