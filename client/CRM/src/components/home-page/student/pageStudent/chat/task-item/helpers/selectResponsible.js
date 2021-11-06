export const selectResponsible = (responsible) => {
  if (responsible._source && responsible._source.doc) return responsible._source.doc
  if (responsible._source) return responsible._source
  return responsible
}