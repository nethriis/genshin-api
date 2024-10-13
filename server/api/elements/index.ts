import elements from '@/server/constants/elements.json' assert { type: 'json' }

export default defineEventHandler(async () => elements)
