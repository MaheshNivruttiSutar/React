
import { useLoaderData } from "react-router-dom"

function CareerDetails() {
    const career = useLoaderData()


    return (
        <div className="career-details">
            <h2>Career Details From {career.title}</h2>
            <p>Salary: {career.salary}</p>
            <p>Location: {career.location}</p>

            <div className="details">
                <p>The career details page</p>
            </div>
        </div>
    )
}

export default CareerDetails