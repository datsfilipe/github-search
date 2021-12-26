import type { NextPage } from 'next'
import Image from 'next/image'

import { ChangeEvent, useMemo, useState } from 'react';
import RSC from "react-scrollbars-custom";
import { ClickAwayListener, debounce } from '@material-ui/core';
import { Toaster } from 'react-hot-toast'
import { ResultsContainer } from '../components/ResultsContainer';
import { useSearch } from '../hooks/useSearch';

import styles from '../styles/styles.module.scss';

import githubImg from '../assets/images/github.svg';
import { Result } from '../types';

const Home: NextPage = () => {
  const { handleSearch, results, show, setShow } = useSearch()
  const [search, setSearch] = useState('');

  function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    debounceSearch(event.target.value)
  }

  const handleClickAway = () => {
    setShow(false);
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
                  <ResultsContainer results={results} /> 
                }</RSC>
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