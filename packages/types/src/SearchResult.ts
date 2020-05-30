import { TweetRecord } from './TweetRecord'

interface SearchResult {
  count: number
  tweets: TweetRecord[]
}

export { SearchResult }
