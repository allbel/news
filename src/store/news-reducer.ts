import { type AppActionsType, type AppThunkType } from './store'
import newsService from '../services/news.service'
import { type AxiosError } from 'axios'
import { type INews } from '../types'

const initState = {
  items: [] as INews[],
  isLoading: false,
  error: ''
}

type InitialStateType = typeof initState

const SET_NEWS = 'news/SET-NEWS'
const SET_IS_DISABLED = 'news/SET-IS-DISABLED'
const SET_ERROR = 'news/SET-ERROR'

export const newsReducer = (state: InitialStateType = initState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case SET_NEWS:
      return { ...state, items: action.items }
    case SET_IS_DISABLED:
      return { ...state, isLoading: action.value }
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

// actions
export const setNewsAC = (items: INews[]) =>
  ({ type: SET_NEWS, items } as const)

export const setIsLoadingAC = (value: boolean) =>
  ({ type: SET_IS_DISABLED, value } as const)

export const setErrorAC = (error: string) =>
  ({ type: SET_ERROR, error } as const)

export const getNewsTC = (): AppThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsLoadingAC(true))
      if (getState().news.error !== '') {
        dispatch(setErrorAC(''))
      }
      const newsId = await newsService.getNewsId(6)
      const newsPromises = newsId.map(async (id: number) => await newsService.getNewsById(id))
      const news = await Promise.all(newsPromises)
      dispatch(setNewsAC(news))
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
  | ReturnType<typeof setIsLoadingAC>
  | ReturnType<typeof setErrorAC>
