import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { type NewsActionsType, newsReducer } from './news-reducer'
import thunk, { type ThunkAction, type ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
  news: newsReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
ReturnType,
AppStateType,
unknown,
AppActionsType
>

export type AppActionsType =
  | NewsActionsType

export default store
