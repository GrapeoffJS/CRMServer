import React, {useEffect, useState} from "react"
import {DoubleLeftOutlined} from "@ant-design/icons"
import moment from "moment"
import jwt from "jsonwebtoken"

import {CreateTask, SubmitButton, WrapperTasks} from "./task.styled"
import {getResponsibles} from "./requests/getResponsibles"
import Url from "../../../../../../url/url"
import {swallErr} from "../../../../../../alert/alert"
import {createTask} from "./requests/createTask"
import {selectResponsible} from "./helpers/selectResponsible"
import {getTags} from "./requests/getTags"
import {createComment} from "./requests/createComment"
import {SelectResponsibleAndDate} from "./components/SelectResponsibleAndDate"
import hooksHandler from "../../../../../../helpers/hooksHandler"

export const CreateTaskComponent = ({
                                      setOpenedModal,
                                      setRelTasks,
                                      portable,
                                      setComments,
                                      fio = {name: "", surname: ""},
                                      _id = "",
                                      filterTasks = () => {
                                      }
                                    }) => {

  // data
  const {name, surname} = fio
  const dateFormat = ["DD/MM/YYYY | HH:mm"]
  // data

  // useState
  const [responsibles, setResponsibles] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedResponsible, setSelectedResponsible] = useState(jwt.decode(localStorage.getItem("tokenID")))
  const [tagName, setTagName] = useState("")
  const [opened, setOpened] = useState(false)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [deadline, setDeadline] = useState(moment().get())
  const [type, setType] = useState(0)
  // useState

  // useEffect
  useEffect(() => {
    const getResponsiblesCallback = async () => {
      const responsiblesFromReq = await getResponsibles(Url, "")
      const responsibles = responsiblesFromReq.body.hits.hits.map(resp => resp = {
        ...resp,
        chosen: selectResponsible(resp).id === selectResponsible(selectedResponsible).id ? true : false
      })
      setResponsibles(prev => prev = responsibles)
    }
    getResponsiblesCallback()
  }, [selectedResponsible])
  useEffect(() => {
    const getTagsFromServer = async () => {
      const tagsRes = await getTags(Url)
      setTags(prev => prev = tagsRes)
    }
    getTagsFromServer()
    return onCreateTaskClearForm
  }, [])
  useEffect(() => {
    setType(prev => Number(prev))
  }, [type])
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
    setDeadline(prev => prev = moment().get())
    setSelectedResponsible(prev => prev = jwt.decode(localStorage.getItem("tokenID")))
    setSelectedTags(prev => prev = [])
    setOpened(prev => prev = false)
    setTagName(prev => prev = "")
  }
  const onClickSubmit = async () => {
    try {
      const taskName = portable ? (type !== 2 ? `${selectType(type)} с ${name} ${surname}` : title) : title
      const responsibleId = selectResponsible(selectedResponsible).id
      const deadlineISO = deadline.toISOString()
      const tagsArr = tags.filter(tag => selectedTags.includes(tag.name)).map(tag => tag._id)
      const forLid = portable ? _id : undefined
      const newTask = {
        name: taskName,
        text,
        deadline: deadlineISO,
        responsible: responsibleId,
        tags: tagsArr,
        type,
        for: forLid
      }
      if (taskName.replaceAll(" ", "").length === 0) {
        return swallErr("Ошибка!", "Название пустое")
      }
      if (deadline && deadline.isBefore(moment().get())) {
        return swallErr("Ошибка!", "Окончательный срок не может быть раньше сегодняшней даты")
      }
      const createdTask = await createTask(Url, newTask)
      if (portable) {
        await createComment(Url, _id, {text: `${createdTask.name}\n ${createdTask.text}`})
        setComments(prev => [...prev, {
          author: `${createdTask.responsible.surname} ${createdTask.responsible.name} ${createdTask.responsible.midname}`,
          content: <p>{createdTask.name}<br/>{createdTask.text}</p>,
          deadline: createdTask.createdAt
        }])
      }
      setRelTasks(prev => prev = portable ? [...prev, createdTask] : filterTasks([...prev, createdTask]))
      onCreateTaskClearForm()
      setOpened(prev => prev = false)
      if (!portable) setOpenedModal(prev => prev = false)
    } catch (error) {
      console.log(error)
      swallErr("Ошибка!", "Что-то пошло не так...")
    }
  }
  const onClickOpenCreateTaskMenu = () => {
    setOpened(prev => prev = !prev)
    setSelectedTags(prev => prev = [])
  }
  // methods

  return (
    <>
      <WrapperTasks opened={portable ? opened : portable} portable={portable} type={type}>
        {portable ? <div className="buttonUp">
          <button onClick={onClickOpenCreateTaskMenu}>
            <DoubleLeftOutlined/>
            Создать
          </button>
        </div> : ""}
        <CreateTask portable={portable}>
          <div className="type__select data">
            <select value={type} onChange={hooksHandler(setType, "event.target.value")}>
              <option value="0" defaultChecked>Связаться</option>
              <option value="1">Созвониться</option>
              <option value="2">Другое</option>
            </select>
          </div>
          {type === 2 || !portable ? <div className="input__title data">
            <input placeholder="Название" type="text" name="title" value={title}
                   onChange={hooksHandler(setTitle, "event.target.value")}/>
          </div> : <p></p>}
          <div className="textarea__text data">
            <textarea placeholder="Задача" name="text" rows={5} value={text}
                      onChange={hooksHandler(setText, "event.target.value")}/>
          </div>
          <SelectResponsibleAndDate portable={portable}
                                    responsiblesObj={{setSelectedResponsible, responsibles, selectedResponsible}}
                                    tagName={tagName} tagsObj={{setSelectedTags, setTagName, setTags, tags, selectedTags}}
                                    deadlineObj={{setDeadline, deadline, dateFormat}}/>
          <SubmitButton portable={portable}>
            <button onClick={onClickSubmit}>Создать</button>
          </SubmitButton>
        </CreateTask>
      </WrapperTasks>
    </>
  )
}