import axios from 'axios';
import type { NextPage } from 'next'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import RSC from "react-scrollbars-custom";
import githubImg from '../src/assets/github.svg'


const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);
  const [displayList, setDisplayList] = useState(new Array);

  function handleClickItem (url: string) {
    window.open(url, '_blank');
  }

  function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  async function handleSearch (event: FormEvent) {
    event.preventDefault()

    const repoResults = await axios.get(`https://api.github.com/search/repositories?q=${search}`)
    const userResults = await axios.get(`https://api.github.com/search/users?q=${search}`)
    var searchList = new Array()
    repoResults.data.items.forEach((e: typeof repoResults.data.items[1]) => {
      const item = {
        name: e.name, 
        url: e.html_url
      }
      searchList.push(item)
    })
    userResults.data.items.forEach((e: typeof userResults.data.items[1]) => {
      const item = {
        login: e.login, 
        url: e.html_url
      }
      searchList.push(item)
    })

    var count = 1;

    searchList.forEach((e) => {
      const item = {
        name: e.login || e.name,
        url: e.url,
        id: count
      }
      count ++;
      displayList.push(item);
      setDisplayList(displayList);
    })

    setShowList(true)
  }

  const handleClickAway = () => {
    setShowList(false);
    setDisplayList([])
  }

          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
