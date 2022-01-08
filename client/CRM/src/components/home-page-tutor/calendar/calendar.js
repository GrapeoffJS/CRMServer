import React, { useState, useEffect } from 'react'
import { Layout, Breadcrumb, Table, Tag } from 'antd'

import styled from '@emotion/styled'

import moment from 'moment'

const columns = [
  {
    title: '',
    key: 'time',
    dataIndex: 'time',
    fixed: 'left',
    width: 100,
    render: (time) => <Tag color="cyan">{time}</Tag>,
  },
  { title: 'Понедельник', dataIndex: '1', key: '1' },
  { title: 'Вторник', dataIndex: '2', key: '2' },
  { title: 'Среда', dataIndex: '3', key: '3' },
  { title: 'Четверг', dataIndex: '4', key: '4' },
  { title: 'Пятница', dataIndex: '5', key: '5' },
  { title: 'Суббота', dataIndex: '6', key: '6' },
  { title: 'Воскресенье', dataIndex: '0', key: '7' },
]

const СalendarStyle = styled.div({
  padding: '15px',
  borderRadius: '2px',
  backgroundColor: '#fff',
})
const GroupsANDpupils = styled.div({
  padding: '15px',
  borderRadius: '2px',
  backgroundColor: '#fff',
  marginBottom: '15px',
})

const { Content } = Layout

const Сalendar = ({ Groups }) => {
  const columns2 = Groups.map((item) => {
    // let name = `${item._id}`
    return {
      title: () => (
        <Tag key={item._id} color="magenta">
          {item.group_name}
        </Tag>
      ),
      key: item._id,
      dataIndex: 'pupil',
      fixed: 'top',
      width: 100,
      render: () => {
        return (
          <>
            {item.pupils.map((itemf, i) => (
              <div key={`${item._id}${i}`}>
                <Tag style={{ marginBottom: '5px' }} color="green">
                  {itemf.surname} {itemf.name} {itemf.midname}
                </Tag>
              </div>
            ))}
          </>
        )
      },
    }
  })

  const data2 = [
    {
      key: '777',
      pupil: '',
    },
  ]

  // ==================
  const data = Groups.map((items) => {
    let GLOBAL_SCHEDULE_Local = items.global_schedule
      ? items.global_schedule
      : []

    if (GLOBAL_SCHEDULE_Local[0]) {
      let wekDay = {}

      items.global_schedule.forEach((day) => {
        let wek_day = moment(day.date, 'DD.MM.YYYY').day()

        wekDay[wek_day] = items.group_name
      })

      return {
        key: items._id,
        ...wekDay,
        time: items.global_schedule[0].duration[0],
      }
    } else {
      return {
        key: items._id,
        1: `Для группы: "${items.group_name}" не создано расписание.`,
        time: '',
      }
    }
  })

  let finalDate = []

  for (let inc = 0; inc <= 24; inc++) {
    data.forEach((item) => {
      let hh = moment(item.time, 'hh:mm').hours()
      if (hh == inc) {
        finalDate.push(item)
      }
    })
  }

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>Расписание уроков</Breadcrumb.Item>
      </Breadcrumb>
      <GroupsANDpupils>
        <div className="row site-layout-background" style={{ padding: '15px' }}>
          <h4>Группы</h4>
          <Table
            bordered
            columns={columns2}
            dataSource={data2}
            scroll={{ x: 1000 }}
          />
        </div>
      </GroupsANDpupils>
      <СalendarStyle>
        <div className="row site-layout-background" style={{ padding: '15px' }}>
          <h4>Расписание</h4>
          <Table
            bordered
            columns={columns}
            dataSource={finalDate}
            scroll={{ x: 1300 }}
          />
        </div>
      </СalendarStyle>
    </Content>
  )
}

export default Сalendar
