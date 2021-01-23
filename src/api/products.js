import httpClient from './httpClient'

const resourceEndPoint = '/products'

export const searchProducts = payload =>
  httpClient.get(`${resourceEndPoint}/search`, payload)
