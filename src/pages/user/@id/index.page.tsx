import { Link } from '@/components/Link'
import { type PageProps } from '@/renderer/types'

export const Page = (pageProps: PageProps) => {
  const user = pageProps?.user as GhUser

  return (
    <section className='max-w-4xl mx-auto w-full'>
      <Link className='text-2xl font-bold w-full hover:text-gray-400 transition-colors duration-300 ease-in-out' href='/'>
        GitHub Search
      </Link>
      <header className='flex mt-10 flex-col w-full p-6 rounded-4 bg-zinc-800'>
        <div className='flex items-center justify-evenly'>
          <a
            href={user.html_url}
            target='_blank'
            rel='noreferrer'
            className='rounded-full'
          >
            <img className='w-42 h-42 rounded-full' src={user.avatar_url} alt={user.name || user.login} />
          </a>
          <div className='flex flex-col space-y-2 items-center'>
            <a
              className='text-xl font-bold text-blue-500 hover:underline'
              href={user.html_url}
              target='_blank'
              rel='noreferrer'
            >
              github/{user.login}
            </a>
            {user.twitter_username ? <a
              className='text-xl font-bold text-blue-500 hover:underline'
              href={`https://twitter.com/${user.twitter_username}`}
              target='_blank'
              rel='noreferrer'
            >
              twitter/{user.twitter_username}
            </a> : null}
          </div>
        </div>
        <hr className='my-10 border-zinc-700' />
        <div className='flex flex-col items-center space-y-2 text-gray-400'>
          {user.company ? <span className='w-fit text-lg font-bold'>Company: {user.company}</span> : null}
          {user.hireable ? <span className='w-fit text-lg font-bold'>Hireable</span> : null}
          {user.email ? <span className='w-fit text-lg font-bold'>Email: {user.email}</span> : null}
          {user.location ? <span className='w-fit text-lg font-bold'>Location: {user.location}</span> : null}
          <span className='w-fit text-lg font-bold'>Followers: {user.followers}</span>
          <span className='w-fit text-lg font-bold'>Following: {user.following}</span>
          <span className='w-fit text-lg font-bold'>Public Repos: {user.public_repos}</span>
          <span className='w-fit text-lg font-bold'>Created at: {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          }).format(new Date(user.created_at))}</span>
        </div>
      </header>
    </section>
  )
}
