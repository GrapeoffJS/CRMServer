import React, {useState} from "react"
import {Checkbox, List, Tag} from "antd"
import moment from "moment"
import {CloseOutlined} from "@ant-design/icons"

import {CheckboxContainer, DeleteButton, OpacityContainer, OpacityParagraph, WrapperTaskComponent} from "./task.styled"
import Url from "../../../../../../url/url"
import {editTask} from "./requests/editTask"
import {StatusesBlock} from "../../../../sales-funnel/helpers/sales-funnel-styled";
import {createComment} from "./requests/createComment";
import {swallErr} from "../../../../../../alert/alert";

export const TaskComponent = ({task, setRelTasks, setComments, _id}) => {

  // useState
  const [done, setDone] = useState(task.done)
  console.log(task)
  // useState

  // methods
  const resFIO = (key) => {
    if (!task.responsible || task.responsible.length === 0) return "Не найден"
    if (Array.isArray(task.responsible)) {
      return task.responsible[0][key]
    }
    if (!Array.isArray(task.responsible) && task.responsible instanceof Object) {
      return task.responsible[key]
    }
    return "..."
  }
  const onClickDeleteTask = async (id) => {
    try {
      await editTask(Url, id, {archived: true})
      setRelTasks(prev => prev.filter(task => task._id !== id))
    } catch (err) {
      console.log(err)
    }
  }
  async function onChangeEditDone(id, ev) {
    try {
      const checked = ev.target.checked

      await editTask(Url, id, {done: true, completedOn: moment().toISOString(), archived: true})

      setRelTasks(prev => prev.filter(task => task._id !== id))
      setDone(prev => prev = checked)

      await createComment(Url, _id, {text: `${task.name}\n${task.text}`, color: "crimson"})
      setComments(prev => [...prev, {
        author: `${resFIO("surname")} ${resFIO("name")} ${resFIO("midname")}`,
        content: <><p style={{color: "crimson"}}>{task.name}</p><p>{task.text}</p></>,
        deadline: moment().get().toISOString(),
        color: "crimson"
      }])
    } catch (err) {
      console.log(err)
      swallErr("Ошибка!", "Что-то пошло не так...")
    }
  }
  // methods

  return (
    <List.Item key={task._id}>
      <WrapperTaskComponent done={done}>
        <div>
          <OpacityContainer>
            {task.name}
            <StatusesBlock portable={false} contains={task.tags.length}>
              {task.tags.map(tag => {
                return <Tag key={tag._id} color={tag.color}>{tag.name}</Tag>
              })}
            </StatusesBlock>
          </OpacityContainer>
          <OpacityParagraph>Срок до: {moment(task.deadline).format("DD/MM/YYYY | HH:mm")}</OpacityParagraph>
          <OpacityParagraph>
            Ответственнен: {resFIO("surname")} {resFIO("name")} {resFIO("midname")}
          </OpacityParagraph>
          <DeleteButton onClick={() => onClickDeleteTask(task._id)}><CloseOutlined/></DeleteButton>
        </div>
        <p className="done">{task.text}</p>
        <CheckboxContainer>
          <Checkbox checked={done} onChange={(ev) => onChangeEditDone(task._id, ev)}/>
        </CheckboxContainer>
      </WrapperTaskComponent>
    </List.Item>
  );
};