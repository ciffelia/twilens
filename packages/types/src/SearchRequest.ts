import { Expose, Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator'
import { IsItemsPerPage } from './IsItemsPerPage'

type SortKey = 'createdAt' | 'retweets' | 'likes'

type SortOrder = 'asc' | 'desc'

class SearchRequest {
  @Expose()
  @IsOptional()
  @IsString()
  query?: string

  @Expose()
  @IsOptional()
  @IsString()
  user?: string

  @Expose()
  @IsOptional()
  @IsString()
  source?: string

  @Expose()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page!: number

  @Expose()
  @Type(() => Number)
  @IsItemsPerPage()
  itemsPerPage!: number

  @Expose()
  @IsIn(['createdAt', 'retweets', 'likes'])
  sortKey!: SortKey

  @Expose()
  @IsIn(['asc', 'desc'])
  sortOrder!: SortOrder
}

interface ISearchRequest {
  query?: string
  user?: string
  source?: string
  page: number
  itemsPerPage: number
  sortKey: SortKey
  sortOrder: SortOrder
}

export { SortKey, SortOrder, SearchRequest, ISearchRequest }
