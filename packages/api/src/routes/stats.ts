import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const pluginCallback: FastifyPluginCallback = (server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.get('/stats', async (request, reply) => {
    const count = await server.prisma.tweet.count()
    const userStats = await server.prisma
      .$queryRaw`SELECT "user" AS "name", COUNT(*) FROM "Tweet" GROUP BY "user" ORDER BY count(*) DESC;`
    const sourceStats = await server.prisma
      .$queryRaw`SELECT "source" AS "name", COUNT(*) FROM "Tweet" GROUP BY "source" ORDER BY count(*) DESC;`

    return {
      count,
      users: userStats,
      sources: sourceStats
    }
  })

  next()
}

export default fp(pluginCallback)
