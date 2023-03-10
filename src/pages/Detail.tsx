import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import NewsDetail from '../common/components/NewsDetail/NewsDetail'

const Detail = () => {
  const params = useParams<'id'>()
  const idNumber = Number(params.id)

  if (!idNumber) {
    return <Navigate to="/" />
  }

  return (
    <NewsDetail id={idNumber}/>
  )
}

export default Detail
