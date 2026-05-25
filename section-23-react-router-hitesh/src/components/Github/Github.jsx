// import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

// function Github() {
//     const data = useLoaderData()
//     const [data, setData] = useState({})

//     useEffect(() => {
//         fetch('https://api.github.com/users/MaheshNivruttiSutar')
//             .then(res => res.json())
//             .then(data => setData(data))
//             .catch(err => console.log(err))
//     }, [])
//     return (
//         <div className="text-2xl font-bold">Github followers: {data.followers}
//            <img className="rounded-full" src={data.avatar_url} alt="Github profile picture" width={300} />
//            </div>
//     )
// }

// export default Github


//Loader way:
function Github() {
    const data = useLoaderData()

    // useEffect(() => {
    //     fetch('https://api.github.com/users/MaheshNivruttiSutar')
    //         .then(res => res.json())
    //         .then(data => setData(data))
    //         .catch(err => console.log(err))
    // }, [])
    return (
        <div className="text-2xl font-bold">Github followers: {data.followers}
           <img className="rounded-full" src={data.avatar_url} alt="Github profile picture" width={300} />
           </div>
    )
}

export default Github