// Imports

// App Imports
import {
  USERS_GET_LIST_REQUEST,
  USERS_GET_LIST_RESPONSE,
  USERS_GET_LIST_FAILURE
} from './actions'

// Crates list

// Initial State
const usersInitialState = {
  isLoading: false,
  error: null,
  users: []
}

// State
export const users = (state = usersInitialState, action) => {
  switch (action.type) {
    case USERS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case USERS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        users: action.users
      }

    case USERS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

