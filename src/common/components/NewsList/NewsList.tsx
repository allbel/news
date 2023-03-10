import React, { useEffect } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { getNewsTC } from '../../../store/news-reducer'
import s from './NewsList.module.scss'
import NewsItem from '../NewsItem/NewsItem'
import Button from '../Button/Button'
import Loader from '../Loader/Loader'

const NewsList = () => {
  const news = useAppSelector(state => state.news.items)
  const isLoading = useAppSelector(state => state.news.isLoadingItems)
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
    <>
      <h1 className={s.title}>News</h1>
      <div className={s.boxButton}>
        <Button
          onClick={() => { dispatch(getNewsTC()) }}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>
      <div>
        {isLoading
          ? <Loader/>
          : <ul className={s.list}>
            {news.map(item =>
              <NewsItem key={item.id} {...item}/>
            )}
          </ul>
        }
      </div>
    </>
  )
}

export default NewsList
