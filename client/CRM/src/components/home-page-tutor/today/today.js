import React, { useState, useEffect } from 'react'
import { Layout, Breadcrumb } from 'antd'

import LessonNow from './lesson-now/lesson-now.js'
import AllLesson from './all-lesson/all-lesson.js'

import moment from 'moment'

import styled from '@emotion/styled'

const Today = ({ rowKey, setRowKey, Groups, GROUP, setGROUP, getUser }) => {
  let indexHours = {
      timeN: '',
      group: {
        group_name: '',
        global_schedule: [{ date: '', duration: ['', ''] }],
        pupils: [],
      },
      indexD: 0,
    },
    groupsAll = [
      {
        timeN: '',
        group: {
          group_name: '',
          global_schedule: [{ date: '', duration: ['', ''] }],
          pupils: [],
        },
        indexD: 0,
      },
    ]

  Groups.forEach((item, i) => {
    let dataLes_l = []
    let indexD = 'f'

    let GLOBAL_SCHEDULE_Local = item.global_schedule ? item.global_schedule : []

    GLOBAL_SCHEDULE_Local.forEach((itemGL, i) => {
      let time = moment(itemGL.date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
        time_day = moment().diff(time, 'day')

      if (time_day <= 0) {
        if (indexD == 'f') {
          indexD = i
        }

        dataLes_l.push(`${time} ${itemGL.duration[0]}`)
      }
    })

    if (dataLes_l[0]) {
      if (indexHours.timeN) {
        let indexN = moment().diff(dataLes_l[0], 'hours'),
          posl = moment().diff(indexHours.timeN, 'hours')

        if ((indexN > posl) & (indexN <= 0)) {
          indexHours = {
            timeN: dataLes_l[0],
            group: item,
            indexD: indexD,
          }
        }
      } else if (!indexHours.timeN) {
        indexHours = {
          timeN: dataLes_l[0],
          group: item,
          indexD: indexD,
        }
      }

      if (dataLes_l[0]) {
        groupsAll.push({
          timeN: dataLes_l[0],
          group: item,
          indexD: indexD,
        })
      }
    }
  })

  let groupCon = [
    {
      timeN: '',
      group: {
        group_name: '',
        global_schedule: [{ date: '', duration: ['', ''] }],
        pupils: [],
      },
      indexD: 0,
    },
  ]

  let indexGroup = []
  groupsAll.forEach((item) => {
    indexGroup.push(moment().diff(item.timeN, 'minutes'))
  })

  indexGroup.sort((a, b) => b - a)

  indexGroup.forEach((itemIN) => {
    groupsAll.forEach((item2, i) => {
      if (moment().diff(item2.timeN, 'minutes') == itemIN) {
        groupCon.push(item2)
      }
    })
  })

  if (groupCon[1] != undefined) {
    groupCon.splice(0, 1)
  }

  const Today = styled.div({
    '.site-layout-background': {
      '.allCol': {
        padding: '0 7.5px',
      },
      '.LessonNow, .AllLesson': {
        padding: '15px',
        borderRadius: '2px',
        backgroundColor: '#fff',
      },
    },
  })

  if (!GROUP) {
    setGROUP(groupCon[0])
  }

  const { Content } = Layout

  return (
    <Today>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Главная</Breadcrumb.Item>
          <Breadcrumb.Item>Ближайшие уроки</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="row site-layout-background"
          style={{ padding: '7.5px', minHeight: 360 }}
        >
          <div className="allCol col-8">
            <LessonNow
              rowKey={rowKey}
              getUser={getUser}
              setRowKey={setRowKey}
              GROUP={GROUP}
              Group={indexHours}
            />
          </div>
          <div className="allCol col-4">
            <AllLesson
              Groups={groupCon}
              setGROUP={setGROUP}
              newGroup={indexHours}
              GROUP={GROUP}
            />
          </div>
        </div>
      </Content>
    </Today>
  )
}

export default Today
