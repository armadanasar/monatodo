import auth from '../dataFetch/auth'

function Logout() {
  auth.logout()
  window.location = '/'

  return null
}

export default Logout
