import { CREATE_NEW_USER } from '../actions/actionTypes'

// Reducers take an action, change the state according to the payload, and then return the new state
const userReducer = (state = {}, action) => {
  switch (action.type) {

    case CREATE_NEW_USER: {
      /* Example
      const { fName, lName, email } = action.payload
      const newState = { fName, lName, email }
      return newState
      */
      return state;
    }
    default:
      return state
  }
}

export default userReducer