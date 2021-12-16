import {combineReducers} from 'redux'
import authReducer from '../reducers/authReducer'
import tokenReducer from '../reducers/tokenReducer'
import usersReducer from '../reducers/usersReducer'
import productsReducer from '../reducers/productsReducer'
import historyReducer from '../reducers/historyReducer'
import historiesReducer from './historiesReducer'
import categoriesReducer from './categoriesReducer'


const rootReducer = combineReducers({
      authReducer,
      tokenReducer,
      usersReducer,
      productsReducer,
      historyReducer,
      historiesReducer,
      categoriesReducer
})

export default rootReducer