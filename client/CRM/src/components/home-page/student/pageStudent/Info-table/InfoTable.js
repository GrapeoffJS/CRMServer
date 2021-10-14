import React, {useState} from 'react';
import {DatePicker, Dropdown, Menu} from 'antd';

import Url from './../../../../../url/url.js';
import ReturnAge from './../../../return-age/returnAge.js';
import RestrictionMessage from '../../../../restriction-message/restriction-message.js'

import InputMask from 'react-input-mask';

import {loading, Swalclose, Toast} from '../../../../../alert/alert';

// Style
import styled from '@emotion/styled';
import AddStudentGroup from "../add-student-group-/add-student-group-";

const InfoTable = ({dataStudent, updetePage}) => {

    let newInfo = {};

    const axios = require('axios'); // AJAX

    const [visible, setVisible] = useState('')

    const {
        name,
        surname,
        midname,
        gender,
        parentFullname,
        dateOfBirth,
        phone,
        parentPhone,
        discord,
        _id
    } = dataStudent;

    const onChangeInfoItem = () => {

        loading('Изменения загружаются', 'Пожалуйста подождите');

        axios({
            method: 'patch',
            url: `${Url}/CRM/Pupils/${_id}`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: newInfo
        })
            .then((res) => {
                updetePage(res.data)
                Swalclose();
                Toast.fire({
                    icon: 'success',
                    title: 'Изменения сохранены'
                });
            })
            .catch((error) => {
                if (error.response) {
                    RestrictionMessage(error.response.status)
                }
            })
    }

    const InfoTable = styled.ul({
        '.ant-picker': {
            span: {
                margin: '0'
            }
        },
        '.ant-picker-input': {
            input: {
                width: '127px'
            }
        }
    })

    const menuSurname = (
        <Menu>
            <Menu.Item>
                <input
                    placeholder="Поменять фамилию"
                    onChange={(e) => {
                        newInfo = {surname: `${e.target.value}`}
                    }}
                    type="name" className="text-dark form-control col-12"/>
            </Menu.Item>
            <Menu.Item>
			    <span
                    onClick={() => {
                        setVisible('')
                        onChangeInfoItem()
                    }}
                    className="badge bg-warning text-dark save">
				    Сохранить
			    </span>
            </Menu.Item>
        </Menu>
    )
    const menuName = (
        <Menu>
            <Menu.Item>
                <input
                    placeholder="Новое имя"
                    onChange={(e) => {
                        newInfo = {name: `${e.target.value}`}
                    }}
                    type="name" className="text-dark form-control col-12"/>
            </Menu.Item>
            <Menu.Item>
			    <span
                    onClick={() => {
                        setVisible('')
                        onChangeInfoItem()
                    }}
                    className="badge bg-warning text-dark save">
				    Сохранить
			    </span>
            </Menu.Item>
        </Menu>
    )
    const menuMidname = (
        <Menu>
            <Menu.Item>
                <input
                    placeholder="Изменить поле..."
                    onChange={(e) => {
                        newInfo = {midname: `${e.target.value}`}
                    }}
                    type="name" className="text-dark form-control col-12"/>
            </Menu.Item>
            <Menu.Item>
			    <span
                    onClick={() => {
                        onChangeInfoItem()
                        setVisible('')
                    }}
                    className="badge bg-warning text-dark save">
				    Сохранить
			    </span>
            </Menu.Item>
        </Menu>
    )
    const menuParentPhone = (
        <Menu>
            <Menu.Item>
                <InputMask
                    mask='+9 (999) 999-99-99'
                    placeholder="Новый номер"
                    onChange={(e) => {
                        newInfo = {parentPhone: `${e.target.value}`}
                    }}
                    type="name" className="text-dark form-control col-12"/>
            </Menu.Item>
            <Menu.Item>
			    <span
                    onClick={() => {
                        onChangeInfoItem()
                        setVisible('')
                    }}
                    className="badge bg-warning text-dark save">
				    Сохранить
			    </span>
            </Menu.Item>
        </Menu>
    )
    const menuPhone = (
        <Menu>
            <Menu.Item>
                <InputMask
                    mask='+9 (999) 999-99-99'
                    placeholder="Новый номер"
                    onChange={(e) => {
                        newInfo = {phone: `${e.target.value}`}
                    }}
                    type="name" className="text-dark form-control col-12"/>
            </Menu.Item>
            <Menu.Item>
		    	<span
                    onClick={() => {
                        onChangeInfoItem()
                        setVisible('')
                    }}
                    className="badge bg-warning text-dark save">
				    Сохранить
			    </span>
            </Menu.Item>
        </Menu>
    )
    const menuDiscord = (
        <Menu>
            <Menu.Item>
                <input
                    placeholder="Изменить NickName"
                    onChange={(e) => {
                        newInfo = {discord: `${e.target.value}`}
                    }}
                    type="name" className="text-dark form-control col-12"/>
            </Menu.Item>
            <Menu.Item>
		    	<span
                    onClick={() => {
                        onChangeInfoItem()
                        setVisible('')
                    }}
                    className="badge bg-warning text-dark save">
				    Сохранить
			    </span>
            </Menu.Item>
        </Menu>
    )

    return (
        <InfoTable className="list-group list-group-flush">
            <li className="list-group-item">Фамилия: <span className="badge bg-warning text-dark">{surname}</span>
                <div className={`btn-group`}>
                    <Dropdown overlay={menuSurname} visible={() => {
                        if (visible === 'Surname') {
                            return true
                        } else {
                            return false
                        }
                    }} trigger={['click']}>
                        <i className="bi bi-pencil"
                           onClick={() => {
                               if (visible === 'Surname') {
                                   setVisible('')
                               } else {
                                   setVisible('Surname')
                               }
                           }}
                           style={{fontSize: "20px", color: '#17a2b8', cursor: 'pointer'}}
                        ></i>
                    </Dropdown>
                </div>
            </li>
            <li className="list-group-item">Имя: <span className="badge bg-warning text-dark">{name}</span>
                <div className={`btn-group`}>
                    <Dropdown overlay={menuName} visible={() => {
                        if (visible === 'Name') {
                            return true
                        } else {
                            return false
                        }
                    }} trigger={['hover']}>
                        <i onClick={() => {
                            if (visible === 'Name') {
                                setVisible('')
                            } else {
                                setVisible('Name')
                            }
                        }}
                           className="bi bi-pencil"
                           style={{fontSize: "20px", color: '#17a2b8', cursor: 'pointer'}}></i>
                    </Dropdown>
                </div>
            </li>
            <li className="list-group-item">Отчество: <span className="badge bg-warning text-dark">{midname}</span>
                <div className={`btn-group`}>
                    <Dropdown overlay={menuMidname} visible={() => {
                        if (visible === 'Midname') {
                            return true
                        } else {
                            return false
                        }
                    }} trigger={['hover']}>
                        <i className="bi bi-pencil"
                           onClick={() => {
                               if (visible === 'Midname') {
                                   setVisible('')
                               } else {
                                   setVisible('Midname')
                               }
                           }}
                           style={{fontSize: "20px", color: '#17a2b8', cursor: 'pointer'}}></i>
                    </Dropdown>
                </div>
            </li>
            <li className="list-group-item">
                Возраст:
                <span className="badge bg-success text-light">{ReturnAge(dateOfBirth)}</span>
                <DatePicker
                    onChange={(data) => {
                        newInfo = {dateOfBirth: data._d.toISOString()}
                        onChangeInfoItem()
                    }}
                    placeholder='Изменить возраст'
                />
            </li>
            <li className="list-group-item">
                Пол:
                <span className="badge bg-success text-light">{gender}</span>
            </li>
            <li className="list-group-item">
                ФИО Родителя:
                <span className="badge bg-success text-light">{parentFullname}</span>
            </li>
            <li className="list-group-item">Номер родителя: <span
                className="badge bg-info text-light">{parentPhone}</span>
                <div className={`btn-group`}>
                    <Dropdown
                        overlay={menuParentPhone}
                        visible={() => {
                            if (visible === 'ParentPhone') {
                                return true
                            } else {
                                return false
                            }
                        }}>
                        <i className="bi bi-pencil"
                           onClick={() => {
                               if (visible === 'ParentPhone') {
                                   setVisible('')
                               } else {
                                   setVisible('ParentPhone')
                               }
                           }}
                           style={{fontSize: "20px", color: '#17a2b8', cursor: 'pointer'}}></i>
                    </Dropdown>
                </div>
            </li>
            <li className="list-group-item">Номер ученика: <span className="badge bg-warning text-dark">{phone}</span>
                <div className={`btn-group`}>
                    <Dropdown
                        overlay={menuPhone}
                        visible={() => {
                            if (visible === 'Phone') {
                                return true
                            } else {
                                return false
                            }
                        }}>
                        <i className="bi bi-pencil"
                           onClick={() => {
                               if (visible === 'Phone') {
                                   setVisible('')
                               } else {
                                   setVisible('Phone')
                               }
                           }}
                           style={{fontSize: "20px", color: '#17a2b8', cursor: 'pointer'}}></i>
                    </Dropdown>
                </div>
            </li>
            <li className="list-group-item">Discord: <span className="badge bg-light text-dark">{discord}</span>
                <div className={`btn-group`}>
                    <Dropdown
                        className='Discord'
                        overlay={menuDiscord}
                        visible={() => {
                            return visible === 'Discord';
                        }}>
                        <i
                            className="bi bi-pencil"
                            onClick={() => {
                                if (visible === 'Discord') {
                                    setVisible('')
                                } else {
                                    setVisible('Discord')
                                }
                            }}
                            style={{fontSize: "20px", color: '#17a2b8', cursor: 'pointer'}}
                        ></i>
                    </Dropdown>
                </div>
            </li>
            <li
                className="list-group-item">
                Группы: <AddStudentGroup data={dataStudent} updatePage={updetePage}/>
            </li>
        </InfoTable>
    );
}

export default InfoTable;