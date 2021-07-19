import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const pluginCallback: FastifyPluginCallback = (server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.get('/stats', async (request, reply) => {
    const count = await server.prisma.tweet.count()

    const userStats = await server.prisma.tweet.groupBy({
      by: ['user'],
      _count: {
        user: true
      },
      orderBy: {
        _count: {
          user: 'desc'
        }
      }
    })

    const sourceStats = await server.prisma.tweet.groupBy({
      by: ['source'],
      _count: {
        source: true
      },
      orderBy: {
        _count: {
          source: 'desc'
        }
      }
    })

    return {
      count,
      users: userStats.map(({ user, _count }) => ({
        name: user,
        count: _count.user
      })),
      sources: sourceStats.map(({ source, _count }) => ({
        name: source,
        count: _count.source
      }))
    }
  })

  next()
}

export default fp(pluginCallback)
