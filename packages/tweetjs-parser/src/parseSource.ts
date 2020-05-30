import { TweetSource } from './TweetSource'

const parseSource = (source: string): TweetSource => {
  const match = source.match(
    /^<a href="(.+)" rel="nofollow">(.+)<\/a>$/
  )

  if (match == null) {
    throw new Error(`Invalid source string: ${source}`)
  }

  return {
    name: match[2],
    url: match[1]
  }
}

export { parseSource }
