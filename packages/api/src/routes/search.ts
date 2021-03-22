import { Prisma, Tweet } from '$/prisma'
import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { SearchRequest } from '@twilens/types'

const pluginCallback: FastifyPluginCallback = (server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.get('/search', async (request, reply) => {
    const searchRequest = plainToClass(SearchRequest, request.query, {
      excludeExtraneousValues: true
    })

    const validationErrors = await validate(searchRequest, {
      validationError: { target: false, value: false },
      forbidUnknownValues: true
    })
    if (validationErrors.length !== 0) {
      await reply.code(400).send(validationErrors)
      return
    }

    const queryCondition =
      searchRequest.query != null && searchRequest.query !== ''
        ? Prisma.sql`AND "text" &@~ ${searchRequest.query}`
        : Prisma.empty

    const userCondition =
      searchRequest.user != null && searchRequest.user !== ''
        ? Prisma.sql`AND "user" = ${searchRequest.user}`
        : Prisma.empty

    const sourceCondition =
      searchRequest.source != null && searchRequest.source !== ''
        ? Prisma.sql`AND "source" = ${searchRequest.source}`
        : Prisma.empty

    const sort = Prisma.sql([
      `ORDER BY "${searchRequest.sortKey}" ${searchRequest.sortOrder}`
    ])

    const itemsPerPage = searchRequest.itemsPerPage
    const offset = itemsPerPage * (searchRequest.page - 1)
    const page =
      itemsPerPage === -1
        ? Prisma.empty
        : Prisma.sql`LIMIT ${itemsPerPage} OFFSET ${offset}`

    const [{ count }] = await server.prisma
      .$queryRaw`SELECT COUNT(*) FROM "Tweet" WHERE 1=1 ${queryCondition} ${userCondition} ${sourceCondition};`

    const tweets: Tweet[] = await server.prisma
      .$queryRaw`SELECT * FROM "Tweet" WHERE 1=1 ${queryCondition} ${userCondition} ${sourceCondition} ${sort} ${page};`

    return {
      count,
      tweets
    }
  })

  next()
}

export default fp(pluginCallback)
