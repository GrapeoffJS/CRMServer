import {useState} from "react"

export const useToggle = (inititalBool) => {
  if (typeof inititalBool !== typeof false) throw new Error("Need boolean type")

  const [initial, setInitial] = useState(inititalBool)
  const setInitialMod = () => {
    setInitial(prev => prev = !prev)
  }

  return [initial, setInitialMod]
}