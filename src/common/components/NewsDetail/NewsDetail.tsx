import React, { type FC, useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getNewsItemTC } from '../../../store/news-reducer'
import s from './NewsDetail.module.scss'
import { getDate } from '../../../utils/getDate'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import CommentsList from '../CommentsList/CommentsList'

const NewsDetail: FC<{ id: number }> = ({ id }) => {
  const newsItem = useAppSelector(state => state.news.item)
  const isLoading = useAppSelector(state => state.news.isLoading)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getNewsItemTC(id))
  }, [])

  return (
    <div>
      <div className={s.boxButton}>
        <Button
          onClick={() => { navigate(-1) }}
        >
          ← Back
        </Button>
        <Button
          onClick={() => { dispatch(getNewsItemTC(id)) }}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>
      <div className={s.detail}>
        <h1>{newsItem.title}</h1>
        <div className={s.link}>
          Link: <a href={newsItem.url} target="_blank" rel="noreferrer">{newsItem.url}</a>
        </div>
        <div className={s.meta}>
          <div>
            <span className={s.name}>{newsItem.by}</span> | <span>{newsItem.descendants} {newsItem.descendants === 1 ? 'comment' : 'comments'} </span>
          </div>
          <div> {getDate(newsItem.time)}</div>
        </div>
      </div>
      <div className={s.comments}>
        {newsItem.descendants > 0
          ? <CommentsList kids={newsItem.kids}/>
          : <span>No comments</span>
        }
      </div>
    </div>
  )
}

export default NewsDetail
