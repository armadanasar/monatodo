import { API_URL, JWT_TOKEN_KEY } from './apiSettings'
import auth from './auth'

const getUserTodos = async (searchQuery, filterSelection) => {
  try {
    const result = await fetch(
      `${API_URL}/todo/user?` +
        new URLSearchParams({
          filter: filterSelection || 'all',
          q: searchQuery || ''
        }),
      {
        method: 'get',
        headers: {
          Authorization: auth.getToken(),
          'Content-Type': 'application/json'
        },
        qs: {}
      }
    )

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
        Authorization: auth.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        priority,
        note
      })
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
        Authorization: auth.getToken(),
        'Content-Type': 'application/json'
      }
    })

    if (result.status !== 200) throw new Error('failed to get todo')
    return result
  } catch (err) {
    throw err
  }
}

const updateUserTodo = async (todoId, { title, priority, note }) => {
  try {
    const result = await fetch(`${API_URL}/todo/${todoId}`, {
      method: 'put',
      headers: {
        Authorization: auth.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        priority,
        note
      })
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
        Authorization: auth.getToken(),
        'Content-Type': 'application/json'
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
