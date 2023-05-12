import { useEffect, useRef, useState } from 'react'

type Result = Omit<User, 'login'> & {
  name: string
} | Repository

type ResultsContainerProps = {
  results: Result[]
  barFocused: boolean
}

const Result = ({ result }: { result: Result }) => {
  const isRepository = result.html_url.split('/').length === 5

  return (
    <div
      className='flex items-center justify-between px-4 py-2 border-b color-zinc-950 border-zinc-300 hover:bg-zinc-300 transition-colors duration-300 ease-in-out overflow-hidden'
    >
      <p>{result.name}</p>
      <p className='text-gray-600'>{isRepository ? '[repository]' : '[user]'}</p>
    </div>
  )
}

export const ResultsContainer = ({ results, barFocused }: ResultsContainerProps) => {
  const resultsContainerRef = useRef<HTMLDivElement>(null)
  const [showResults, setShowResults] = useState<boolean>(false)

  useEffect(() => {
    if (results.length > 0 && barFocused) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [results, barFocused])

  return (
    <div
      ref={resultsContainerRef}
      style={{ display: showResults ? 'block' : 'none' }}
      className='absolute top-4 rounded-lg bg-zinc-200 w-full overflow-y-scroll max-h-xs z-10'
    >
      {results.map((result) => (
        <Result key={result.id} result={result} />
      ))}
    </div>
  )
}
