import { SearchMode } from './SearchMode'
import { SearchDisplayOptions } from './SearchDisplayOptions'

interface SearchOptions {
  query: string

  mode: SearchMode

  user: string | null

  displayOptions: SearchDisplayOptions
}

export { SearchOptions }
