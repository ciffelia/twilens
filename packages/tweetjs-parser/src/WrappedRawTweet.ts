import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { RawTweet } from './RawTweet'

class WrappedRawTweet {
  @Expose()
  @Type(() => RawTweet)
  @ValidateNested()
  tweet!: RawTweet
}

export { WrappedRawTweet }
