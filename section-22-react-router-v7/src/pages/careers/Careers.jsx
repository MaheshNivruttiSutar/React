
//Loader
import { useLoaderData, Link } from 'react-router-dom'

function Careers() {
    const careers = useLoaderData()

    return (
        <div className="careers">
            {careers.map(career => (
                <Link to={career.id.toString()} key={career.id}>
                    <p>{career.title}</p>
                    <p>Salary: {career.salary}</p>
                    <p>Location: {career.location}</p>
                </Link>
            ))}
        </div>
    )
}

export default Careers