import {useEffect, useState} from "react"
import {Input} from "antd"
import {FunnelPlotOutlined} from "@ant-design/icons"

export const Filter = () => {

  // useState
  const [filter, setFilter] = useState("")
  // useState

  // useEffect
  useEffect(() => {
    console.log("Filtered")
  }, [filter])
  // useEffect

  // methods
  const onChangeFilter = (event) => {
    setFilter(prev => event.target.value)
  }
  // methods

  return <Input placeholder="Фильтр" value={filter} onChange={onChangeFilter} prefix={<FunnelPlotOutlined />} />
};