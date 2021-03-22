import { Expose, Transform, Type } from 'class-transformer'
import { IsAscii, IsDate, IsInt, Min, MinLength } from 'class-validator'
import { parse } from 'date-fns'
import { Tweet } from '@twilens/types'
import { TweetSource } from './TweetSource'
import { unescapeTweetText } from './unescapeTweetText'
import { expandShortenedUrl } from './expandShortenedUrl'

class RawTweet {
  @Expose({ name: 'id_str' })
  @IsAscii()
  @MinLength(1)
  id!: string

  @Expose({ name: 'created_at' })
  @Type(() => String)
  @Transform(
    ({ value }) => parse(value, 'EEE MMM dd HH:mm:ss xx yyyy', new Date()),
    { toClassOnly: true }
  )
  @IsDate()
  createdAt!: Date

  @Expose({ name: 'full_text' })
  @Type(() => String)
  @Transform(({ value }) => unescapeTweetText(value), {
    toClassOnly: true
  })
  @Transform(({ value, obj }) => expandShortenedUrl(value, obj.entities), {
    toClassOnly: true
  })
  text!: string

  @Expose()
  @Type(() => String)
  @Transform(({ value }) => new TweetSource(value), { toClassOnly: true })
  source!: TweetSource

  @Expose({ name: 'retweet_count' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  retweets!: number

  @Expose({ name: 'favorite_count' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  likes!: number

  isRetweet(): boolean {
    return this.text.startsWith('RT @')
  }

  toTweet(user: string): Tweet {
    const tweet = new Tweet()
    tweet.id = this.id
    tweet.user = user
    tweet.createdAt = this.createdAt.toISOString()
    tweet.text = this.text
    tweet.source = this.source.name
    tweet.retweets = this.retweets
    tweet.likes = this.likes

    return tweet
  }
}

export { RawTweet }
