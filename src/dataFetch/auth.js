import { API_URL, JWT_TOKEN_KEY } from './apiSettings'

const registerUser = async (name, email, password) => {
  try {
    let result = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    return result.json()
  } catch (err) {
    throw err
  }
}

const loginUser = async (email, password) => {
  try {
    let result = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    return result.json()
  } catch (err) {
    throw err
  }
}

const getToken = () => {
  return localStorage.getItem(JWT_TOKEN_KEY) || null
}

const setToken = jwtToken => {
  localStorage.setItem(JWT_TOKEN_KEY, jwtToken)
}

const logout = () => {
  localStorage.removeItem(JWT_TOKEN_KEY)
}
export default {
  registerUser,
  loginUser,
  setToken,
  getToken,
  logout
}
