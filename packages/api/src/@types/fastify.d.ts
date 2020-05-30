import http from 'http'
import { Client } from '@elastic/elasticsearch'

declare module 'fastify' {
  export interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, HttpResponse = http.ServerResponse> {
    elastic: Client
  }
}
