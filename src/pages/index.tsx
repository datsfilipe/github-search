import type { NextPage } from 'next'
import Image from 'next/image'

import { ChangeEvent, useEffect, useState } from 'react';

import axios from 'axios';
import RSC from "react-scrollbars-custom";
import { ClickAwayListener } from '@material-ui/core';

import githubImg from '../assets/github.svg'

type ItemDisplayType = {
  id: number;
  name: string;
  url: string;
  isRepo: boolean;
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [displayList, setDisplayList] = useState(new Array);

  function handleClickItem (url: string) {
    window.open(url, '_blank');
  }

  function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  useEffect(() => {
    if (search.length >= 2) {
      const getSearch = async () => {
        var searchList: ItemDisplayType[] = new Array()
        let countRepo = 1
        let countUser = 2

        const githubRepos = await axios.get(`https://api.github.com/search/repositories?q=${search}`)
        const githubUsers = await axios.get(`https://api.github.com/search/users?q=${search}`)

        githubRepos.data.items.forEach((e: typeof githubRepos.data.items[1]) => {
          const item: ItemDisplayType = {
            name: e.name, 
        name: e.name, 
            name: e.name, 
            url: e.html_url,
            isRepo: true,
            id: countRepo
          }
          searchList.push(item)
          countRepo = countRepo + 2
        })

        githubUsers.data.items.forEach((e: typeof githubUsers.data.items[1]) => {
          const item: ItemDisplayType = {
            name: e.login, 
            url: e.html_url,
            isRepo: false,
            id: countUser
          }
          searchList.push(item)
          countUser = countUser + 2
        })

        var searchListSorted: ItemDisplayType[] = [];

        for (let i = 1; i <= 60; i++) {
          searchList.forEach((e: ItemDisplayType) => {
            if (e.id === i) {
              searchListSorted.push(e)
            }
          })
        }
        setDisplayList(searchListSorted)
      }

      getSearch()
    } else {
      setShow(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if(displayList.length > 1) {
      setShow(true)
    }
  }, [displayList.length])

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