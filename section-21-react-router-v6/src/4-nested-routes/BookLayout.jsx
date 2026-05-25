import { Link, Outlet } from 'react-router-dom'

function BookLayout() {
    return (
        <>
            <h1>BookList</h1>
            <Link to="/books/1">Book 1</Link> <br />
            <Link to="/books/2">Book 2</Link> <br />
            <Link to="/books/3">Book 3</Link> <br />
            <Link to="/books/new">New Book</Link> <br />
            <Outlet context={{ color: 'red' }} />
        </>
    )
}
export default BookLayout