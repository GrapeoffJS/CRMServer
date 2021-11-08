import {useEffect, useState} from "react"
import {Select} from "antd"
import {getTags} from "../../../student/pageStudent/chat/task-item/requests/getTags";
import Url from "../../../../../url/url";

export const Filter = ({filterObj}) => {

  // data
  const {Option} = Select
  const {setFilter} = filterObj
  // data

  // useState
  const [optionTags, setOptionTags] = useState([])
  // useState

  // useEffect
  useEffect(() => {
    const getTagsFromServer = async () => {
      const tags = await getTags(Url)
      setOptionTags(prev => prev = tags)
    }
    getTagsFromServer()
  }, [])
  // useEffect

  // methods
  const onChangeFilter = (event) => {
    setFilter(prev => prev = event)
  }
  // methods

  return (
    <Select mode="multiple" onChange={onChangeFilter}>
      {optionTags.map(tag => (
        <Option key={tag._id} value={tag._id}>{tag.name}</Option>
      ))}
    </Select>
  )
}