import fp from 'fastify-plugin'

export default fp((server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.post<{
    Body: {}
  }>('/search', async (request, reply) => {
    const searchResult = await server.elastic.search({
      index: 'tweets',
      body: request.body
    })

    return searchResult.body
  })

  next()
})
