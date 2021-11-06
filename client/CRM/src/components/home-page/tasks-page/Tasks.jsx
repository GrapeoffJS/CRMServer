import React, {useState, useEffect} from "react";
import moment from "moment";

import {Column} from "./Column";
import {TasksSortedStyled, UpperPanel} from "./helpers/Tasks.styled";
import {Filter} from "./Filter";
import {CreateTask} from "./CreateTask";
import Url from "../../../url/url";
import {getTasks} from "./requests/getTasks";

const Tasks = () => {

  // useState
  const [allTasks, setAllTasks] = useState([])
  const [expiredTasks, setExpiredTasks] = useState([])
  const [todayTasks, setTodayTasks] = useState([])
  const [tomorrowTasks, setTomorrowTasks] = useState([])
  // useState

  // useEffect
  useEffect(() => {
    const getTasksFromServer = async () => {
      const tasks = await getTasks(Url)
      const filteredExpiredTasks = tasks.filter(task => moment(task.deadline).isBefore(moment().get()))
      const filteredTodayTasks = tasks.filter(task => (moment(task.deadline).isBefore(moment().endOf("day")) && moment(task.deadline).isAfter(moment().get())))
      const filteredTomorrowTasks = tasks.filter(task => moment(task.deadline).isAfter(moment().endOf("day")))
      setExpiredTasks(prev => prev = filteredExpiredTasks)
      setTodayTasks(prev => prev = filteredTodayTasks)
      setTomorrowTasks(prev => prev = filteredTomorrowTasks)
      setAllTasks(prev => prev = tasks)
      console.log(tasks)
    }
    getTasksFromServer()
    return () => {
      setExpiredTasks(prev => prev = [])
      setTodayTasks(prev => prev = [])
      setTomorrowTasks(prev => prev = [])
    }
  }, [])
  // useEffect

  // methods
  const filterTasks = (tasks) => {
    const filteredExpiredTasks = tasks.filter(task => moment(task.deadline).isBefore(moment().get()))
    const filteredTodayTasks = tasks.filter(task => (moment(task.deadline).isBefore(moment().endOf("day")) && moment(task.deadline).isAfter(moment().get())))
    const filteredTomorrowTasks = tasks.filter(task => moment(task.deadline).isAfter(moment().endOf("day")))
    setExpiredTasks(prev => prev = filteredExpiredTasks)
    setTodayTasks(prev => prev = filteredTodayTasks)
    setTomorrowTasks(prev => prev = filteredTomorrowTasks)
    return tasks
  }
  // methods

  return (
    <React.Fragment>
      <UpperPanel>
        <Filter />
        <CreateTask url={Url} filterTasks={filterTasks} setAllTasks={setAllTasks} />
      </UpperPanel>
      <TasksSortedStyled>
        <Column tasks={expiredTasks} type="Expired">Просроченные задачи</Column>
        <Column tasks={todayTasks} type="Today">Задачи на сегодня</Column>
        <Column tasks={tomorrowTasks} type="Tomorrow">Задачи на завтра</Column>
      </TasksSortedStyled>
    </React.Fragment>
  )
}

export default Tasks