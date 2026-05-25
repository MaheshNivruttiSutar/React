//Forms & Actions:
// - React Router provides a <Form> component that works with route "actions".
// - Instead of using regular <form> with onSubmit + useState, you use <Form> + action function.
// - When a <Form> is submitted, it calls the `action` function defined on the route.
//
// How it works:
// 1. Import Form from react-router-dom (replaces regular <form>):
//      import { Form } from 'react-router-dom'
//
// 2. Use <Form> in your component with method="POST":
//      <Form method="POST" action="/help/contact">
//          <input name="email" required />
//          <textarea name="message" required></textarea>
//          <button>Submit</button>
//      </Form>
//
// 3. Define an action function for the route:
//      export const contactAction = async ({ request }) => {
//          const data = await request.formData()
//          const submission = {
//              email: data.get('email'),
//              message: data.get('message')
//          }
//          console.log(submission)
//          // Send to API, database, etc.
//          return redirect('/') // redirect after submission
//      }
//
// 4. Attach the action to the route:
//      <Route path="contact" element={<Contact />} action={contactAction} />
//
// Key points:
// - <Form> prevents default browser behavior and lets React Router handle submission.
// - The action receives a `{ request }` object — use request.formData() to get form data.
// - Use `redirect()` from react-router-dom to navigate after a successful action.
// - Actions only work with createBrowserRouter + RouterProvider.
// - method="POST" triggers the action; method="GET" triggers the loader (search forms).






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