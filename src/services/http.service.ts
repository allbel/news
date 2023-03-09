import axios from 'axios'

const httpService = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/'
})

export default httpService
