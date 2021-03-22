import { PrismaClient } from '$/prisma'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}
