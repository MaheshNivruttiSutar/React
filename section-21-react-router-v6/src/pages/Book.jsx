import { useParams, useOutletContext } from 'react-router-dom'

function Book() {

    const { id } = useParams()
    const obj = useOutletContext()
    return (
        <>Book {id} {obj?.color}</>
    )
}
export default Book