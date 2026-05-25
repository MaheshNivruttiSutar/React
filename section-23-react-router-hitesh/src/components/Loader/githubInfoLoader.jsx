const githubInfoLoader = async () => {
    const res = await fetch('https://api.github.com/users/MaheshNivruttiSutar')
    return res.json()
}

export { githubInfoLoader }