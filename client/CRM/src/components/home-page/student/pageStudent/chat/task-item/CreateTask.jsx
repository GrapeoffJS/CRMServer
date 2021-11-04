import React, {useCallback, useEffect, useState} from "react"
import {DoubleLeftOutlined} from "@ant-design/icons"
import {DatePicker} from "antd"
import moment from "moment"
import jwt from "jsonwebtoken"

import {AccountTypeSpan, CreateTask, SelectResponsible, SubmitButton, WrapperTasks} from "./task.styled"
import {getResponsibles} from "./requests/getResponsibles"
import Url from "../../../../../../url/url"
import {swallErr} from "../../../../../../alert/alert"
import {createTask} from "./requests/createTask"
import {selectResponsibleCur} from "./helpers/selectResponsible";

export const CreateTaskComponent = ({_id, fio, setRelTasks}) => {

  // data
  const {name, surname} = fio
  const dateFormat = ["DD/MM/YYYY | HH:mm"]
  // data

  // useState
  const [responsibles, setResponsibles] = useState([])
  const [selectedResponsible, setSelectedResponsible] = useState(jwt.decode(localStorage.getItem("tokenID")))
  const [search, setSearch] = useState("")
  const [opened, setOpened] = useState(false)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [deadline, setDeadline] = useState(moment().get())
  const [type, setType] = useState(0)
  // useState

  // useCallback
  const getResponsiblesCallback = useCallback(async () => {
    const responsiblesFromReq = await getResponsibles(Url, search)
    setResponsibles(prev => prev = responsiblesFromReq.body.hits.hits)
  }, [search])
  // useCallback

  // useEffect
  useEffect(() => {
    getResponsiblesCallback()
  }, [getResponsiblesCallback])
  // useEffect

  // methods
  const selectType = (typeNumber) => {
    if (typeNumber === 0) return "Связаться"
    if (typeNumber === 1) return "Созвониться"
  }
  const onCreateTaskClearForm = () => {
    setTitle(prev => prev = "")
    setText(prev => prev = "")
    setType(prev => prev = 0)
    setSearch(prev => prev = "")
    setDeadline(prev => prev = moment().get())
    setSelectedResponsible(prev => prev = jwt.decode(localStorage.getItem("tokenID")))
  }
  const onChangeTitle = (ev) => {
    setTitle(prev => prev = ev.target.value)
  }
  const onChangeText = (ev) => {
    setText(prev => prev = ev.target.value)
  }
  const onChangeDate = (ev) => {
    setDeadline(prev => prev = ev)
  }
  const onChangeType = (ev) => {
    setType(prev => prev = Number(ev.target.value))
  }
  const onChangeSearch = (ev) => {
    setSearch(prev => prev = ev.target.value)
  }
  const onClickSelectResponsible = (responsible) => {
    setSelectedResponsible(prev => prev = responsible)
  }
  const onClickDeleteResponsible = (deletedResponsible) => {
    setSelectedResponsible(prev => prev = "")
  }
  const onClickSubmit = async () => {
    const taskName = type !== 2 ? `${selectType(type)} с ${name} ${surname}` : title
    const newTask = {
      name: taskName,
      text,
      deadline: deadline.toISOString(),
      responsible: selectedResponsible._id ?? selectedResponsible.id,
      type,
      for: _id
    }
    if (taskName.replaceAll(" ", "").length === 0) {
      return swallErr("Ошибка!", "Название пустое")
    }
    if (deadline && deadline.isBefore(moment().get())) {
      return swallErr("Ошибка!", "Окончательный срок не может быть раньше сегодняшней даты")
    }
    if (selectedResponsible === "") {
      return swallErr("Ошибка!", "Ответсвенный не выбран")
    }
    const createdTask = await createTask(Url, newTask)
    setRelTasks(prev => prev = [...prev, createdTask])
    onCreateTaskClearForm()
    setOpened(prev => prev = false)
  }
  const onClickOpenCreateTaskMenu = () => {
    setOpened(prev => prev = !prev)
  }
  // methods

  return (
    <>
      <WrapperTasks opened={opened} type={type}>
        <div className="buttonUp">
          <button onClick={onClickOpenCreateTaskMenu}>
            <DoubleLeftOutlined/>
            Создать
          </button>
        </div>
        <CreateTask>
          <div className="type__select data">
            <select value={type} onChange={onChangeType}>
              <option value="0" defaultChecked>Связаться</option>
              <option value="1">Созвониться</option>
              <option value="2">Другое</option>
            </select>
          </div>
          {type === 2 ? <div className="input__title data">
            <input placeholder="Название" type="text" name="title" value={title} onChange={onChangeTitle}/>
          </div> : <p></p>}
          <div className="textarea__text data">
            <textarea placeholder="Задача" name="text" rows={5} value={text} onChange={onChangeText}/>
          </div>
          <div className="datepicker__deadline data">
            <DatePicker showTime value={deadline} placeholder="Конечный срок" format={dateFormat}
                        onChange={onChangeDate}/>
          </div>
          <SelectResponsible>
            <p>Ответственный:</p>
            <input type="text" name="search" value={search} onChange={onChangeSearch} placeholder="Поиск"/>
            <div>
              {responsibles.length > 0 ? responsibles.map(el => (
                <p key={el._id}
                   onClick={() => onClickSelectResponsible(el)}>{el._source.surname} {el._source.name} {el._source.midname}
                  <AccountTypeSpan>{el._source.accountType}</AccountTypeSpan></p>
              )) : <span className="black">Ничего не найдено</span>}
            </div>
            <p>Выбран:</p>
            <div>
              {selectedResponsible ? <p onClick={() => onClickDeleteResponsible(selectedResponsible)}>
                {selectResponsibleCur(selectedResponsible).surname} {selectResponsibleCur(selectedResponsible).name} {selectResponsibleCur(selectedResponsible).midname}
                <AccountTypeSpan>
                  {selectResponsibleCur(selectedResponsible).accountType}
                </AccountTypeSpan>
              </p> : <span className="black">Не выбрано</span>}
            </div>
          </SelectResponsible>
          <SubmitButton>
            <button onClick={onClickSubmit}>Создать</button>
          </SubmitButton>
        </CreateTask>
      </WrapperTasks>
    </>
  )
}