import httpClient from './httpClient'

const resourceEndPoint = '/products'

export const searchProducts = config =>
  httpClient.get(`${resourceEndPoint}/search`, config)
