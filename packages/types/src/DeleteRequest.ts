import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

class DeleteRequest {
  @Expose()
  @IsOptional()
  @IsString()
  user?: string
}

interface IDeleteRequest {
  user?: string
}

export { DeleteRequest, IDeleteRequest }
