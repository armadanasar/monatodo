import authApi from '../dataFetch/authApi'

function Logout() {
  authApi.logout()
  window.location = '/'

  return null
}

export default Logout
