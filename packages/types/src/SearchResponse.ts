import { Tweet } from './Tweet'
import { Expose, Type } from 'class-transformer'

class SearchResponse {
  @Expose()
  count!: number

  @Expose()
  @Type(() => Tweet)
  tweets!: Tweet[]
}

interface ISearchResponse {
  count: number
  tweets: Tweet[]
}

export { SearchResponse, ISearchResponse }
