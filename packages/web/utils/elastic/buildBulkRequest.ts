import { TweetRecord } from '@twilens/types'

const buildBulkQuery = (tweetList: TweetRecord[]): string[] => {
  const chunkList: string[] = []
  let currentChunk = ''

  for (const [i, tweet] of tweetList.entries()) {
    const { _id, ...fields } = tweet

    currentChunk += JSON.stringify({
      index: { _id }
    }) + '\n'
    currentChunk += JSON.stringify(fields) + '\n'

    if (i % 100 === 99) {
      chunkList.push(currentChunk)
      currentChunk = ''
    }
  }

  chunkList.push(currentChunk)

  return chunkList
}

export { buildBulkQuery }
