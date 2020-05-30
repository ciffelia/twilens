import { SearchResult, TweetRecord } from '@twilens/types'

const parseSearchResult = (rawSearchResult: any): SearchResult => {
  const hits = rawSearchResult.hits

  const count = hits.total.value
  const tweets: TweetRecord[] = hits.hits.map((hit: any) => ({
    _id: hit._id,
    ...hit._source
  }))

  return { count, tweets }
}

export { parseSearchResult }
