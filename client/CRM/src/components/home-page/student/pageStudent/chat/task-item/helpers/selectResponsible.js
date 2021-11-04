export const selectResponsibleCur = (responsible) => {
  if (responsible._source ?? true) return responsible
  return responsible._source
}