import { Link, useSearchParams } from 'react-router-dom'

const BOOKS = [
    { id: 1, name: "React Basics" },
    { id: 2, name: "JavaScript Guide" },
    { id: 3, name: "Node.js Handbook" },
]

function BookListWithSearch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("search") || ""

    const filteredBooks = BOOKS.filter(book =>
        book.name.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <>
            <h1>BookList with Search Params</h1>
            <p>URL updates as you type: /books?search=react</p>
            <input
                value={query}
                onChange={(e) => setSearchParams({ search: e.target.value })}
                placeholder="Search books..."
            />
            <br /><br />
            {filteredBooks.map(book => (
                <div key={book.id}>
                    <Link to={`/books/${book.id}`}>{book.name}</Link><br />
                </div>
            ))}
            <Link to="/books/new">New Book</Link>
        </>
    )
}

export default BookListWithSearch
