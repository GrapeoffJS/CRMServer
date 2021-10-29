import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"

import {Layout, Menu} from 'antd'
import {
  DatabaseOutlined,
  FunnelPlotOutlined,
  LogoutOutlined,
  SearchOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons'

import SearchAll from './../search/search.js'

import Student from './student/student.js'
import StudentPage from './student/pageStudent/pageStudent.js'

import Group from './group/group.js'
import GroupPage from './group/group-page/group-page.js'

import UploadPupils from './upload-pupils/upload-pupils'
// Сводные таблицы
import Create_Columns_Rows_Groups from './#more-functions/сreate-columns-and-rows/сreate-columns-rows-groups.js'
import Create_Columns_Rows_Pupils from './#more-functions/сreate-columns-and-rows/сreate-columns-rows-pupils.js'

import {suspenseComponent} from "../../hocs/SuspenseComponent"

import styled from '@emotion/styled'

const SalesFunnel = React.lazy(() => import("./sales-funnel/sales-funnel"))
const SuspenseSalesFunnel = suspenseComponent(SalesFunnel, <div>Loading...</div>)

const {Sider} = Layout;
const {SubMenu} = Menu;

const HomePage = ({logOut}) => {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    useEffect(() => {
        document.querySelector('.ant-layout-sider-trigger').style.width = collapsed ? '80px' : '257px'
    })

    const Vag = styled.div({
        '.ant-menu': {
            height: '100vh',
            position: 'relative',
            width: collapsed ? '80px' : '257px'
        },
        '.vag123': {
            position: 'absolute',
            bottom: '48px',
            width: collapsed ? '80px' : ''
        },
        '.site-layout': {
            padding: '15px'
        },
        '& > section': {
            '& > aside': {
                position: 'fixed',
                zIndex: 99
            },
            '& > section': {
                marginLeft: collapsed ? '80px' : '257px'
            }
        }
    })

    const Box = styled.div({
        overflow: 'auto'
    })

    return (
        <>
            <Router>
                <Vag>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider
                            collapsible
                            collapsed={collapsed}
                            onCollapse={onCollapse}
                        >
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                <Menu.Item key="Search" icon={<SearchOutlined/>}>
                                    <SearchAll/>
                                </Menu.Item>
                                <Menu.Item
                                    icon={<UploadOutlined
                                        onClick={() => document.querySelector(".ButtonUpload").click()}/>}>
                                    <UploadPupils/>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<UserOutlined/>}>
                                    <Link to='/student'>
                                        Ученики
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<TeamOutlined/>}>
                                    <Link to='/group'>
                                        Группы
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4" icon={<FunnelPlotOutlined/>}>
                                    <Link to='/sales-funnel'>
                                        Воронка продаж
                                    </Link>
                                </Menu.Item>
                                <SubMenu key="sub1" icon={<DatabaseOutlined/>} title="Сводные таблицы">
                                    <Menu.Item key="sub-student">
                                        <Link to='/table-pupils'>
                                            Ученики
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="sub-groups">
                                        <Link to='/table-groups'>
                                            Группы
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item
                                    onClick={() => {
                                        localStorage.removeItem('tokenID');
                                        logOut()
                                    }}
                                    id='LogoutOut'
                                    key="Logout"
                                    className='vag123'
                                    icon={<LogoutOutlined/>}>
                                    <Link to='/'>
                                        Выход
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout className="site-layout">
                            <Switch>
                                <Route exact path='/student'
                                       component={() => <Student/>}/>
                                <Route path={`/student/:id`} children={() => <StudentPage/>}/>

                                <Route exact path='/group' component={() => <Group/>}/>
                                <Route path={`/group/:id`} children={() => <GroupPage/>}/>
                                <Route path={'/sales-funnel'} component={() => <SuspenseSalesFunnel />}/>
                                {/*Сводные таблицы*/}
                                <Route exact path='/table-groups' component={() => <Create_Columns_Rows_Groups/>}/>

                                <Route exact path='/table-pupils' component={() => (
                                    <Box>
                                        <Create_Columns_Rows_Pupils/>
                                    </Box>)}/>

                                <Route path="/student/*">
                                    <h2>Странца не найдена</h2>
                                </Route>
                            </Switch>
                        </Layout>
                    </Layout>
                </Vag>
            </Router>
        </>
    );
};

export default HomePage;