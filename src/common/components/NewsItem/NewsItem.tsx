import React, { type FC } from 'react'
import { Link } from 'react-router-dom'
import s from './NewsItem.module.scss'
import { getDate } from '../../../utils/getDate'
import { type INews } from '../../../types'

const NewsItem: FC<INews> = ({ id, title, by, score, time, descendants }) => {
  return (
    <li className={s.item}>
      <Link to={`/news/${id}`}>
        <h3>{title}</h3>
        <div className={s.meta}>
          <div>
            <span className={s.name}>{by}</span> | <span>{score} {score > 1 ? 'points' : 'point'}</span> | <span>{descendants} {descendants === 1 ? 'comment' : 'comments'}</span>
          </div>
          <div>{getDate(time)}</div>
        </div>
      </Link>
    </li>
  )
}

export default NewsItem
