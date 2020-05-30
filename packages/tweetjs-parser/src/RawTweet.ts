interface RawTweet {
  id_str: string
  created_at: string
  entities: any[]
  full_text: string
  source: string
  retweet_count: number
  favorite_count: number
}

type RawTweetList = Array<{
  tweet: RawTweet
}>

export { RawTweet, RawTweetList }
