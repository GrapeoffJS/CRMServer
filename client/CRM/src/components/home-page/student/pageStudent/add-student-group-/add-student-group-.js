import React, { useState } from 'react'
import { Input, Modal } from 'antd'
import { handleCancel, handleOk, showModal } from './add-student-group-logic'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { serverRequest } from '../../../../search/server-request'
import { sortingSearchResponses } from '../../../group/group-logic'
import { requestAddStudentGroup } from './request-add-student-group'
import { useParams } from 'react-router-dom'
import { loading, swallGood } from '../../../../../alert/alert'

const AddStudentGroup = ({ data, updatePage }) => {
  const studentId = useParams().id
  const { groups } = data

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [value, setValue] = useState('')
  const [ArrayEligibleGroups, setArrayEligibleGroups] = useState([])

  const SuitableGroups = ArrayEligibleGroups.map((item) => {
    const { group_name, id } = item

    return (
      <li
        style={{ fontSize: '18px' }}
        onClick={() => {
          requestAddStudentGroup(
            id,
            studentId,
            (resData) => {
              swallGood('Ученик добавлен в группу')
              setIsModalVisible(false)
              updatePage({ ...data, groups: [...groups, resData] })
            },
            loading
          )
        }}
        key={id}
        className="list-group-item"
      >
        <span className="badge bg-warning text-dark">{`${group_name}`}</span>
      </li>
    )
  })

  let spanGroup = groups.map((item) => {
    return (
      <span key={item._id} className={`badge bg-light text-dark`}>
        {item.group_name}
      </span>
    )
  })

  return (
    <>
      {spanGroup}
      <AppstoreAddOutlined
        onClick={() => {
          showModal(setIsModalVisible)
        }}
        style={{ color: 'rgb(23, 162, 184)', fontSize: '23px' }}
      />
      <Modal
        title="Добавить группу"
        visible={isModalVisible}
        onOk={() => {
          handleOk(setIsModalVisible)
        }}
        onCancel={() => {
          handleCancel(setIsModalVisible)
        }}
      >
        <div>
          <div className="row addPUPILS">
            <div className="input-group">
              <Input
                placeholder={'Найти группы...'}
                onChange={(e) => {
                  setValue(e.target.value)
                  serverRequest((data) => {
                    sortingSearchResponses(
                      data,
                      setArrayEligibleGroups,
                      'groups'
                    )
                  }, encodeURI(e.target.value))
                }}
                value={value}
              />

              <ul className="list-group list-group-flush">{SuitableGroups}</ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddStudentGroup
