import moment from 'moment'
import { TweetRecord } from '@twilens/types'
import { RawTweetList } from './RawTweet'
import { extractShortenedUrl } from './extractShortenedUrl'
import { parseSource } from './parseSource'

const parseTweetJs = (tweetJs: string, screenName: string): TweetRecord[] => {
  const tweetJson = tweetJs.slice(25)
  const rawTweets: RawTweetList = JSON.parse(tweetJson)

  const parsedTweets: TweetRecord[] = []

  for (const { tweet } of rawTweets) {
    const isRetweet = tweet.full_text.startsWith('RT @')
    if (isRetweet) continue

    const createdAt = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY')
    const text = extractShortenedUrl(tweet.full_text, tweet.entities)
    const { name: source } = parseSource(tweet.source)

    parsedTweets.push({
      _id: tweet.id_str,
      user: screenName,
      created_at: createdAt.unix(),
      url: `https://twitter.com/${screenName}/status/${tweet.id_str}`,
      text,
      source,
      retweet_count: tweet.retweet_count,
      like_count: tweet.favorite_count
    })
  }

  return parsedTweets
}

export { parseTweetJs }
