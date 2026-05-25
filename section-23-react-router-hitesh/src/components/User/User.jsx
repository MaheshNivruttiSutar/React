import { useParams } from 'react-router-dom'

function User() {
    const { id } = useParams()
    return (
        <div className="text-2xl font-bold">User: {id}</div>
    )
}

export default User