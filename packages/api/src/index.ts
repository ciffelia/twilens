import 'make-promises-safe'
import fastify from 'fastify'
import fastifySensible from 'fastify-sensible'
import fastifyElasticsearch from 'fastify-elasticsearch'
import { port, elasticsearchNode } from './config'

import pingRoute from './routes/reset'
import searchRoute from './routes/search'
import uploadRoute from './routes/bulk'

const server = fastify({
  logger: true,
  bodyLimit: 104857600 // 100MiB
})

server.register(fastifySensible, {
  // Prevent Elasticsearch errors being hidden
  errorHandler: false
})
server.register(fastifyElasticsearch, {
  node: elasticsearchNode
})

server.register(pingRoute)
server.register(searchRoute)
server.register(uploadRoute)

server.addContentTypeParser('application/x-ndjson', { parseAs: 'string' }, (req, body, done) => {
  done(null, body)
})

server.listen(port, '0.0.0.0')
  .catch(err => {
    server.log.error(err)
    process.exit(1)
  })
