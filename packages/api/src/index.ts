import 'make-promises-safe'
import 'reflect-metadata'
import { PrismaClient } from '$/prisma'
import fastify from 'fastify'
import fastifySensible from 'fastify-sensible'
import { port } from './config'

import createRoute from './routes/create'
import deleteRoute from './routes/delete'
import searchRoute from './routes/search'
import statsRoute from './routes/stats'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  const server = fastify({
    logger: true,
    bodyLimit: 104857600 // 100MiB
  })

  const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
  })
  server.decorate('prisma', prisma)

  await server.register(fastifySensible)

  await server.register(createRoute)
  await server.register(deleteRoute)
  await server.register(searchRoute)
  await server.register(statsRoute)

  await server.listen(port, '0.0.0.0')
})()
