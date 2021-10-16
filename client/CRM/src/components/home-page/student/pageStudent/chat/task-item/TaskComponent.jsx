import {useState, useEffect} from "react"
import React from "react"
import {List, Checkbox} from "antd"
import moment from "moment"
import {CloseOutlined} from  "@ant-design/icons"

import {DeleteButton, OpacityParagraph, CheckboxContainer, WrapperTaskComponent} from "./task.styled"
import {deleteTask} from "./requests/deleteTask"
import Url from "../../../../../../url/url"
import {editDoneTask} from "./requests/editDoneTask"

export const TaskComponent = ({task, index, setRelTasks}) => {

  // useState
  const [done, setDone] = useState(task.done)
  // useState

  // methods
  const resFIO = (key) => {
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
      await deleteTask(Url, id)
      setRelTasks(prev => prev.filter(task => task._id !== id))
    } catch (err) {
      console.log(err)
    }
  }
  const onChangeEditDone = async (id, ev) => {
    const checked = ev.target.checked
    await editDoneTask(Url, id, {done: checked})
    setDone(prev => prev = checked)
  }
  // methods

  return (
    <List.Item>
      <WrapperTaskComponent done={done}>
        <div>
          <OpacityParagraph>{task.name}</OpacityParagraph>
          <OpacityParagraph>Срок до: {moment(task.deadline).format("DD/MM/YYYY | HH:mm")}</OpacityParagraph>
          <OpacityParagraph>
            Ответственнен: {resFIO("surname")} {resFIO("name")} {resFIO("midname")}
          </OpacityParagraph>
          <DeleteButton onClick={() => onClickDeleteTask(task._id)}><CloseOutlined /></DeleteButton>
        </div>
        <p className="done">{task.text}</p>
        <CheckboxContainer>
          <Checkbox checked={done} onChange={(ev) => onChangeEditDone(task._id, ev)} />
        </CheckboxContainer>
      </WrapperTaskComponent>
    </List.Item>
  );
};