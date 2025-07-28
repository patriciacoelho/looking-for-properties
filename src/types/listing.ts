export interface Listing {
  id: number
  address: string
  price: number
  description: string
  status: 'available' | 'sold' | 'under_contract'
}
