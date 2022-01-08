import React from 'react'

import { Table, Tag } from 'antd'

const { Column } = Table

const TableGroups = ({ Groups, newGroup, setGROUP, GROUP }) => {
  const data = Groups.map((item, i) => {
    let { _id, group_name, global_schedule } = item.group,
      color = 'cyan'

    if (GROUP.group) {
      if ((newGroup.group._id == _id) & !GROUP.group.group_name) {
        color = 'volcano'
      } else if (_id == GROUP.group._id) {
        color = 'volcano'
      }
    }

    return {
      key: i,
      groupName: {
        group_name: group_name,
        G: item,
      },
      date: {
        date: `${global_schedule[`${item.indexD}`].date} в ${
          global_schedule[0].duration[0]
        }`,
        color: color,
        G: item,
      },
    }
  })

  let pagination = {
    pageSize: 15,
  }

  return (
    <Table
      pagination={pagination}
      loading={false}
      scroll={{ x: 0 }}
      dataSource={data}
    >
      <Column
        title="Время"
        dataIndex="date"
        key="date"
        render={(date) => (
          <Tag
            onClick={() => {
              setGROUP(date.G)
            }}
            style={{ cursor: 'pointer' }}
            color={date.color}
          >
            {date.date}
          </Tag>
        )}
      />

      <Column
        title="Группа"
        dataIndex="groupName"
        key="groupName"
        render={(groupName) => (
          <Tag
            onClick={() => {
              setGROUP(groupName.G)
            }}
            style={{ cursor: 'pointer' }}
            color="volcano"
          >
            {groupName.group_name}
          </Tag>
        )}
      />
    </Table>
  )
}

TableGroups.defaultProps = {
  Groups: [
    {
      group_name: '',
      global_schedule: [{ date: '', duration: ['', ''] }],
      pupils: [],
    },
  ],
}

export default TableGroups
