import { useState } from 'react'
import toast from 'react-hot-toast'

type Result = User | Repository

type GhUser = {
  items: User[]
}

type GhRepository = {
  items: Repository[]
}

const getUsers = async (search: string) => {
  const response = (await fetch(`https://api.github.com/search/users?q=${search}`)).json() as Promise<GhUser>

  return (await response).items.map((user) => ({
    id: user.id,
    name: user.login,
    html_url: user.html_url,
  }))
}

const getRepos = async (search: string) => {
  const response = (await fetch(`https://api.github.com/search/repositories?q=${search}`)).json() as Promise<GhRepository>

  return (await response).items.map((repo) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
  }))
}

export function useSearch () {
  const [results, setResults] = useState<Result[]>([])

  const handleSearch = async (search: string) => {
    if (!search) {
      setResults([])
      return
    }

    try {
      const users = await getUsers(search)
      const repos = await getRepos(search)

      // sort by aprox. with search term
      setResults([...users, ...repos].sort((a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        const searchName = search.toLowerCase()

        if (aName.includes(searchName) && bName.includes(searchName)) {
          return aName.length - bName.length
        }

        if (aName.includes(searchName)) {
          return -1
        }

        if (bName.includes(searchName)) {
          return 1
        }

        return 0
      }))
    } catch (err) {
      toast.error('An error occurred while searching for users and repositories.')
    }
  }

  const value = {
    results,
    handleSearch
  }

  return value
}
