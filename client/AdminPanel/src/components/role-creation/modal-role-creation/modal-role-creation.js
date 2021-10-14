import React, {useState} from "react"
import {
    Modal,
    Button,
    List,
    Input,
    Switch
} from 'antd'
import styled from '@emotion/styled'

import Url from './../../../url/url.js'
import {swallErr, swallGood} from '../../../alert/alert'

const ModalRoleCreation = ({dataRole, setDataRole, setSkeletonShow}) => {

    const axios = require('axios'); // AJAX

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ValueName, setValueName] = useState('')

    let actionPermissionsForm = {},
        dataPermissionsForm = {
            forPupil: {
                phone: undefined,
                parentPhone: undefined,
                parentNSM: undefined,
                balance: undefined,
                discord: undefined,
                paymentHistory: undefined,
                notes: undefined,
                localSchedule: undefined,
                groups: undefined,
                name: 1,
                surname: 1,
                midname: 1,
                statuses: undefined
            },
            forGroup: {
                groupsHistory: undefined,
                tutors: undefined,
                group_name: undefined,
                level: undefined,
                tutor: undefined,
                pupils: undefined,
                places: undefined,
                global_schedule: undefined
            }
        },
        nameRole = ValueName

    const showModal = () => {
        setIsModalVisible(true);
        setValueName('')
    };

    const handleOk = () => {

        if (Object.keys({...actionPermissionsForm}).length && nameRole) {

            setSkeletonShow(true)

            axios({
                method: 'post',
                url: `${Url}/AdminPanel/Roles`,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: {
                    name: nameRole,
                    actionPermissions: Object.values(actionPermissionsForm),
                    dataPermissions: {...dataPermissionsForm}
                }
            })
            .then(res => {
                let {data} = res
                let box = [...dataRole, data]

                swallGood('Готово', `Роль "${data.name}" создана`)
                setDataRole(box)
                setSkeletonShow(false)
            })
            .catch(error => {
                if (error.response) {
                    setSkeletonShow(false)
                }
            })

            setIsModalVisible(false)
        } else {
            swallErr('Ой...', 'Придумайте название и выберите хотя бы одно действие')
            setValueName(nameRole)
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    let actionPermissions = [
        ['Создать группу', 0],
        ['Изменить группу', 1],
        ['Удалить группу', 2],
        ['Получить список групп', 3],
        ['Просмотреть страницу группы', 4],
        ['Установить расписание группы', 5],
        ['Обновить расписание учеников', 6],
        ['Добавить учеников в группу', 7],
        ['Удалить ученика из группы', 8],
        ['Добавить учителя', 9],
        ['Создать ученика', 10],
        ['Изменить ученика', 11],
        ['Удалить ученика', 12],
        ['Получить список учеников', 13],
        ['Зайти на страницу ученика', 14],
        ['Импортировать файл', 15],
        ['Создать платеж', 16],
        ['Создать заметку', 17],
        ['Удалить заметку', 18],
        ['Использовать поиск', 19],
        ['Воронка продаж', 20]
    ].map(actionData => (
        <List.Item key={actionData[1]}>
            {actionData[0]}
            <Switch
                onChange={checked => {
                    if (checked) {
                        actionPermissionsForm[actionData[0]] = actionData[1]
                    } else {
                        delete actionPermissionsForm[actionData[0]]
                    }
                }}
                style={{position: "absolute", right: "15px"}}/>
        </List.Item>
    ))

    let dataPermissionsPupils = [
        ['Телефон', 'phone'],
        ['Родительский телефон', 'parentPhone'],
        ['Список групп', 'groups'],
        ['Баланс', 'balance'],
        ['Discord', 'discord'],
        ['Историю платежей', 'paymentHistory'],
        ['Заметки', 'notes'],
        ['Расписание ученика', 'localSchedule'],
        ['Фамилия, Имя, Отчество родителя', 'parentFullname'],
        ['Этап воронки продаж', 'salesFunnelStep'],
        ['Возраст', 'dateOfBirth'],
        ['Пол', 'gender'],
        ['Преподавателей ученика', 'tutors'],
        ['Статусы', 'statuses']
    ].map(SeeData => (
        <List.Item key={SeeData[1]}>
            {SeeData[0]}
            <Switch
                // defaultChecked={false}
                onChange={checked => {
                    if (checked) {
                        dataPermissionsForm.forPupil[SeeData[1]] = 1
                    } else {
                        dataPermissionsForm.forPupil[SeeData[1]] = undefined
                    }
                }}
                style={{position: "absolute", right: "15px"}}/>
        </List.Item>
    ))

    let dataPermissionsGroups = [
        ['Историю групп', 'groupsHistory'],
        ['Имя группы', 'group_name'],
        ['Уровень группы', 'level'],
        ['Учителей группы', 'tutor'],
        ['Учеников группы', 'pupils'],
        ['Количество мест в группе', 'places'],
        ['Расписание группы', 'global_schedule']
    ].map(SeeData => (
        <List.Item key={SeeData[1]}>
            {SeeData[0]}
            <Switch
                // defaultChecked={true}
                onChange={checked => {
                    if (checked) {
                        dataPermissionsForm.forGroup[SeeData[1]] = 1
                    } else {
                        dataPermissionsForm.forGroup[SeeData[1]] = undefined
                    }
                }}
                style={{position: "absolute", right: "15px"}}/>
        </List.Item>
    ))

    const CreationRole = styled.div({
        display: 'inline',
        '& > button': {
            marginLeft: '10px',
            fontSize: '13px',
            height: '30px'
        }
    })

    return (
        <CreationRole>
            <Button type="primary" onClick={showModal}>
                Создать роль
            </Button>
            <Modal
                width={1000}
                title="Создание роли"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <List

                    size="small"
                    bordered={false}
                >
                    <List.Item>
                        Название роли: <Input onChange={(e) => {
                        nameRole = e.target.value
                    }} defaultValue={ValueName}/>
                    </List.Item>
                    <div style={{display: 'flex'}}>
                        <div className="boxLeft col-6" style={{position: 'relative'}}>
                            <List.Item style={{fontSize: "16px", fontWeight: "500"}}>
                                Разрешённые действия:
                            </List.Item>
                            {actionPermissions}
                        </div>
                        <div className="boxRights col-6">
                            <List.Item style={{fontSize: "16px", fontWeight: "500"}}>
                                Можно видеть:
                            </List.Item>
                            {dataPermissionsPupils}
                            {dataPermissionsGroups}
                        </div>
                    </div>
                </List>
            </Modal>
        </CreationRole>
    )
}

export default ModalRoleCreation