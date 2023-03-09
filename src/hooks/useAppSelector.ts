import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import { type AppStateType } from '../store/store'

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
