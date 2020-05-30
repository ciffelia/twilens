interface TweetRecord {
  _id: string

  user: string
  created_at: number
  url: string
  text: string
  source: string
  retweet_count: number
  like_count: number
}

export { TweetRecord }
