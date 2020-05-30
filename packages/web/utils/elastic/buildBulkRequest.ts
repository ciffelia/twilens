import { TweetRecord } from '@twilens/types'

const buildBulkQuery = (tweetList: TweetRecord[]): string => {
  let resultNdjson = ''

  for (const tweet of tweetList) {
    const { _id, ...fields } = tweet

    resultNdjson += JSON.stringify({
      index: { _id }
    }) + '\n'

    resultNdjson += JSON.stringify(fields) + '\n'
  }

  return resultNdjson
}

export { buildBulkQuery }
