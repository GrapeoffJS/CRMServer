import React from "react"
import {DatePicker, Select} from "antd"

import {selectResponsible} from "../helpers/selectResponsible"
import {SelectResponsibleAndDateStyled, TagBlock} from "../task.styled"
import {swallErr} from "../../../../../../../alert/alert"
import {createTag} from "../requests/createTag"
import Url from "../../../../../../../url/url"

const {Option} = Select

export const SelectResponsibleAndDate = ({portable, responsiblesObj, tagsObj, deadlineObj, tagName, hooksHandler}) => {

  console.log("Render")

  // data
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  const {setSelectedResponsible, selectedResponsible, responsibles} = responsiblesObj
  const {setTagName, setTags, setSelectedTags, tags, selectedTags} = tagsObj
  const {setDeadline, deadline, dateFormat} = deadlineObj
  // data

  // methods
  const onChangeResponsible = (ev) => {
    const id = ev.split(" ")[4]
    setSelectedResponsible(prev => prev = responsibles.find(el => el._id === id))
  }
  const onClickCreateTag = async (ev) => {
    if (!(ev.key === "Enter")) return
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
  // methods

  return (
    <SelectResponsibleAndDateStyled portable={portable}>
      <div>
        <Select showSearch
                value={`${selectResponsible(selectedResponsible).surname} ${selectResponsible(selectedResponsible).name} ${selectResponsible(selectedResponsible).midname} ${selectResponsible(selectedResponsible).accountType} ${selectResponsible(selectedResponsible).id}`}
                onChange={onChangeResponsible}>
          {responsibles.map(el => (
            <Option key={el._id}
                    value={`${selectResponsible(el).surname} ${selectResponsible(el).name} ${selectResponsible(el).midname} ${selectResponsible(el).accountType} ${selectResponsible(el).id}`}>
              {selectResponsible(el).surname} {selectResponsible(el).name} {selectResponsible(el).midname} {selectResponsible(el).accountType}
            </Option>
          ))}
        </Select>
      </div>
      <TagBlock className="adaptive-height">
        <Select mode="multiple" value={selectedTags} onInputKeyDown={onClickCreateTag}
                onChange={hooksHandler(setSelectedTags, "event")} onSearch={hooksHandler(setTagName, "event")}>
          {tags.map(tag => {
            return <Option key={tag._id} value={tag.name}>{tag.name}</Option>
          })}
        </Select>
      </TagBlock>
      <div className="background-gray">
        <DatePicker showTime value={deadline} placeholder="Конечный срок" format={dateFormat}
                    onChange={hooksHandler(setDeadline, "event")}/>
      </div>
    </SelectResponsibleAndDateStyled>
  )
}