import { type AppActionsType, type AppThunkType } from './store'
import newsService from '../services/news.service'
import { type AxiosError } from 'axios'
import { type Id, type INews } from '../types'

const initState = {
  items: [] as INews[],
  item: {} as INews,
  isLoading: false,
  error: ''
}

type InitialStateType = typeof initState

const SET_ITEMS = 'news/SET-ITEMS'
const SET_ITEM = 'news/SET-ITEM'
const SET_IS_LOADING = 'news/SET-IS-LOADING'
const SET_ERROR = 'news/SET-ERROR'

export const newsReducer = (state: InitialStateType = initState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: action.items }
    case SET_ITEM:
      return { ...state, item: action.item }
    case SET_IS_LOADING:
      return { ...state, isLoading: action.value }
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

// actions
export const setNewsAC = (items: INews[]) =>
  ({ type: SET_ITEMS, items } as const)

export const setNewsItemAC = (item: INews) =>
  ({ type: SET_ITEM, item } as const)

export const setIsLoadingAC = (value: boolean) =>
  ({ type: SET_IS_LOADING, value } as const)

export const setErrorAC = (error: string) =>
  ({ type: SET_ERROR, error } as const)

export const getNewsTC = (): AppThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoadingAC(true))
      if (getState().news.error !== '') {
        dispatch(setErrorAC(''))
      }
      const newsId = await newsService.getNewsId()
      const newsPromises = newsId.map(async (id: number) => await newsService.getItemById(id))
      const news = await Promise.all(newsPromises)
      dispatch(setNewsAC(news))
    } catch (e) {
      const error = e as Error | AxiosError
      dispatch(setErrorAC(error.message))
    } finally {
      dispatch(setIsLoadingAC(false))
    }
  }

export const getNewsItemTC = (id: number): AppThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoadingAC(true))
      if (getState().news.error !== '') {
        dispatch(setErrorAC(''))
      }
      const newsItem = await newsService.getItemById(id)
      dispatch(setNewsItemAC(newsItem))
    } catch (e) {
      const error = e as Error | AxiosError
      dispatch(setErrorAC(error.message))
    } finally {
      dispatch(setIsLoadingAC(false))
    }
  }

export const getCommentsTC = (commentsId: Id[]): AppThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoadingAC(true))
      if (getState().news.error !== '') {
        dispatch(setErrorAC(''))
      }
      const commentsPromises = commentsId.map(async (id: number) => await newsService.getItemById(id))
      const comments = await Promise.all(commentsPromises)
      return comments
    } catch (e) {
      const error = e as Error | AxiosError
      dispatch(setErrorAC(error.message))
    } finally {
      dispatch(setIsLoadingAC(false))
    }
  }

// types
export type NewsActionsType =
  | ReturnType<typeof setNewsAC>
  | ReturnType<typeof setNewsItemAC>
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setErrorAC>
