import { combineReducers } from 'redux'
import { todoReducers } from './reducers' // Import Action type

const rootReducers = combineReducers({
  todoReducers,
})

export default rootReducers
export type RootState = ReturnType<typeof rootReducers>
