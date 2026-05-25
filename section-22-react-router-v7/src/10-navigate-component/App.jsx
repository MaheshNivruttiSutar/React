//Navigate Component:
// - The <Navigate> component is used to redirect to a different route.
// - It's the JSX/declarative way to redirect (vs useNavigate() which is programmatic/imperative).
// - As soon as <Navigate> renders, it triggers a navigation to the specified path.
//
// How it works:
// 1. Import Navigate from react-router-dom:
//      import { Navigate } from 'react-router-dom'
//
// 2. Use <Navigate> in your JSX (redirects immediately when rendered):
//      <Navigate to="/careers" />
//
// Common use cases:
//
//   a) Redirect old routes to new ones:
//      <Route path="/jobs" element={<Navigate to="/careers" replace />} />
//
//   b) Redirect after conditional logic (e.g., auth guard):
//      function Dashboard() {
//          const user = useAuth()
//          if (!user) return <Navigate to="/login" replace />
//          return <div>Welcome back!</div>
//      }
//
//   c) Redirect index route to a child:
//      <Route index element={<Navigate to="faq" />} />
//
// Props:
// - `to` (required): The path to redirect to (string or object).
// - `replace` (optional): If true, replaces the current entry in history (no back button).
//    Without `replace`, the user can hit back and get stuck in a redirect loop.
//
// Navigate vs useNavigate:
// - <Navigate />: Declarative, used inside JSX (renders a redirect).
// - useNavigate(): Imperative, used inside event handlers or effects.
//      const navigate = useNavigate()
//      navigate('/careers')  // programmatic redirect





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
import { contactAction } from '../pages/careers/contactAction.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<HelpLayout />}>
                <Route path='faq' element={<Faq />} />
                <Route path='contact' element={<Contact />} action={contactAction} />
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