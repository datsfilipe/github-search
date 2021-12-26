import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { User, Repository, Result } from '../types'


export function useSearch () {
  const [results, setResults] = useState<Result[]>([])
  const [show, setShow] = useState(false);

  // this will return our results array in that format:
  // { repo, user, repo, user, repo, ... }
  const shuffleArray = (array: Result[]) => {
    let newArray = []
    let count = (array.length / 2)

    for (let i = 0; i < array.length; i ++) {
      if ((i % 2) != 0) {
        newArray[i] = array[i] // if it's not pair
      } else {
        newArray[i] = array[count] // if it's pair
        newArray[count] = array[i]
        count ++
      }
    }
    
    return newArray;
  }

  const handleSearch = async (search: string) => {
    try {
      let newResults: Result[] = []

      newResults = [...newResults, ...((await axios.get(`https://api.github.com/search/users?q=${search}`)).data.items.map((item: User) => {
        return {
          id: item.id,
          name: item.login,
          url: item.html_url,
          isRepo: false
        }
      }))]

      newResults = [...newResults, ...((await axios.get(`https://api.github.com/search/repositories?q=${search}`)).data.items.map((item: Repository) => {
        return {
          id: item.id,
          name: item.name,
          url: item.html_url,
          isRepo: true
        }
      }))]

      setResults(shuffleArray(newResults))

      setShow(true)
    } catch(err: any) {
      setShow(false)

      toast.error(err.message, {
        style: {
          background: '#171717',
          color: '#e6e6e6',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.06)'
        }
      })
    }
  }

  const value = { handleSearch, results, show, setShow }

  return value
}