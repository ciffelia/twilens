import fp from 'fastify-plugin'

export default fp((server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.post('/bulk', async (request, reply) => {
    await server.elastic.bulk({
      index: 'tweets',
      body: request.body
    }, {
      requestTimeout: '1h'
    })

    reply.send()
  })

  next()
})
