import React, {useState} from "react";
import {Button, Checkbox, Input, Menu, Space} from "antd";
import {DeleteOutlined} from '@ant-design/icons'
import {attachStatus, createStatus, onDelete} from './logic-statuses'
import {useParams} from "react-router-dom";

const CreatingStatuses = ({studentStatuses, updateStudent, globalStatuses}) => {

    const student_id = useParams().id
    let statuses_id = studentStatuses.map(status => status._id)

    const [loading, setLoading] = useState(false)
    const [Statuses, setStatuses] = useState(globalStatuses)
    const [value, setValue] = useState('')

    return (
        <>
            <div style={{padding: 8, background: '#fff'}}>
                <Input
                    autoComplete={'off'}
                    value={value}
                    id={'creating-statuses'}
                    placeholder={`Статус...`}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    onPressEnter={() => {
                        createStatus(setStatuses, setLoading, setValue, value, Statuses)
                    }}
                    style={{marginBottom: 8, display: "block"}}
                />
                <Space>
                    <Button
                        loading={loading}
                        type="primary"
                        onClick={() => {
                            createStatus(setStatuses, setLoading, setValue, value, Statuses)
                        }}
                        size="small"
                    >
                        Добавить новый статус
                    </Button>
                </Space>
                <Menu>
                    {
                        Statuses.map(item => {

                            let checked = false


                            studentStatuses.forEach(status_statuses => {
                                if (status_statuses._id === item._id) {
                                    checked = true
                                }
                            })

                            return (
                                <Menu.Item key={item._id}>
                                    <Checkbox
                                        defaultChecked={checked}
                                        onChange={(e) => {

                                            if (e.target.checked) {
                                                statuses_id.push(item._id)
                                            } else {
                                                statuses_id = statuses_id.filter(status_id => (status_id !== item._id))
                                            }
                                        }}>
                                        {item.name}
                                        <DeleteOutlined
                                            onClick={() => {
                                                onDelete(item._id, setStatuses, Statuses, setLoading)
                                            }}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '14px',
                                                color: 'red'
                                            }}
                                        />
                                    </Checkbox>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                <Button
                    loading={loading}
                    type="primary"
                    size="small"
                    onClick={() => {
                        attachStatus(statuses_id, setLoading, updateStudent, student_id)
                    }}
                    style={{marginTop: 10}}
                >
                    Применить изменения
                </Button>
            </div>
        </>
    )
}

export default CreatingStatuses