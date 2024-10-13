import elements from '@/server/constants/elements.json' assert { type: 'json' }

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const element = elements.find((e) => e.id === Number(id))

  if (!element) {
    throw createError({
      status: 404,
      message: 'Character not found'
    })
  }

  return element
})
