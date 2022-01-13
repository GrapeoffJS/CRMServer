import React, {useEffect, useState} from "react";
import moment from "moment";

import {ColumnTab} from "./helpers/components/ColumnTab";
import {TahomaWrapper, TasksSortedStyled, UpperPanelFirstLayer, UpperPanelSecondLayer} from "./helpers/Tasks.styled";
import {Filter} from "./helpers/components/Filter";
import {CreateTask} from "./helpers/components/CreateTask";
import Url from "../../../url/url";
import {getTasks} from "./requests/getTasks";
import {Progress} from "./helpers/components/Progress";
import {createTagQueryString} from "./helpers/createTagQueryString";
import {TabsBlock} from "./helpers/components/TabsBlock";
import {TableTab} from "./helpers/components/TableTab";

const Tasks = () => {

  // useState
  const [filter, setFilter] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [expiredTasks, setExpiredTasks] = useState([])
  const [todayTasks, setTodayTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [reservTasks, setReservTasks] = useState([])
  console.log(reservTasks)
  const [futureTasks, setFutureTasks] = useState([])
  const [statusTasks, setStatusTasks] = useState(0)
  // useState

  // useEffect
  useEffect(() => {
    const tagQuery = createTagQueryString(filter)
    const getTasksFromServer = async () => {
      let tasks = await getTasks(Url, tagQuery)
      const filteredExpiredTasks = tasks.filter(task => moment(task.deadline).isBefore(moment().get()))
      const filteredTodayTasks = tasks.filter(task => (moment(task.deadline).isBefore(moment().endOf("day")) && moment(task.deadline).isAfter(moment().get())))
      const filteredFutureTasks = tasks.filter(task => moment(task.deadline).isAfter(moment().endOf("day")))
      const filterExpiredTasksOnCompleteDate = filteredExpiredTasks.filter(task => task.completedOn).filter(task => moment(task.completedOn).isBefore(moment().endOf("day")) && moment(task.completedOn).isAfter(moment().subtract(1, "days")))
      const filterFutureTasksOnCompleteDate = filteredFutureTasks.filter(task => task.completedOn).filter(task => moment(task.completedOn).isBefore(moment().endOf("day")) && moment(task.completedOn).isAfter(moment().subtract(1, "days")))
      setCompletedTasks(prev => prev = [...filterExpiredTasksOnCompleteDate, ...filteredTodayTasks.filter(task => task.done), ...filterFutureTasksOnCompleteDate])
      setReservTasks(prev => prev = [...filterExpiredTasksOnCompleteDate, ...filteredTodayTasks, ...filterFutureTasksOnCompleteDate])
      setExpiredTasks(prev => prev = filteredExpiredTasks.filter(task => !task.done))
      setTodayTasks(prev => prev = filteredTodayTasks.filter(task => !task.done))
      setFutureTasks(prev => prev = filteredFutureTasks.filter(task => !task.done))
      setAllTasks(prev => prev = tasks)
    }
    getTasksFromServer()
    return () => {
      setExpiredTasks(prev => prev = [])
      setTodayTasks(prev => prev = [])
      setFutureTasks(prev => prev = [])
      setAllTasks(prev => prev = [])
      setCompletedTasks(prev => prev = [])
    }
  }, [filter])
  useEffect(() => {
    setStatusTasks(prev => prev = reservTasks.length ? Math.round(completedTasks.length / reservTasks.length * 100) : 100)
  }, [completedTasks, reservTasks])
  // useEffect

  // methods
  const filterTasks = (tasks) => {
    const filteredExpiredTasks = tasks.filter(task => moment(task.deadline).isBefore(moment().get()))
    const filteredTodayTasks = tasks.filter(task => (moment(task.deadline).isBefore(moment().endOf("day")) && moment(task.deadline).isAfter(moment().get())))
    const filteredFutureTasks = tasks.filter(task => moment(task.deadline).isAfter(moment().endOf("day")))
    const filterExpiredTasksOnCompleteDate = filteredExpiredTasks.filter(task => task.completedOn).filter(task => (moment(task.completedOn).isBefore(moment().endOf("day")) && moment(task.completedOn).isAfter(moment().subtract(1, "days"))))
    const filterFutureTasksOnCompleteDate = filteredFutureTasks.filter(task => task.completedOn).filter(task => (moment(task.completedOn).isBefore(moment().endOf("day")) && moment(task.completedOn).isAfter(moment().subtract(1, "days"))))
    console.log("ex", filterExpiredTasksOnCompleteDate)
    console.log("fu", filterFutureTasksOnCompleteDate)
    setReservTasks(prev => prev = [...filterExpiredTasksOnCompleteDate, ...filteredTodayTasks, ...filterFutureTasksOnCompleteDate])
    setExpiredTasks(prev => prev = filteredExpiredTasks.filter(task => !task.done))
    setTodayTasks(prev => prev = filteredTodayTasks.filter(task => !task.done))
    setFutureTasks(prev => prev = filteredFutureTasks.filter(task => !task.done))
    return tasks
  }
  // methods

  // data
  const viewbagFunnel = (
    <TasksSortedStyled>
      <ColumnTab tasks={expiredTasks} type="Expired" setCompletedTasks={setCompletedTasks}
                 setTasks={setExpiredTasks} setReservTasks={setReservTasks}>Просроченные задачи</ColumnTab>
      <ColumnTab tasks={todayTasks} type="Today" setCompletedTasks={setCompletedTasks} setTasks={setTodayTasks}>
        Задачи на сегодня</ColumnTab>
      <ColumnTab tasks={futureTasks} type="Tomorrow" setCompletedTasks={setCompletedTasks}
                 setTasks={setFutureTasks} setReservTasks={setReservTasks}>Будущие задачи</ColumnTab>
    </TasksSortedStyled>
  )
  const viewbagTable = (
    <React.Fragment>
      <TableTab tasks={allTasks} setReservTasks={setReservTasks} setCompletedTasks={setCompletedTasks}
                setTodayTasks={setTodayTasks} setExpiredTasks={setExpiredTasks} setTomorrowTasks={setFutureTasks} />
    </React.Fragment>
  )
  // data

  return (
    <TahomaWrapper>
      <UpperPanelFirstLayer>
        <Progress reservTasks={reservTasks} completedTasks={completedTasks} statusTasks={statusTasks}/>
      </UpperPanelFirstLayer>
      <UpperPanelSecondLayer>
        <Filter filterObj={{filter, setFilter}}/>
        <CreateTask url={Url} filterTasks={filterTasks} setAllTasks={setAllTasks}/>
      </UpperPanelSecondLayer>
      <TabsBlock viewbagFunnel={viewbagFunnel} viewbagTable={viewbagTable}/>
    </TahomaWrapper>
  )
}

export default Tasks