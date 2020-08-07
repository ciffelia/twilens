import { Client } from '@elastic/elasticsearch'

declare module 'fastify' {
  interface FastifyInstance {
    elastic: Client
  }
}
