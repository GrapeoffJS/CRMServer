export const changeColor = (type) => {
  if (type === "Expired") return "crimson"
  if (type === "Today") return "#6290FF"
  if (type === "Tomorrow") return "#7C9C51"
}