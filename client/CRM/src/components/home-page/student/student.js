import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'

import Url from '../../../url/url.js'
import ReturnAge from './../return-age/returnAge.js' // Определяет возраст
import Pagination from './../#more-functions/pagination/pagination.js' // Pagination
import {SalesFunnelModal} from './../sales-funnel/sales-funnel-modal'
import {getFunnel, update, trashUser} from "./service-student/service-student";

// Библиотеки
import './student.css'

import {Link} from "react-router-dom"

import styled from '@emotion/styled'

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

const Student = () => {

    const [offsetG, setOffsetG] = useState(0)
    const [Count, setCount] = useState(0)
    const [funnel, setFunnel] = useState([{_id: ''}])

    const [users, setUsers] = useState([
        {
            _id: '45343235456645',
            surname: "Список пуст...",
            name: "",
            midname: "",
            dateOfBirth: "2004-12-07",
            gender: "",
            phoneNumber: "",
            parentPhoneNumber: "",
            discordNickname: "",
            groups: [],
            parentFullname: '',
            statuses: []
        }
    ])

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
            trash: () => {trashUser(item, update, offsetG, setUsers, setCount)},
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
            <SalesFunnelModal
                loader={{
                    loaded: true, setLoaded: () => {}
                }}
                status={1}
                funnel={funnel[0]? funnel : [{_id: ''}]}
                pageSize={8}
                Url={Url}
                pupils={{
                    pupilsList: [], setPupilsList: () => {}
                }}
                bigIcon={true}
                update={() => {update(0, {}, {}, setUsers, setCount)}}
                defaultValueOptionFunnel={(<option value='' defaultValue></option>)}
            />
        </>
    )
}

export default Student