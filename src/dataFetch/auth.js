import {API_URL, JWT_TOKEN_KEY} from './apiSettings'


const registerUser = (name, email, password) => {
    try {
        let result = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            body: {
                name,
                email,
                password
            }
        })

        if (result.status !== 200) throw new Error("error registering")

        return result
    } catch(err) {
        throw err
    }
}



const loginUser = (email, password) => {
    try {
        let result = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            body: {
                email,
                password
            }
        })
        if (result.status !== 200) throw new Error("error registering")
        
        return result
    } catch(err) {
        throw err
    }
}

const getToken = () => {
    return (localStorage.getItem(JWT_TOKEN_KEY) || null)    
}

const setToken = (jwtToken) => {
    localStorage.setItem(JWT_TOKEN_KEY, jwtToken)
}

const authUser = (email ,password) => {
    let authToken = getToken()
    
    if (!authToken) {
        let authResult = await loginUser(email, password)
        authResult = authResult.json()

        authToken = authResult.jwt    
    }

    return authToken
}
export default {
    registerUser,
    loginUser,
    authUser,
    setToken,
    getToken
}