import { http, HttpResponse } from 'msw'
import listings from '@/api/data/listings'
import type { Listing } from '@/types/listing'

let currentListings = [...listings]

export const handlers = [
  http.get('/api/listings', () => {
    return HttpResponse.json(currentListings)
  }),

  http.post('/api/listings', async ({ request }) => {
    const newListing = (await request.json()) as Listing
    newListing.id = currentListings.length ? Math.max(...currentListings.map((l) => l.id)) + 1 : 1
    currentListings.push(newListing)
    return HttpResponse.json(newListing)
  }),

  http.put('/api/listings/:id', async ({ request, params }) => {
    const id = Number(params.id)
    const updated = (await request.json()) as Listing
    const index = currentListings.findIndex((l) => l.id === id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    currentListings[index] = updated
    return HttpResponse.json(updated)
  }),

  http.delete('/api/listings/:id', ({ params }) => {
    const id = Number(params.id)
    currentListings = currentListings.filter((l) => l.id !== id)
    return HttpResponse.json({ success: true })
  }),
]
