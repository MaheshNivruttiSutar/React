import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>

            <p>Go to the <Link to="/">Home Page</Link></p>
        </div>
    )
}

export default NotFound