//Route Parameters:
// - Route parameters allow you to capture dynamic segments from the URL.
// - They are defined using a colon (:) prefix in the route path (e.g., :id).
// - The captured value can be accessed using the `useParams()` hook.
//
// How it works:
// 1. Define a route with a parameter:
//      <Route path="careers/:id" element={<CareerDetails />} />
// 2. Access the parameter in the component using useParams():
//      import { useParams } from 'react-router-dom'
//      function CareerDetails() {
//          const { id } = useParams()  // id = "3" if URL is /careers/3
//      }
//
// Using params in a loader:
// - Loaders receive a `{ params }` object to fetch data for a specific item.
//      export const careerDetailsLoader = async ({ params }) => {
//          const res = await fetch(`http://localhost:4000/careers/${params.id}`)
//          return res.json()
//      }
//
// Key points:
// - Route params are always strings (convert to number if needed).
// - You can have multiple params: /careers/:id/reviews/:reviewId
// - useParams() returns an object with all matched params.
// - Loaders get params automatically — no need for useParams() in loaders.










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