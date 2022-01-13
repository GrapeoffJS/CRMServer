import moment from "moment";
import {useState} from "react";

import {BoldContainer, OpacityParagraph, TaskComponentStyled} from "../Tasks.styled";
import {CustomCheckbox} from "./CustomCheckbox";
import {editTask} from "../../../student/pageStudent/chat/task-item/requests/editTask";
import Url from "../../../../../url/url";
import {StatusesBlock} from "../../../sales-funnel/helpers/sales-funnel-styled";
import {Tag} from "antd";
import {NavLink} from "react-router-dom";
import {createComment} from "../../../student/pageStudent/chat/task-item/requests/createComment";
import {swallErr} from "../../../../../alert/alert";

export const TaskComponent = ({task, type, setCompletedTasks, setTasks, setReservTasks}) => {

  // useState
  const [active, setActive] = useState(false)
  // useState

  // methods
  const onClickChangeActive = async () => {
    try {
      setActive(prev => prev = !prev)
      if (task.for) {
        await createComment(Url, task.for, {text: `${task.name}\n${task.text}`, color: "crimson"})
      }
      await editTask(Url, task._id, {done: true, archived: true, completedOn: moment().toISOString()})
      task.done = true
      setCompletedTasks(prev => prev = [...prev, task].filter(complTask => complTask.done))
      if (type !== "Today") setReservTasks(prev => prev = [...prev, task])
      setTasks(prev => prev = prev.filter(uncompleTask => !uncompleTask.done))
    } catch (err) {
      console.log(err)
      swallErr("Ошибка!", "Что-то пошло не так...")
    }
  }
  // methods

  return (
    <TaskComponentStyled type={active ? "Tomorrow" : type}>
      <BoldContainer>
        <CustomCheckbox active={active} onClick={onClickChangeActive} type={active ? "Tomorrow" : type}/>
        {task.for ? <NavLink to={`/student/${task?.for || ""}`}>{task.name}</NavLink> : task.name}
        <StatusesBlock portable={false} contains={task.tags.length}>
          {task.tags.map(tag => (
            <Tag key={tag._id} color={tag.color}>{tag.name}</Tag>
          ))}
        </StatusesBlock>
      </BoldContainer>
      <OpacityParagraph>До: {moment(task?.deadline).format("DD/MM/YYYY | HH:mm")}</OpacityParagraph>
      <p>{task?.text}</p>
    </TaskComponentStyled>
  )
}