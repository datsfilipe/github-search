import type { NextPage } from 'next'
import Image from 'next/image'

import { ChangeEvent, useEffect, useState } from 'react';

import axios from 'axios';
import RSC from "react-scrollbars-custom";
import { ClickAwayListener } from '@material-ui/core';

import githubImg from '../assets/github.svg'


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

  return (
    // ignoring cause it's the right way to use, but ts warns wrong anyway
    // @ts-ignore
    <RSC style={{ position: '', width: "75%", height: "60%" }}>{
      <div className="container" >
        <h2>GitHub Search</h2>
        <p>the search prioritizes the repositories</p>
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
          >
          <div id="clickable-content">
            <form onSubmit={handleSearch}>
              <button className="search-icon" type="submit" >
                <Image src={githubImg} alt="GitHub" height="28" width="28"></Image>
              </button>
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
              />
            </form>
            <div className={`${showList ? 'show' : ''} results`}>
              <RSC>{
                <ul>
                  {displayList.map(item => {
                    return (
                      <li onClick={() => handleClickItem(item.url)} key={item.id}>
                        {item.id}. {item.name}
                      </li>
                    )
                  })}
                </ul> 
                } 
              </RSC>
            </div>
          </div>
        </ClickAwayListener>
        <p>tip: for now, to research, click outside of clickable content</p>
        <footer>
        <a target="_blank" rel="noreferrer noopener" href="https://iconscout.com/icons/github">Github Icon</a> on <a target="_blank" rel="noreferrer noopener" href="https://iconscout.com">Iconscout</a>
        </footer>
      </div>
    }
    </RSC>
  )
}

export default Home