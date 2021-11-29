import React, {useEffect, useState} from "react"
import {DoubleLeftOutlined, PlusOutlined} from "@ant-design/icons"
import {DatePicker, Select} from "antd"
import moment from "moment"
import jwt from "jsonwebtoken"

import {
  CreateTagButton,
  CreateTask,
  SelectResponsibleAndDate,
  SubmitButton,
  TagBlock,
  WrapperTasks
} from "./task.styled"
import {getResponsibles} from "./requests/getResponsibles"
import Url from "../../../../../../url/url"
import {swallErr} from "../../../../../../alert/alert"
import {createTask} from "./requests/createTask"
import {selectResponsible} from "./helpers/selectResponsible";
import {getTags} from "./requests/getTags";
import {createTag} from "./requests/createTag";

const {Option} = Select

export const CreateTaskComponent = ({
                                      setOpenedModal,
                                      setRelTasks,
                                      portable,
                                      fio = {name: "", surname: ""},
                                      _id = "",
                                      filterTasks = () => {
                                      }
                                    }) => {

  // data
  let colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
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
  }, [])
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
  }
  const onSearchTag = (searchInput) => {
    setTagName(prev => prev = searchInput)
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
  const onChangeResponsible = (ev) => {
    setSelectedResponsible(prev => prev = responsibles.find(el => el._id === ev.target.value))
  }
  const onChangeSelectTag = (tagNames) => {
    //const tagIds = tags.filter(tag => tagNames.includes(tag.name)).map(tag => tag._id)
    setSelectedTags(prev => prev = tagNames)
  }
  const onClickCreateTag = async () => {
    let idx = Math.floor(Math.random() * colors.length)
    const newTag = {
      name: tagName,
      color: colors[idx]
    }
    if (!tagName.replaceAll(" ", "").length) {
      return swallErr("Ошибка!", "Название тэга не может быть пустым")
    }

    const createdTag = await createTag(Url, newTag)
    setTagName(prev => prev = "")
    setTags(prev => prev = [...prev, createdTag])
    setSelectedTags(prev => prev = [...prev, createdTag.name])
  }
  const onClickSubmit = async () => {
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
    setRelTasks(prev => prev = portable ? [...prev, createdTask] : filterTasks([...prev, createdTask]))
    onCreateTaskClearForm()
    setOpened(prev => prev = false)
    if (!portable) setOpenedModal(prev => prev = false)
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
            <select value={type} onChange={onChangeType}>
              <option value="0" defaultChecked>Связаться</option>
              <option value="1">Созвониться</option>
              <option value="2">Другое</option>
            </select>
          </div>
          {type === 2 || !portable ? <div className="input__title data">
            <input placeholder="Название" type="text" name="title" value={title} onChange={onChangeTitle}/>
          </div> : <p></p>}
          <div className="textarea__text data">
            <textarea placeholder="Задача" name="text" rows={5} value={text} onChange={onChangeText}/>
          </div>
          <SelectResponsibleAndDate portable={portable}>
            <div className="background-gray">
              <select value={selectResponsible(selectedResponsible).id} onChange={onChangeResponsible}
                      name="responsible">
                {responsibles.map(el => (
                  <option key={el._id} value={selectResponsible(el).id}>
                    {selectResponsible(el).surname} {selectResponsible(el).name} {selectResponsible(el).midname} {selectResponsible(el).accountType}
                  </option>
                ))}
              </select>
            </div>
            <TagBlock className="adaptive-height">
              <Select mode="multiple" value={selectedTags} onChange={onChangeSelectTag} onSearch={onSearchTag}>
                {tags.map(tag => {
                  return <Option key={tag._id} value={tag.name}>{tag.name}</Option>
                })}
              </Select>
              <CreateTagButton onClick={onClickCreateTag}>
                <PlusOutlined/>
              </CreateTagButton>
            </TagBlock>
            <div className="background-gray">
              <DatePicker showTime value={deadline} placeholder="Конечный срок" format={dateFormat}
                          onChange={onChangeDate}/>
            </div>
          </SelectResponsibleAndDate>
          <SubmitButton portable={portable}>
            <button onClick={onClickSubmit}>Создать</button>
          </SubmitButton>
        </CreateTask>
      </WrapperTasks>
    </>
  )
}