import 'make-promises-safe'
import fastify, { FastifyRequest } from 'fastify'
import fastifySensible from 'fastify-sensible'
import fastifyElasticsearch from 'fastify-elasticsearch'
import { port, elasticsearchNode } from './config'

import resetRoute from './routes/reset'
import searchRoute from './routes/search'
import uploadRoute from './routes/bulk'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  const server = fastify({
    logger: true,
    bodyLimit: 104857600 // 100MiB
  })

  await server.register(fastifySensible, {
    // Prevent Elasticsearch errors being hidden
    errorHandler: false
  })
  await server.register(fastifyElasticsearch, {
    node: elasticsearchNode
  })

  await server.register(resetRoute)
  await server.register(searchRoute)
  await server.register(uploadRoute)

  server.addContentTypeParser(
    'application/x-ndjson',
    { parseAs: 'string' },
    async function (request: FastifyRequest, payload: string) {
      return payload
    }
  )

  await server.listen(port, '0.0.0.0')
})()
