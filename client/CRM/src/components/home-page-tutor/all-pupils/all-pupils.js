import React from 'react';
import {Table, Layout, Breadcrumb} from 'antd';
import {Link} from "react-router-dom"

import ReturnAge from './../../home-page/return-age/returnAge.js'

import styled from '@emotion/styled';

const AllPupilsBox = styled.div({
    padding: '15px',
    borderRadius: '2px',
    backgroundColor: '#fff'
})

const AllPupils = ({AllPupils}) => {

    const {Content} = Layout;
    const {Column} = Table;

    const data = []

    AllPupils.forEach(item => {

        let {surname, name, midname, dateOfBirth, gender, phone, discord, _id} = item

        let i = true

        data.forEach(item => {
            if (item.key == _id) {
                i = false
            }
        })

        if (i) {
            data.push({
                key: _id,
                surname: [surname, _id],
                name: name,
                midname: midname,
                dateOfBirth: ReturnAge(dateOfBirth),
                gender: gender,
                phone: phone,
                discord: discord
            })
        }
    })

    return (

        <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                <Breadcrumb.Item>Таблица Учеников</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{padding: '10px', minHeight: 360}}>
                <AllPupilsBox>
                    <Table dataSource={data}>
                        <Column
                            title="Фамилия"
                            dataIndex="surname"
                            key="surname"
                            render={(surname) => (
                                <Link
                                    className="link-info"
                                    to={`/student/${surname[1]}`}>
                                    {surname[0]}
                                </Link>
                            )}/>
                        <Column title="Имя" dataIndex="name" key="name"/>
                        <Column title="Отчество" dataIndex="midname" key="midname"/>
                        <Column title="Возраст" dataIndex="dateOfBirth" key="dateOfBirth"/>
                        <Column title="Пол" dataIndex="gender" key="gender"/>
                        <Column title="Номер телефона" dataIndex="phone" key="phone"/>
                        <Column title="Дискорд никнейм" dataIndex="discord" key="discord"/>
                    </Table>
                </AllPupilsBox>
            </div>
        </Content>
    )
}

export default AllPupils