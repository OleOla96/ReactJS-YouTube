import axios from 'axios'
import { http } from '../common/http'

const signIn = (username, password) => {
  return axios.post(http + 'auth/signin', { username, password })
}

const signUp = (username, email, password) => {
  return axios.post(http + 'auth/signup', { username, email, password })
}

const AuthSevice = {
  signIn,
  signUp,
}

export default AuthSevice
