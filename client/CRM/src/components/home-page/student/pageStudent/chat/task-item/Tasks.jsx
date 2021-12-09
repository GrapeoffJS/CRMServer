import React, {useEffect, useState} from "react"
import moment from "moment"

import {CreateTaskComponent} from "./CreateTask"
import {TaskComponent} from "./TaskComponent"
import {List} from "../styled"
import {selectResponsible} from "./helpers/selectResponsible"
import {swallErr} from "../../../../../../alert/alert"
import {createTask} from "./requests/createTask"
import Url from "../../../../../../url/url"
import {createComment} from "./requests/createComment"

export const Tasks = React.memo(({tasksObj, _id, fio, setComments}) => {

  // useState
  const {relTasks, setRelTasks} = tasksObj
  console.log(relTasks)
  // useState

  return (
    <div style={{position: "relative"}}>
      <p style={{marginBottom: "5px"}}>Всего задач: {relTasks.length}</p>
      <List>
        {relTasks.map(task => (
          <TaskComponent key={task._id} task={task} setRelTasks={setRelTasks}/>
        ))}
      </List>
      <CreateTaskComponent setComments={setComments} setRelTasks={setRelTasks} _id={_id} fio={fio} portable={true}/>
    </div>
  )
})