import {useState} from "react"

import {Column} from "./Column"
import {TasksSortedStyled} from "./helpers/Tasks.styled"

const Tasks = () => {

  // useState
  const [expiredTasks, setExpiredTasks] = useState([])
  const [todayTasks, setTodayTasks] = useState([])
  const [tomorrowTasks, setTomorrowTasks] = useState([])
  // useState

  return (
    <TasksSortedStyled>
      <Column tasks={expiredTasks} type="Expired">Просроченные задачи</Column>
      <Column tasks={todayTasks} type="Today">Задачи на сегодня</Column>
      <Column tasks={tomorrowTasks} type="Tomorrow">Задачи на завтра</Column>
    </TasksSortedStyled>
  )
}

export default Tasks