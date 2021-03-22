if (process.env.PORT == null) {
  throw new Error('PORT is not set.')
}
export const port = parseInt(process.env.PORT)
