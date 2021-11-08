import moment from "moment";
import {useState} from "react";

import {BoldContainer, OpacityParagraph, TaskComponentStyled} from "../Tasks.styled";
import {CustomCheckbox} from "./CustomCheckbox";
import {editDoneTask} from "../../../student/pageStudent/chat/task-item/requests/editDoneTask";
import Url from "../../../../../url/url";
import {StatusesBlock} from "../../../sales-funnel/helpers/sales-funnel-styled";
import {Tag} from "antd";

export const TaskComponent = ({task, type, setCompletedTasks, setTasks, setReservTasks}) => {

  // useState
  const [active, setActive] = useState(false)
  // useState

  // methods
  const onClickChangeActive = async () => {
    setActive(prev => prev = !prev)
    await editDoneTask(Url, task._id, {done: true})
    task.done = true
    setCompletedTasks(prev => prev = [...prev, task].filter(complTask => complTask.done))
    if (type !== "Today") setReservTasks(prev => prev = [...prev, task])
    setTasks(prev => prev = prev.filter(uncompleTask => uncompleTask.done !== true))
  }
  // methods

  return (
    <TaskComponentStyled type={active ? "Tomorrow" : type}>
      <BoldContainer>
        <CustomCheckbox active={active} onClick={onClickChangeActive} type={active ? "Tomorrow" : type}/>
        {task?.name}
        <StatusesBlock portable={false} contains={task.tags.length}>
          {task.tags.map(tag => (
            <Tag key={tag._id} color={tag.color}>{tag.name}</Tag>
          ))}
        </StatusesBlock>
      </BoldContainer>
      <OpacityParagraph>До: {moment(task?.deadline).format("DD/MM/YYYY | HH:mm")}</OpacityParagraph>
      <div>{task?.text}</div>
    </TaskComponentStyled>
  )
}