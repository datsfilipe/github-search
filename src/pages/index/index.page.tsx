import { type ChangeEvent, useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSearch } from '@/hooks/useSearch'
import { ResultsContainer } from '@/components/resultsContainer'

type Result = Omit<User, 'login'> & {
  name: string
} | Repository

export const Page = () => {
  const [search, setSearch] = useState('')
  const { handleSearch } = useSearch()
  const [barFocused, setBarFocused] = useState(false)

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
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Toaster/>
      <div className={barFocused ? 'w-full -translate-y-40 transition-transform duration-200 ease-in-out' : 'w-full transition-transform duration-200 ease-in-out'}>
        <h2 className="mx-auto w-fit font-bold text-6xl mb-10">GitHub Search</h2>
        <div className="flex items-center rounded-lg bg-zinc-200 max-w-3xl sm:max-w-4/6 mx-auto overflow-hidden">
          <button className="px-4 py-2 bg-zinc-300 hover:bg-zinc-400 transition-colors duration-300 ease-in-out text-neutral-900">
            Search
          </button>
          <input
            className="bg-transparent w-full p-2 text-neutral-900"
            placeholder="Search in GitHub"
            autoComplete="off"
            type="text"
            value={search}
            onChange={handleChange}
            onFocus={() => setBarFocused(true)}
            onBlur={() => setBarFocused(false)}
          />
        </div>
        <div className="relative max-w-3xl sm:max-w-4/6 mx-auto">
          <ResultsContainer
            results={results as unknown as Result[]}
            barFocused={barFocused}
          />
        </div>
      </div>
    </main>
  )
}
