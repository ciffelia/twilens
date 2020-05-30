const parseListResult = (rawListResult: any) => {
  return rawListResult.aggregations.list.buckets.map((bucket: any) => bucket.key)
}

export { parseListResult }
