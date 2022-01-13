import React from 'react'

import { CreateTaskComponent } from './CreateTask'
import { TaskComponent } from './TaskComponent'
import { List } from '../styled'

export const Tasks = React.memo(({ tasksObj, _id, fio, setComments }) => {
  // useState
  const { relTasks, setRelTasks } = tasksObj
  // useState
  return (
    <div style={{ position: 'relative' }}>
      <p style={{ marginBottom: '5px' }}>Всего задач: {relTasks.filter(task => !task.archived).length}</p>
      <List>
        {relTasks.filter(task => !task.archived).map((task) => (
          <TaskComponent _id={_id} setComments={setComments} key={task._id} task={task} setRelTasks={setRelTasks} />
        ))}
      </List>
      <CreateTaskComponent
        setComments={setComments}
        setRelTasks={setRelTasks}
        _id={_id}
        fio={fio}
        portable={true}
      />
    </div>
  )
})
