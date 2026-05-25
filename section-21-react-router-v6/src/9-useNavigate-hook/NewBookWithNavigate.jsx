import { useNavigate } from 'react-router-dom'

function NewBookWithNavigate() {
    const navigate = useNavigate()

    function handleSubmit() {
        // After saving the book, navigate to books page
        navigate("/books")
    }

    function handleGoBack() {
        // Go back one page in browser history
        navigate(-1)
    }

    return (
        <div>
            <h1>New Book</h1>
            <p>useNavigate lets you navigate programmatically</p>
            <button onClick={handleSubmit}>Save & Go to Books</button>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    )
}

export default NewBookWithNavigate
