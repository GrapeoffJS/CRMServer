import React from 'react';
import {Table, Layout, Breadcrumb} from 'antd';
import {Link} from "react-router-dom"

import styled from '@emotion/styled';

const AllGroupsBox = styled.div({
    padding: '15px',
    borderRadius: '2px',
    backgroundColor: '#fff'
})

const AllGroups = ({AllGroups}) => {
    const {Content} = Layout;
    const {Column} = Table;

    const data = AllGroups.map(item => {

        let {group_name, level, places, pupils, _id, global_schedule} = item

        let time = ''

        if (global_schedule) {
            if (global_schedule[0]) {
                time = `с ${global_schedule[0].duration[0]} до ${global_schedule[0].duration[1]}`
            }
        }

        return ({
            key: _id,
            group_name: [group_name, _id],
            level: level,
            places: places,
            free_places: places - pupils.length,
            time: time
        })
    })

    return (

        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                <Breadcrumb.Item>Таблица Групп</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{padding: '10px', minHeight: 360}}>
                <AllGroupsBox>
                    <Table dataSource={data}>
                        <Column
                            title="Имя Группы"
                            dataIndex="group_name"
                            key="group_name"
                            render={(group_name) => (
                                <Link
                                    className="link-info"
                                    to={`/group/${group_name[1]}`}>
                                    {group_name[0]}
                                </Link>
                            )}/>
                        <Column title="Уровень" dataIndex="level" key="level"/>
                        <Column title="Количество мест" dataIndex="places" key="places"/>
                        <Column title="Свободных мест" dataIndex="free_places" key="free_places"/>
                        <Column title="Время занятий" dataIndex="time" key="time"/>
                    </Table>
                </AllGroupsBox>
            </div>
        </Content>
    )
}

export default AllGroups