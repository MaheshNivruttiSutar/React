export const careersLoader = async () => {
    const res = await fetch('http://localhost:4000/careers')

    if (!res.ok) {
        throw Error('Could not fetch the careers')
    }
    return res.json()
}
