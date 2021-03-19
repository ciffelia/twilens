import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'

const pluginCallback: FastifyPluginCallback = (server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.post<{
    Body: string
  }>('/bulk', async (request, reply) => {
    await server.elastic.bulk(
      {
        index: 'tweets',
        body: request.body
      },
      {
        requestTimeout: '1h'
      }
    )

    // 202 Accepted
    await reply.code(202).send()
  })

  next()
}

export default fp(pluginCallback)
