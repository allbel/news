export type Id = number
export type Type = 'story' | 'comment'

export interface INews {
  by: string
  descendants: number
  id: number
  score: number
  text: string
  time: number
  title: string
  type: Type
  url: string
  kids: Id[]
}

export interface IComment {
  by: string
  id: number
  kids: Id[]
  parent: string
  text: string
  time: number
  type: Type
}
