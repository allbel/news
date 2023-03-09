import httpService from './http.service'

const newsService = {
  async getNewsId (limit: number = 100) {
    return await httpService.get(`newstories.json?print=pretty&orderBy="$key"&limitToFirst=${limit}`)
      .then(res => res.data)
  },
  async getNewsById (id: number) {
    return await httpService.get(`item/${id}.json?print=pretty`)
      .then(res => res.data)
  }
}

export default newsService
