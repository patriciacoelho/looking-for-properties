import { http, HttpResponse } from 'msw'
import listings from '@/api/data/listings'
import type { Listing } from '@/types/listing'

export const handlers = [
  http.get('/api/listings', () => {
    return HttpResponse.json(listings as Listing[])
  }),
]
