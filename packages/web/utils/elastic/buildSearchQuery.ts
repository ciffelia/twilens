import { SearchMode, SearchDisplayOptions, SearchOptions } from '@twilens/types'

const buildSearchQuery = (searchOptions: SearchOptions): { [key: string]: any } => {
  const { displayOptions } = searchOptions

  if (searchOptions.mode !== 'exact' && searchOptions.mode !== 'fuzzy') {
    throw new Error(`Unknown search mode: ${searchOptions.mode}`)
  }

  const { from, size } = calculatePage(displayOptions)

  const { filter, mustNot } = parseQuery(searchOptions)

  if (searchOptions.user != null) {
    filter.push({
      term: { user: searchOptions.user }
    })
  }

  const sort: any[] = []
  sort.push({
    [displayOptions.sortKey]: displayOptions.sortOrder
  })
  if (displayOptions.sortKey !== 'created_at') {
    sort.push({ created_at: 'desc' })
  }

  return {
    query: {
      bool: {
        filter,
        must_not: mustNot
      }
    },
    sort,
    from,
    size
  }
}

const calculatePage = (displayOptions: SearchDisplayOptions): { from: number, size: number } => {
  return {
    from: (displayOptions.page - 1) * displayOptions.itemsPerPage,
    size: displayOptions.itemsPerPage
  }
}

const parseQuery = (searchOptions: SearchOptions): { filter: any[], mustNot: any[] } => {
  const filter: any[] = []
  const mustNot: any[] = []

  const trimmedQuery = searchOptions.query.trim()

  if (trimmedQuery === '') {
    return { filter, mustNot }
  }

  for (const phrase of trimmedQuery.split(/\s+/)) {
    const condition = buildMatchCondition(phrase, searchOptions.mode)

    if (phrase[0] === '-') {
      mustNot.push(condition)
    } else {
      filter.push(condition)
    }
  }

  return { filter, mustNot }
}

const buildMatchCondition = (query: string, searchMode: SearchMode): any => {
  if (searchMode === 'exact') {
    return {
      match_phrase: {
        'text.search_unigram': { query }
      }
    }
  } else {
    return {
      match: {
        'text.search_sudachi': { query }
      }
    }
  }
}

export { buildSearchQuery }
