if (process.env.PORT == null) {
  throw new Error('PORT is not set.')
}
export const port = parseInt(process.env.PORT)

if (process.env.TWILENS_CORS_ORIGIN == null) {
  throw new Error('TWILENS_CORS_ORIGIN is not set.')
}
export const corsOrigin = process.env.TWILENS_CORS_ORIGIN

if (process.env.TWILENS_ELASTICSEARCH_NODE == null) {
  throw new Error('TWILENS_ELASTICSEARCH_NODE is not set.')
}
export const elasticsearchNode = process.env.TWILENS_ELASTICSEARCH_NODE
