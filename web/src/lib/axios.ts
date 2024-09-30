import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://104.131.30.232:3333',
})
