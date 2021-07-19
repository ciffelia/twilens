import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateRequest } from '@twilens/types'

const pluginCallback: FastifyPluginCallback = (server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.post('/create', async (request, reply) => {
    const createRequest = plainToClass(CreateRequest, request.body, {
      excludeExtraneousValues: true
    })

    const validationErrors = await validate(createRequest, {
      validationError: { target: false, value: false },
      forbidUnknownValues: true
    })
    if (validationErrors.length !== 0) {
      await reply.code(400).send(validationErrors)
      return
    }

    await server.prisma.tweet.createMany({
      data: createRequest.tweets
    })

    await reply.send()
  })

  next()
}

export default fp(pluginCallback)
