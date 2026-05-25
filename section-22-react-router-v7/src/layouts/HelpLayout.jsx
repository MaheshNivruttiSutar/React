import { Outlet, NavLink } from 'react-router-dom'

//Layout component for the help page
function HelpLayout() {
    return (
        <div className="help-layout">
            <h2>Need help?</h2>
            <p>We're here to help you.</p>


            <nav>
                <NavLink to='faq'>View the FAQ</NavLink>
                <NavLink to='contact'>Contact US</NavLink>
            </nav>




            <Outlet />
        </div>


    )
}

export default HelpLayout