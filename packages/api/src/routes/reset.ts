import fp from 'fastify-plugin'
import tweetsIndex from '../elasticsearch/tweetsIndex'

export default fp((server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.post('/reset', async (request, reply) => {
    await server.elastic.indices.delete({
      index: 'tweets'
    }, {
      ignore: [404]
    })

    await server.elastic.indices.create({
      index: 'tweets',
      body: tweetsIndex
    })

    // 204 No Content
    await reply
      .code(204)
      .send()
  })

  next()
})
