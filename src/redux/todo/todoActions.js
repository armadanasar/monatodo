import { SET_TODO } from './todoTypes'

export const setTodo = todos => {
  return {
    type: SET_TODO,
    payload: todos
  }
}
