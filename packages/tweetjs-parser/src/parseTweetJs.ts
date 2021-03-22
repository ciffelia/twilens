import { deserializeArray } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Tweet } from '@twilens/types'
import { WrappedRawTweet } from './WrappedRawTweet'

const parseTweetJs = async (
  tweetJs: string,
  user: string
): Promise<Tweet[]> => {
  if (!tweetJs.startsWith('window.YTD.tweet.part')) {
    throw new Error('Unsupported tweet.js format')
  }

  const wrappedRawTweets: WrappedRawTweet[] = deserializeArray(
    WrappedRawTweet,
    tweetJs.slice(25),
    { excludeExtraneousValues: true }
  )

  await validateOrReject(wrappedRawTweets)

  return wrappedRawTweets
    .map((wrapped) => wrapped.tweet)
    .filter((rawTweet) => !rawTweet.isRetweet())
    .map((rawTweet) => rawTweet.toTweet(user))
}

export { parseTweetJs }
