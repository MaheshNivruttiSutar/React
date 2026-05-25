import { Link } from 'react-router-dom'

function BookListWithState() {
    return (
        <>
            <h1>BookList with Navigation State</h1>
            <p>Click a book — it passes state via the Link component</p>

            {/* Passing state through Link */}
            <Link to="/books/1" state={{ name: "React Basics", from: "booklist" }}>
                Book 1 - React Basics
            </Link><br />
            <Link to="/books/2" state={{ name: "JavaScript Guide", from: "booklist" }}>
                Book 2 - JavaScript Guide
            </Link><br />
            <Link to="/books/3" state={{ name: "Node.js Handbook", from: "booklist" }}>
                Book 3 - Node.js Handbook
            </Link><br />
        </>
    )
}

export default BookListWithState
