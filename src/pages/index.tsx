import type { NextPage } from 'next'
import Image from 'next/image'

import { ChangeEvent, useEffect, useState } from 'react';

import axios from 'axios';
import RSC from "react-scrollbars-custom";
import { ClickAwayListener } from '@material-ui/core';
import { Toaster, toast } from 'react-hot-toast'
import styles from '../styles/styles.module.scss';

import githubImg from '../assets/images/github.svg';

type ItemDisplayType = {
  id: number;
  name: string;
  url: string;
  isRepo: boolean;
}

type GithubRepoType = {
  data: {
    items: {name: string;
      html_url: string;}[];
  }
}

type GithubUserType = {
  data: {
    items: {login: string;
      html_url: string;}[];
  }
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

        const githubRepos: GithubRepoType | void = await axios.get(`https://api.github.com/search/repositories?q=${search}`).catch(err => {
          toast.error(err.message)
        })
        const githubUsers: GithubUserType | void = await axios.get(`https://api.github.com/search/users?q=${search}`).catch(err => {
          toast.error(err.message)
        })

        if (githubRepos) {
          githubRepos.data.items.forEach((e: typeof githubRepos.data.items[1]) => {
            const item: ItemDisplayType = {
              name: e.name, 
              url: e.html_url,
              isRepo: true,
              id: countRepo
            }
            searchList.push(item)
            countRepo = countRepo + 2
          })
        }

        if (githubUsers) {
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
        }

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
    setShow(false);
    setDisplayList([])
  }
  
  // debounce with useMemo hook instead of useCallback hook
  const debounceSearch = useMemo(() => debounce(searchValue => handleSearch(searchValue), 500), [])

  return (
    // ignoring cause it's the right way to use, but ts warns wrong anyway
    // @ts-ignore
    <RSC style={{ position: '', width: "75%", height: "60%" }}>{
      <div className={styles.container} >
        <Toaster/>
        <h2 className={styles.headerText}>GitHub Search</h2>
        <p className={styles.subtext}>Search list style is: first repo, first user, in sequence...</p>
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
          >
          <div>
            <div className={`${show ? styles.hasBottomContent : ''}  ${styles.search}`}>
              <button className={`${styles.searchIcon} ${styles.button}`} type="submit" >
                <Image src={githubImg} alt="GitHub" height="28" width="28"></Image>
              </button>
              <input
                className={styles.input}
                autoComplete="off"
                type="text"
                value={search}
                onChange={handleInputChange}
              />
              <div className={`${show ? styles.show : ''}  ${styles.results}`}>
                <RSC>{
                  <ul className={styles.listContainer}>
                    {displayList.map(item => {
                      return (
                        <li className={styles.listItem} onClick={() => handleClickItem(item.url)} key={item.id}>
                          <p className={styles.itemId}>{item.id}.</p>
                          <p className={styles.itemName}>{item.name}</p>
                        </li>
                      )
                    })}
                  </ul> 
                }
                </RSC>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    }
    </RSC>
  )
}

export default Home