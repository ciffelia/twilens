import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { Tweet } from './Tweet'

class CreateRequest {
  @Expose()
  @Type(() => Tweet)
  @ValidateNested()
  tweets!: Tweet[]
}

interface ICreateRequest {
  tweets: Tweet[]
}

export { CreateRequest, ICreateRequest }
