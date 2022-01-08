import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { loading, Swalclose } from '../../alert/alert'
import Url from './../../url/url.js'

import Today from './today/today.js'
import Сalendar from './calendar/calendar.js'
import SearchAll from './../search/search.js'
import StudentPage from '../home-page/student/pageStudent/pageStudent.js'
import GroupPage from '../home-page/group/group-page/group-page.js'

import AllPupils from './all-pupils/all-pupils.js'
import AllGroups from './all-groups/all-groups.js'

import { Layout, Menu } from 'antd'
import {
  LogoutOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  TeamOutlined,
  SearchOutlined,
  UserOutlined,
  LikeOutlined,
} from '@ant-design/icons'

import styled from '@emotion/styled'
import errorHandler from '../error-handler/error-handler'
import TrialLessonsTutor from '../trial-lessons/trial-lessons-tutor/trial-lessons-tutor'

const axios = require('axios') // AJAX
let jwt = require('jsonwebtoken')

const { Sider } = Layout

const HomePageTutor = ({ logOut }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [rowKey, setRowKey] = useState([])
  const [GROUP, setGROUP] = useState({
    group: {
      group_name: '',
      global_schedule: [{ date: '00', duration: ['', ''] }],
      pupils: [],
      _id: '3443',
    },
    indexD: 0,
  })
  const [user, setUser] = useState({
    groups: [],
    login: '',
    midname: '',
    name: '',
    role: '',
    surname: '',
    _id: '456456',
  })
  const [Groups, setGroups] = useState([])

  let Pupils = []
  Groups.forEach((item) => {
    Pupils.push(...item.pupils)
  })

  const getGroups = (l_user) => {
    let mass_id = l_user.groups.map((item) => item._id)

    if (mass_id[0]) {
      axios({
        method: 'post',
        url: `${Url}/CRM/Groups/getByIds`,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${localStorage.getItem('tokenID')}`,
        },
        data: {
          ids: mass_id,
        },
      })
        .then((res) => {
          setGroups(res.data)
          Swalclose()
        })
        .catch((error) => {
          errorHandler(getGroups, error)
        })
    } else {
      Swalclose()
    }
  }

  const getUser = (title) => {
    loading(title, '')

    axios({
      method: 'get',
      url: `${Url}/CRM/Teachers/${
        jwt.decode(localStorage.getItem('tokenID')).id
      }`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('tokenID')}`,
      },
    })
      .then((res) => {
        let { data } = res
        if (!data) {
          localStorage.removeItem('tokenID')
          window.location.replace('/')
        }

        setUser(data)
        getGroups(data)
      })
      .catch((error) => {
        errorHandler(getGroups, error)
      })
  }

  useEffect(() => {
    getUser('Получение данных...')
  }, [])

  useEffect(() => {
    document.querySelector('.ant-layout-sider-trigger').style.width = collapsed
      ? '80px'
      : '250px'
  })

  const Vag = styled.div({
    '.ant-menu': {
      height: '100vh',
      position: 'relative',
      width: collapsed ? '80px' : '250px',
    },
    '.vag123': {
      position: 'absolute',
      bottom: '48px',
      width: collapsed ? '80px' : '',
    },
    '.site-layout': {
      padding: '15px',
    },
    '& > section': {
      '& > aside': {
        position: 'fixed',
        zIndex: 99,
      },
      '& > section': {
        marginLeft: collapsed ? '80px' : '250px',
      },
    },
  })

  return (
    <Router>
      <Vag>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="Search" icon={<SearchOutlined />}>
                <SearchAll
                  tutorid={`&tutorID=${
                    jwt.decode(localStorage.getItem('tokenID')).id
                  }`}
                />
              </Menu.Item>
              <Menu.Item key="1" icon={<ClockCircleOutlined />}>
                <Link to="/">Сегодня</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<CalendarOutlined />}>
                <Link to="/calendar">Расписание</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                <Link to="/pupils">Ученики</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<TeamOutlined />}>
                <Link to="/groups">Группы</Link>
              </Menu.Item>
              <Menu.Item key="trial-lessons-tutor" icon={<LikeOutlined />}>
                <Link to="/trial-lessons-tutor">Пробные уроки</Link>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  localStorage.removeItem('tokenID')
                  logOut()
                }}
                key="Logout"
                className="vag123"
                icon={<LogoutOutlined />}
              >
                <Link to="/">Выход: {user.login}</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <div>
              <Switch>
                <Route exact path="/">
                  <Today
                    rowKey={rowKey}
                    getUser={getUser}
                    setRowKey={setRowKey}
                    GROUP={GROUP}
                    setGROUP={setGROUP}
                    Groups={Groups}
                  />
                </Route>
                <Route exact path="/calendar">
                  <Сalendar Groups={Groups} />
                </Route>
                <Route exact path="/pupils">
                  <AllPupils AllPupils={Pupils} />
                </Route>
                <Route exact path="/groups">
                  <AllGroups AllGroups={Groups} />
                </Route>
                <Route
                  exact
                  path="/trial-lessons-tutor"
                  component={TrialLessonsTutor}
                />

                <Route
                  exact
                  path={`/student/:id`}
                  children={() => <StudentPage />}
                />
                <Route
                  exact
                  path={`/group/:id`}
                  children={() => <GroupPage />}
                />
              </Switch>
            </div>
          </Layout>
        </Layout>
      </Vag>
    </Router>
  )
}

export default HomePageTutor
