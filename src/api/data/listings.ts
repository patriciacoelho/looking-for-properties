import type { Listing } from '@/types/listing'

const listings: Listing[] = [
  {
    id: 1,
    address: 'Rua das Palmeiras, 123 - São Paulo, SP',
    price: 250000,
    description: 'Spacious house with garden and garage.',
    status: 'available',
  },
  {
    id: 2,
    address: 'Avenida Brasil, 456 - Rio de Janeiro, RJ',
    price: 320000,
    description: 'Modern apartment close to the beach.',
    status: 'sold',
  },
  {
    id: 3,
    address: 'Rua Bahia, 789 - Salvador, BA',
    price: 180000,
    description: 'Cozy home near city center.',
    status: 'under_contract',
  },
  {
    id: 4,
    address: 'Rua XV de Novembro, 100 - Curitiba, PR',
    price: 275000,
    description: 'Charming apartment with balcony and city view.',
    status: 'available',
  },
  {
    id: 5,
    address: 'Avenida Boa Viagem, 2000 - Recife, PE',
    price: 450000,
    description: 'Luxury condo with ocean view and amenities.',
    status: 'sold',
  },
  {
    id: 6,
    address: 'Rua das Laranjeiras, 55 - Belo Horizonte, MG',
    price: 230000,
    description: 'Quiet house with backyard and two bedrooms.',
    status: 'under_contract',
  },
  {
    id: 7,
    address: 'Avenida Paulista, 1500 - São Paulo, SP',
    price: 500000,
    description: 'Stylish loft in the financial district.',
    status: 'available',
  },
  {
    id: 8,
    address: 'Rua Amazonas, 321 - Manaus, AM',
    price: 195000,
    description: 'Family home surrounded by nature.',
    status: 'available',
  },
  {
    id: 9,
    address: 'Rua das Flores, 888 - Florianópolis, SC',
    price: 360000,
    description: 'Beachfront apartment with three bedrooms.',
    status: 'sold',
  },
  {
    id: 10,
    address: 'Avenida Independência, 1010 - Porto Alegre, RS',
    price: 310000,
    description: 'Spacious flat near shopping and public transport.',
    status: 'under_contract',
  },
]

export default listings
