import { useParams, useLocation, useNavigate } from 'react-router-dom'

function BookWithState() {
    const { id } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()

    return (
        <>
            <h1>Book {id}</h1>
            {state && (
                <div>
                    <p>Book Name: {state.name}</p>
                    <p>Navigated from: {state.from}</p>
                </div>
            )}
            {!state && <p>No state passed (try navigating from BookList)</p>}

            {/* Navigate back with state */}
            <button onClick={() => navigate("/books", { state: { lastViewed: id } })}>
                Go back to Books
            </button>
        </>
    )
}

export default BookWithState
