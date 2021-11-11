export const statusTasksColor = (status) => {
  if (status < 60) return "#DC143C"
  if (status < 90 && status >= 60) return "#F6CD52"
  if (status >= 90) return "#7C9C51"
}