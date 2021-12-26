import { Result } from "../../types";

import styles from './styles.module.scss'

interface ResultsContainerProps {
  results: Result[];
}

export function ResultsContainer ({ results }: ResultsContainerProps) {
  let count: number = 0

  function handleClickItem (url: string) {
    window.open(url, '_blank');
  }

  try {
    return (
      <ul className={styles.listContainer}>
        { results.map(result => {
          count ++

          return (
            <li className={styles.listItem} onClick={() => handleClickItem(result.url)} key={count}>
              <p className={styles.itemId}>{count}.</p>
              <p className={styles.itemName}>{result.name}</p>
            </li>
          )
        }) }
      </ul>
    )
  } catch (err) {
    console.log(err)
    return <></>
  }
}