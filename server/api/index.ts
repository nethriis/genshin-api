export default defineEventHandler(async () => ({
  characters: 'https://teyvat-dev.vercel.app/api/characters',
  weapons: 'https://teyvat-dev.vercel.app/api/weapons',
  materials: 'https://teyvat-dev.vercel.app/api/materials',
  nations: 'https://teyvat-dev.vercel.app/api/nations',
  elements: 'https://teyvat-dev.vercel.app/api/elements'
}))
