import { NavLink, Outlet } from 'react-router-dom'
import Breadcrumbs from '../Components/Breadcrumbs.jsx'

function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>Jobarouter</h1>
                    <NavLink to="/">Home</NavLink> <br />
                    <NavLink to="about">About</NavLink>
                    <NavLink to="help">Help</NavLink>
                    <NavLink to="careers">Careers</NavLink>
                </nav>
                <Breadcrumbs />
            </header>

            <main>
                <Outlet />
            </main>
        </div>


    )
}

export default RootLayout