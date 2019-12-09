import { SET_TODO } from './todoTypes'

const initialState = []

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODO:
      return action.payload
    default:
      return state
  }
}

export default todoReducer
