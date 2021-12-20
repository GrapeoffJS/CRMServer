import React, {useEffect, useState} from 'react'
import {Table, Tag} from 'antd'

import ReturnAge from './../return-age/returnAge.js' // Определяет возраст
import Pagination from './../#more-functions/pagination/pagination.js' // Pagination
import {getFunnel, trashUser, update} from "./service-student/service-student";

// Библиотеки
import './student.css'

import {Link} from "react-router-dom"

import styled from '@emotion/styled'
import {connect} from "react-redux";
import {add_all_pupils, delete_all_pupils, install_all_pupils, install_funnel} from "../../../actions";
import CreateStudent from "./create-student/create-student";

const mq = [1020, 700].map(
    bp => `@media (max-width: ${bp}px)`
)

const TableL = styled.div({
    padding: '0 30px',
    [mq[1]]: {
        padding: '0 0',
    },
    '.log_h2': {},
    td: {
        paddingTop: '1px',
        paddingBottom: '4px'
    },
    'th, td': {
        whiteSpace: 'nowrap'
    }
})

const Student = ({users, setUsers, setFunnel, delete_all_pupils, add_all_pupils}) => {

    const [offsetG, setOffsetG] = useState(0)
    const [Count, setCount] = useState(0)

    useEffect(() => {
        update(0, {}, {}, setUsers, setCount)
        getFunnel(setFunnel)
    }, [])

    useEffect(() => {
        document.querySelectorAll("input").forEach((item) => {
            item.value = ''
        })
        document.querySelectorAll('select').forEach((item) => {
            item.value = ''
        })
    })

    const dataSource = []

    users.forEach((item) => {

        let {_id, parentFullname, statuses, surname, name, midname, dateOfBirth, gender, phone, balance, parentPhone, discord, groups} = item

        dataSource.push({
            key: _id,
            trash: () => {trashUser(item, update, offsetG, delete_all_pupils, add_all_pupils)},
            surname: () => (
                <Link
                    className="link-info"
                    to={`/student/${_id}`}>
                    {surname}
                </Link>
            ),
            name,
            midname,
            dateOfBirth: ReturnAge(dateOfBirth),
            gender,
            phoneNumber: phone,
            tutor: '',
            parentPhoneNumber: parentPhone,
            parentFullname,
            balance: `${balance}`,
            groups: groups ? groups : [],
            discordNickname: discord,
            statuses
        })
    })

    const getColumn = (title, dataIndex) => ({
        title: title,
        dataIndex: dataIndex,
        key: dataIndex
    })

    const columns = [
        {
            title: "",
            dataIndex: "trash",
            key: "trash",
            render: (trash) => {
                if (trash) {
                    return (
                        <i
                            onClick={trash}
                            className="bi bi-trash"
                            style={{
                                fontSize: "30px",
                                color: "#F56767",
                                cursor: "pointer",
                            }}
                        />
                    );
                }
            },
        },
        {
            ...getColumn("Фамилия", "surname"),
            render: (surname) => {
                if (typeof surname == "function") {
                    return surname();
                }
            }
        },
        {
            ...getColumn("Имя", "name")
        },
        {
            ...getColumn("Отчество", "midname")
        },
        {
            ...getColumn("Возраст", "dateOfBirth")
        },
        {
            ...getColumn("Пол", "gender")
        },
        {
            ...getColumn('Статусы', 'statuses'),
            render: (statuses) => {
                if (statuses) {
                    return (
                        statuses.map(status => {
                            const {color, _id, name} = status
                            return (
                                <Tag color={color} key={_id}>{name}</Tag>
                            )
                        })
                    )
                }
            }
        },
        {
            ...getColumn('ФИО Родителя', 'parentFullname')
        },
        {
            ...getColumn(
                "Номер телефона",
                "phoneNumber"
            )
        },
        {
            ...getColumn("Номер телефона родителя", "parentPhoneNumber")
        },
        {
            ...getColumn("Баланс", "balance")
        },
        {
            ...getColumn("Группы", "groups"),
            render: (groups) => {
                if (typeof groups.map == "function") {
                    return (
                        <>
                            {groups.map((item) => (
                                <Tag
                                    color="blue"
                                    key={`${item._id}`}
                                >
                                    {item.group_name}
                                </Tag>
                            ))}
                        </>
                    );
                }
            }
        },
        {
            ...getColumn("Дискорд никнейм", "discordNickname")
        },
    ]

    return (
        <>
            <nav id="navbar-student" className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid d-flex">
                    <div className="collapse d-flex flex-row h3-person">
                        <div className="d-flex plus-box">
                            <div>
                                <h3>Ученики</h3>
                            </div>
                        </div>
                        <CreateStudent/>
                    </div>
                </div>
            </nav>
            <TableL className=''>
                <div>
                    <div className={`table_user`}>
                        <Table
                            pagination={false}
                            dataSource={dataSource}
                            columns={columns}
                            scroll={{x: 0}}>
                        </Table>
                    </div>
                    <Pagination getItem={(offset) => {update(offset, {}, {}, setUsers, setCount)}} count={Count} offset={offsetG} setOffset={setOffsetG}/>
                </div>
            </TableL>
        </>
    )
}

const mapStateToProps = state => ({
    users: state.all_pupils,
    funnel: state.funnel
})
const mapDispatchToProps = {
    setUsers: install_all_pupils,
    setFunnel: install_funnel,
    delete_all_pupils,
    add_all_pupils
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)