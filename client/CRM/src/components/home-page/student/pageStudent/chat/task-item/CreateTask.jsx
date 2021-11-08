import React, {useEffect, useState} from "react"
import {DoubleLeftOutlined} from "@ant-design/icons"
import {DatePicker, Tag} from "antd"
import moment from "moment"
import jwt from "jsonwebtoken"

import {
  AccountTypeSpan,
  CreateTagBlock,
  CreateTask,
  SelectResponsible,
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

export const CreateTaskComponent = ({setOpenedModal, setRelTasks, portable, fio = {name: "", surname: ""}, _id = "", filterTasks = () => {}}) => {

  // data
  let colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  const {name, surname} = fio
  const dateFormat = ["DD/MM/YYYY | HH:mm"]
  // data

  // useState
  const [responsibles, setResponsibles] = useState([])
  const [tags, setTags] = useState([])
  const [reservTags, setReservTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedResponsible, setSelectedResponsible] = useState(jwt.decode(localStorage.getItem("tokenID")))
  const [tagName, setTagName] = useState("")
  const [search, setSearch] = useState("")
  const [opened, setOpened] = useState(false)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [deadline, setDeadline] = useState(moment().get())
  const [type, setType] = useState(0)
  // useState

  // useEffect
  useEffect(() => {
    const getResponsiblesCallback = async () => {
      const responsiblesFromReq = await getResponsibles(Url, search)
      setResponsibles(prev => prev = responsiblesFromReq.body.hits.hits)
    }
    getResponsiblesCallback()
  }, [search])
  useEffect(() => {
    const getTagsFromServer = async () => {
      const tagsRes = await getTags(Url)
      setTags(prev => prev = tagsRes)
      setReservTags(prev => prev = tagsRes)
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
    setSearch(prev => prev = "")
    setDeadline(prev => prev = moment().get())
    setSelectedResponsible(prev => prev = jwt.decode(localStorage.getItem("tokenID")))
    setTags(prev => prev = reservTags)
    setSelectedTags(prev => prev = [])
  }
  const onChangeTagName = (ev) => {
    setTagName(prev => prev = ev.target.value)
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
  const onClickSelectTag = (tag) => {
    if (selectedTags.findIndex(selTag => selTag._id === tag._id) < 0) {
      setSelectedTags(prev => prev = [...prev, tag])
      setTags(prev => prev = prev.filter(tagRes => tagRes._id !== tag._id))
    } else {
      setSelectedTags(prev => prev = prev.filter(tagRes => tagRes._id !== tag._id))
      setTags(prev => prev = [...prev, tag])
    }
  }
  const onClickCreateTag = async () => {
    let idx = Math.floor(Math.random() * (10))
    const newTag = {
      name: tagName,
      color: colors[idx]
    }
    if (!tagName.replaceAll(" ", "").length)
      return swallErr("Ошибка!", "Название тэга не может быть пустым")

    const createdTag = await createTag(Url, newTag)
    setTagName(prev => prev = "")
    setTags(prev => prev = [...prev, createdTag])
    setReservTags(prev => prev = [...prev, createdTag])
  }
  const onClickSubmit = async () => {
    const taskName = portable ? (type !== 2 ? `${selectType(type)} с ${name} ${surname}` : title) : title
    const newTask = {
      name: taskName,
      text,
      deadline: deadline.toISOString(),
      responsible: selectedResponsible._id ?? selectedResponsible.id,
      tags: selectedTags.map(tag => tag._id),
      type,
      for: portable ? _id : undefined
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
    setRelTasks(prev => prev = portable ? [...prev, createdTask] : filterTasks([...prev, createdTask]))
    onCreateTaskClearForm()
    setOpened(prev => prev = false)
    if (!portable) setOpenedModal(prev => prev = false)
  }
  const onClickOpenCreateTaskMenu = () => {
    setOpened(prev => prev = !prev)
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
          <div className="datepicker__deadline data">
            <DatePicker showTime value={deadline} placeholder="Конечный срок" format={dateFormat}
                        onChange={onChangeDate}/>
          </div>
          <TagBlock portable={portable}>
            <div>
              Выбранные теги:
              <div>
                {selectedTags.map(tag => {
                  return <Tag key={tag._id} color={tag.color} onClick={() => onClickSelectTag(tag)}>{tag.name}</Tag>
                })}
              </div>
            </div>
            <div>
              Создайте тег:
              <CreateTagBlock portable={portable}>
                <input type="text" placeholder="Название тэга" value={tagName} onChange={onChangeTagName}/>
                <SubmitButton portable={portable} onClick={onClickCreateTag}>
                  <button>Создать</button>
                </SubmitButton>
              </CreateTagBlock>
            </div>
            <div>
              Выберите тег:
              <div>
                {tags.map(tag => {
                  return <Tag key={tag._id} color={tag.color} onClick={() => onClickSelectTag(tag)}>{tag.name}</Tag>
                })}
              </div>
            </div>
          </TagBlock>
          <SelectResponsible portable={portable}>
            <p>Ответственный:</p>
            <input type="text" name="search" value={search} onChange={onChangeSearch} placeholder="Поиск"/>
            <div>
              {responsibles.length > 0 ? responsibles.map(el => (
                <p key={el._id}
                   onClick={() => onClickSelectResponsible(el)}>{selectResponsible(el).surname} {selectResponsible(el).name} {selectResponsible(el).midname}
                  <AccountTypeSpan>{selectResponsible(el).accountType}</AccountTypeSpan></p>
              )) : <span className="black">Ничего не найдено</span>}
            </div>
            <p>Выбран:</p>
            <div>
              {selectedResponsible ? <p onClick={() => onClickDeleteResponsible(selectedResponsible)}>
                {selectResponsible(selectedResponsible).surname} {selectResponsible(selectedResponsible).name} {selectResponsible(selectedResponsible).midname}
                <AccountTypeSpan>
                  {selectResponsible(selectedResponsible).accountType}
                </AccountTypeSpan>
              </p> : <span className="black">Не выбрано</span>}
            </div>
          </SelectResponsible>
          <SubmitButton portable={portable}>
            <button onClick={onClickSubmit}>Создать</button>
          </SubmitButton>
        </CreateTask>
      </WrapperTasks>
    </>
  )
}