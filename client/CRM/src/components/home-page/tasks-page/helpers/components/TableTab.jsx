import {Table, Tag} from "antd"
import moment from "moment";

import {DeleteOutlined} from "@ant-design/icons"
import {editDoneTask} from "../../../student/pageStudent/chat/task-item/requests/editDoneTask";
import Url from "../../../../../url/url";
import {StatusesBlock} from "../../../sales-funnel/helpers/sales-funnel-styled";
import {BreakWordParagraph} from "../Tasks.styled";
import {NavLink} from "react-router-dom";

export const TableTab = ({tasks, children, setReservTasks, setCompletedTasks, setTodayTasks, setExpiredTasks, setTomorrowTasks}) => {

  // methods
  const onClickChangeActive = async (task) => {
    await editDoneTask(Url, task._id, {done: true})
    task.done = true
    setCompletedTasks(prev => {
      prev = [...prev, task].filter(complTask => complTask.done)
      return prev
    })
    const condition = moment(task.deadline).isBefore(moment().endOf("day")) && moment(task.deadline).isAfter(moment().get())
    if (!condition) setReservTasks(prev => prev = [...prev, task])
    setExpiredTasks(prev => prev = prev.filter(uncompleTask => !uncompleTask.done))
    setTodayTasks(prev => prev = prev.filter(uncompleTask => !uncompleTask.done))
    setTomorrowTasks(prev => prev = prev.filter(uncompleTask => !uncompleTask.done))
  }
  // methods

  // data
  const dataSource = tasks.filter(task => task.done !== true).map(task => task = {
    ...task,
    complete: task,
    forLink: {for: task.for, name: task.name},
    key: task._id,
    deadline: moment(task.deadline).format("DD/MM/YYYY | HH:mm")
  })
  const columns = [
    {
      title: "",
      dataIndex: "complete",
      key: "complete",
      render: task => <DeleteOutlined style={{fontSize: "20px", color: "crimson"}}
                                      onClick={() => onClickChangeActive(task)}/>
    },
    {
      title: "Конечный срок",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Название",
      dataIndex: "forLink",
      key: "forLink",
      render: task => {
        return task.for ? <NavLink to={`/student/${task?.for || ""}`}>{task.name}</NavLink> : <span>{task.name}</span>
      }
    },
    {
      title: "Текст",
      dataIndex: "text",
      key: "text",
      render: text => (
        <BreakWordParagraph>{text}</BreakWordParagraph>
      )
    },
    {
      title: "Тэги",
      dataIndex: "tags",
      key: "tags",
      render: tags => (
        <StatusesBlock portable={true} contains={tags.length}>
          {tags.map(tag => (
            <Tag key={tag._id} color={tag.color}>{tag.name}</Tag>
          ))}
        </StatusesBlock>
      )
    }
  ]
  // data

  return (
    <div>
      <Table columns={columns} dataSource={dataSource}/>
    </div>
  )
}