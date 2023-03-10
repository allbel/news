import React, { type FC, useState } from 'react'
import s from './CommentItem.module.scss'
import { getDate } from '../../../utils/getDate'
import { type IComment } from '../../../types'
import CommentsList from '../CommentsList/CommentsList'

const CommentItem: FC<IComment> = ({ text, time, by, kids }) => {
  const [showComment, setShowComment] = useState(true)
  const [showChildComments, setShowChildComments] = useState(false)

  const finalText = { __html: text }
  return (
    <div className={s.item}>
      <div className={s.meta}>
        <span
          className={s.toggle}
          onClick={() => { setShowComment(!showComment) }}
        >
          {showComment ? '▲' : '▼'}
        </span> | <span>{getDate(time)}</span> | <span className={s.name}>{by}</span> {kids &&
          <> | [ <span
              className={s.more}
              onClick={() => { setShowChildComments(!showChildComments) }}
            >{showChildComments
              ? '–'
              : String(kids.length) + ' more'
            }</span> ]
          </>
        }
      </div>
      {showComment && <div className={s.text} dangerouslySetInnerHTML={finalText} />}
      {showChildComments && <CommentsList kids={kids}/>}
    </div>
  )
}

export default CommentItem
