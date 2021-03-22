import { Expose } from 'class-transformer'

class Stats {
  @Expose()
  count!: number

  @Expose()
  users!: Array<{ name: string; count: number }>

  @Expose()
  sources!: Array<{ name: string; count: number }>
}

interface IStats {
  count: number
  users: Array<{ name: string; count: number }>
  sources: Array<{ name: string; count: number }>
}

export { Stats, IStats }
