const hooksHandler = (func, newData) => {
  return (event) => {
    if (newData === "event") {
      newData = event
    }
    if (typeof newData === "string" && newData.startsWith("event")) {
      const splitData = newData.slice(6).split(".")
      let newDataEvent = event
      splitData.forEach((_, idx) => {
        newDataEvent = newDataEvent[splitData[idx]]
      })
      newData = newDataEvent
    }
    func(prev => prev = newData)
  }
}

export default hooksHandler