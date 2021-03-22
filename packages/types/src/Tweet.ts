import { Expose } from 'class-transformer'
import {
  IsAscii,
  IsInt,
  IsISO8601,
  IsString,
  Min,
  MinLength
} from 'class-validator'

class Tweet {
  @Expose()
  @IsAscii()
  @MinLength(1)
  id!: string

  @Expose()
  @IsAscii()
  @MinLength(1)
  user!: string

  @Expose()
  @IsISO8601()
  createdAt!: string

  @Expose()
  @IsString()
  text!: string

  @Expose()
  @IsString()
  source!: string

  @Expose()
  @IsInt()
  @Min(0)
  retweets!: number

  @Expose()
  @IsInt()
  @Min(0)
  likes!: number
}

interface ITweet {
  id: string
  user: string
  createdAt: string
  text: string
  source: string
  retweets: number
  likes: number
}

export { Tweet, ITweet }
