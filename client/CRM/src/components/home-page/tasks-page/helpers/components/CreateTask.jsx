import React, {useState} from "react"
import {Button, Modal} from "antd"
import {CreateTaskComponent} from "../../../student/pageStudent/chat/task-item/CreateTask";

export const CreateTask = ({url, setAllTasks, filterTasks}) => {

  // useState
  const [opened, setOpened] = useState(false)
  // useState

  // methods
  const onClickOpenModal = () => {
    setOpened(prev => prev = !prev)
  }
  const onOkOrCancel = () => {
    setOpened(prev => prev = false)
  }
  // methods

  return (
    <React.Fragment>
      <Button type="primary" onClick={onClickOpenModal}>Создать задачу</Button>
      <Modal width={800} className="nonePaddingModal" visible={opened} onOk={onOkOrCancel} onCancel={onOkOrCancel}
             footer={""}>
        <CreateTaskComponent setOpenedModal={setOpened} setRelTasks={setAllTasks} portable={false}
                             filterTasks={filterTasks}/>
      </Modal>
    </React.Fragment>
  )
}