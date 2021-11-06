import React, {useState} from "react"

import {CreateTaskComponent} from "./CreateTask"
import {List} from "antd";
import {TaskComponent} from "./TaskComponent";

export const Tasks = React.memo(({tasks, _id, fio}) => {

  // useState
  const [relTasks, setRelTasks] = useState(tasks)
  // useState

  return (
    <>
      <CreateTaskComponent setRelTasks={setRelTasks} _id={_id} fio={fio} portable={true}/>
      <List className="specialList" header={`Всего задач: ${Array.isArray(relTasks) ? relTasks.length : 0}`}
            itemLayout="horizontal" dataSource={relTasks} renderItem={(task, idx) => (
        <TaskComponent key={task._id} task={task} setRelTasks={setRelTasks} index={idx}/>
      )}/>
    </>
  )
})