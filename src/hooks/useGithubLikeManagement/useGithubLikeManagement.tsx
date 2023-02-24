import { useState, useEffect } from "react"

type RepositoryState = {
    liked: boolean;
    id: number;
}


export default function useGithubLikeManagement() {
    const [repositoryLiked, setRepositoryLiked] = useState<RepositoryState[]>([])

    useEffect(() => {
        const data = localStorage.getItem('repositoryLiked')
        if (data) {
            setRepositoryLiked(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        if(repositoryLiked.length === 0) return
        localStorage.setItem('repositoryLiked', JSON.stringify(repositoryLiked))
    }, [repositoryLiked])


    function toggleLike(id: number) {
        setRepositoryLiked((prevState) => {
            const exists = prevState.find(r => r.id === id)
            if (exists) {
                return prevState.filter(r => r.id !== id)
            }
            return [...prevState, { id, liked: true }]
        })
    }

    return { repositoryLiked, toggleLike }
}