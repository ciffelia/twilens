import { FastifyPluginCallback } from 'fastify'
import fp from 'fastify-plugin'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { DeleteRequest } from '@twilens/types'

const pluginCallback: FastifyPluginCallback = (server, options, next) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  server.post('/delete', async (request, reply) => {
    const deleteRequest = plainToClass(DeleteRequest, request.body, {
      excludeExtraneousValues: true
    })

    const validationErrors = await validate(deleteRequest, {
      validationError: { target: false, value: false },
      forbidUnknownValues: true
    })
    if (validationErrors.length !== 0) {
      await reply.code(400).send(validationErrors)
      return
    }

    const user =
      deleteRequest.user != null && deleteRequest.user !== ''
        ? deleteRequest.user
        : undefined

    await server.prisma.tweet.deleteMany({
      where: { user }
    })

    await reply.send()
  })

  next()
}

export default fp(pluginCallback)
