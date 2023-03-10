import React, { type FC, useEffect, useState } from 'react'
import s from './CommentsList.module.scss'
import { type IComment, type Id } from '../../../types'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import CommentItem from '../CommentItem/CommentItem'
import { getCommentsTC } from '../../../store/news-reducer'

const CommentsList: FC<{ kids: Id[] }> = ({ kids }) => {
  const [comments, setComments] = useState<IComment[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    dispatch(getCommentsTC(kids))
      // @ts-expect-error
      .then((res: IComment[]) => { setComments(res) })
  }, [])

  return (
    <div className={s.list}>
      {comments.map(comment =>
        <CommentItem
          key={comment.id}
          {...comment}
        />
      )}
    </div>
  )
}

export default CommentsList
