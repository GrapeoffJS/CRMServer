export const createTagQueryString = (filter) => {
  if (!filter.length) return ""
  if (filter.length === 1) return `?tag=${filter[0]}`
  return `?tag=${filter[0]}${filter.reduce((prev, tagId) => prev + tagId, "&tag=")}`
}