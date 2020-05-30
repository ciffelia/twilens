const buildListQuery = (field: string) => ({
  aggs: {
    list: {
      terms: { field }
    }
  }
})

export { buildListQuery }
