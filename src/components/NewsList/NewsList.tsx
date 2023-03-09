import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getNewsTC } from '../../store/news-reducer'
import s from './NewsList.module.scss'
import NewsItem from '../NewsItem/NewsItem'

const NewsList = () => {
  const news = useAppSelector(state => state.news.items)
  const isLoading = useAppSelector(state => state.news.isLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getNewsTC())
    const timerId = setInterval(() => {
      dispatch(getNewsTC())
    }, 60 * 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div>
      <h1 className={s.title}>News</h1>
      <div className={s.boxButton}>
        <button
          className={s.button}
          onClick={() => { dispatch(getNewsTC()) }}
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>
      <ul className={s.list}>
        {news.map(item =>
          <NewsItem key={item.id} {...item}/>
        )}
      </ul>
    </div>
  )
}

export default NewsList
