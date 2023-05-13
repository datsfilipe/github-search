import { type ChangeEvent, useState, useEffect } from 'react'
import { useSearch } from '@/hooks/useSearch'
import { ResultsContainer } from '@/components/resultsContainer'
import ghLogo from '@/assets/github.svg'
import { toast } from 'react-hot-toast'

type Result = Omit<User, 'login'> & {
  name: string
} | Repository

export const Page = () => {
  const [search, setSearch] = useState('')
  const { handleSearch, results } = useSearch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
  const timeout = setTimeout(() => {
    handleSearch(search).catch((error) => {
      console.error(error)
    })
  }, 500)

    return () => clearTimeout(timeout)
  }, [search])

  return (
    <div className={results.length > 0 ? 'w-full -translate-y-40 transition-transform duration-200 ease-in-out' : 'w-full transition-transform duration-200 ease-in-out'}>
      <h2 className="mx-auto w-fit font-bold text-6xl mb-10">GitHub Search</h2>
      <div className="flex items-center rounded-lg bg-zinc-200 max-w-3xl sm:max-w-4/6 mx-auto overflow-hidden">
        <button
          className="text-xl px-4 py-2 bg-zinc-300 hover:bg-zinc-400 transition-colors duration-300 ease-in-out text-neutral-900"
          onClick={() => { 
            if (search === '') toast.error('Please enter a search term')

            handleSearch(search).catch((error) => {
              console.error(error)
            })
          }}
        >
          <img src={ghLogo} alt="GitHub Logo" className="w-6 h-6 inline-block text-neutral-300" />
        </button>
        <input
          className="bg-transparent w-full p-2 text-neutral-900"
          placeholder="Search in GitHub"
          autoComplete="off"
          type="text"
          value={search}
          onChange={handleChange}
        />
      </div>
      <div className="relative max-w-3xl sm:max-w-4/6 mx-auto">
        <ResultsContainer
          results={results as unknown as Result[]}
        />
      </div>
    </div>
  )
}
