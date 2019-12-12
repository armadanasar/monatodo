import { API_URL, JWT_TOKEN_KEY } from './apiSettings'
import auth from './auth'

const getUserTodos = async query => {
  try {
    const result = await fetch(`${API_URL}/todo/user`, {
      method: 'get',
      headers: {
        Authorization: auth.getToken()
      }
    })

    if (result.status !== 200) throw new Error('failed to get todos')

    return result
  } catch (err) {
    throw err
  }
}

const createNewUserTodo = async ({ title, priority, note }) => {
  try {
    const result = await fetch(`${API_URL}/todo`, {
      method: 'post',
      headers: {
        Authorization: auth.getToken()
      },
      body: {
        title,
        priority,
        note
      }
    })

    if (result.status !== 200) throw new Error('failed to create todo')
    return result
  } catch (err) {
    throw err
  }
}

const getUserTodoById = async todoId => {
  try {
    const result = await fetch(`${API_URL}/todo/${todoId}`, {
      method: 'get',
      headers: {
        Authorization: auth.getToken()
      }
    })

    if (result.status !== 200) throw new Error('failed to get todo')
    return result
  } catch (err) {
    throw err
  }
}

const updateUserTodo = async (todoId, oldTodo, newTodo) => {
  try {
    const result = await fetch(`${API_URL}/todo/${todoId}`, {
      method: 'put',
      headers: {
        Authorization: auth.getToken()
      },
      body: {
        title: newTodo.title || oldTodo.title,
        priority: newTodo.priority || oldTodo.priority,
        note: newTodo.note || oldTodo.note
      }
    })

    if (result.status !== 200) throw new Error('failed to update todos')
    return result
  } catch (err) {
    throw err
  }
}

const deleteUserTodo = async todoId => {
  try {
    const result = await fetch(`${API_URL}/todo/${todoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: auth.getToken()
      }
    })

    if (result.status !== 200) throw new Error('failed to update todos')
    return result
  } catch (err) {
    throw err
  }
}

export default {
  getUserTodos,
  createNewUserTodo,
  getUserTodoById,
  updateUserTodo,
  deleteUserTodo
}
