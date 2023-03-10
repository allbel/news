import React, { type FC, useEffect, useState } from 'react'
import s from './CommentsList.module.scss'
import { type IComment, type Id } from '../../../types'
import CommentItem from '../CommentItem/CommentItem'
import Loader from '../Loader/Loader'
import newsService from '../../../services/news.service'
import { type AxiosError } from 'axios/index'

const CommentsList: FC<{ kids: Id[] }> = ({ kids }) => {
  const [comments, setComments] = useState<IComment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const getComments = async (kids: Id[]) => {
    try {
      setIsLoading(true)
      if (error !== '') {
        setError('')
      }
      const commentsPromises = kids.map(async (id: number) => await newsService.getItemById(id))
      const comments = await Promise.all(commentsPromises)
      setComments(comments)
    } catch (e) {
      const error = e as Error | AxiosError
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void getComments(kids)
  }, [kids])

  return (
    <div className={s.list}>
      {isLoading && <Loader/>}
      {error && <div className="error">{error}</div>}
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
