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
import {useToggle} from "../../../hooks/useToggle";

const Tasks = () => {

  // useState
  const [filter, setFilter] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [expiredTasks, setExpiredTasks] = useState([])
  const [todayTasks, setTodayTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [reservTasks, setReservTasks] = useState([])
  const [tomorrowTasks, setTomorrowTasks] = useState([])
  const [statusTasks, setStatusTasks] = useState(0)
  // useState

  // useEffect
  useEffect(() => {
    const tagQuery = createTagQueryString(filter)
    const getTasksFromServer = async () => {
      const tasks = await getTasks(Url, tagQuery)
      const filteredExpiredTasks = tasks.filter(task => moment(task.deadline).isBefore(moment().get()))
      const filteredTodayTasks = tasks.filter(task => (moment(task.deadline).isBefore(moment().endOf("day")) && moment(task.deadline).isAfter(moment().get())))
      const filteredTomorrowTasks = tasks.filter(task => moment(task.deadline).isAfter(moment().endOf("day")))
      setCompletedTasks(prev => prev = [...filteredTodayTasks.filter(task => task.done), ...filteredExpiredTasks.filter(task => task.done), ...filteredTomorrowTasks.filter(task => task.done)])
      setReservTasks(prev => prev = [...filteredTodayTasks, ...filteredExpiredTasks.filter(task => task.done), ...filteredTomorrowTasks.filter(task => task.done)])
      setExpiredTasks(prev => prev = filteredExpiredTasks.filter(task => task.done !== true))
      setTodayTasks(prev => prev = filteredTodayTasks.filter(task => task.done !== true))
      setTomorrowTasks(prev => prev = filteredTomorrowTasks.filter(task => task.done !== true))
      setAllTasks(prev => prev = tasks)
    }
    getTasksFromServer()
    return () => {
      setExpiredTasks(prev => prev = [])
      setTodayTasks(prev => prev = [])
      setTomorrowTasks(prev => prev = [])
      setAllTasks(prev => prev = [])
      setCompletedTasks(prev => prev = [])
    }
  }, [filter])
  useEffect(() => {
    setStatusTasks(prev => prev = Math.round(completedTasks.length / reservTasks.length * 100))
  }, [completedTasks, reservTasks])
  // useEffect

  // methods
  const filterTasks = (tasks) => {
    const filteredExpiredTasks = tasks.filter(task => moment(task.deadline).isBefore(moment().get()))
    const filteredTodayTasks = tasks.filter(task => (moment(task.deadline).isBefore(moment().endOf("day")) && moment(task.deadline).isAfter(moment().get())))
    const filteredTomorrowTasks = tasks.filter(task => moment(task.deadline).isAfter(moment().endOf("day")))
    setReservTasks(prev => prev = [...filteredTodayTasks, ...filteredExpiredTasks.filter(task => task.done), ...filteredTomorrowTasks.filter(task => task.done)])
    setExpiredTasks(prev => prev = filteredExpiredTasks.filter(task => !task.done))
    setTodayTasks(prev => prev = filteredTodayTasks.filter(task => !task.done))
    setTomorrowTasks(prev => prev = filteredTomorrowTasks.filter(task => !task.done))
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
      <ColumnTab tasks={tomorrowTasks} type="Tomorrow" setCompletedTasks={setCompletedTasks}
                 setTasks={setTomorrowTasks} setReservTasks={setReservTasks}>Задачи на завтра</ColumnTab>
    </TasksSortedStyled>
  )
  const viewbagTable = (
    <React.Fragment>
      <TableTab tasks={allTasks} setReservTasks={setReservTasks} setCompletedTasks={setCompletedTasks}
                setTodayTasks={setTodayTasks} setExpiredTasks={setExpiredTasks} setTomorrowTasks={setTomorrowTasks}>
        Задачи на сегодня</TableTab>
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