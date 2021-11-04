import React, {useState, useEffect} from 'react';
import Url from './../../../url/url.js';
import {swallGood, swallErr} from '../../../alert/alert';
import Pagination from './../#more-functions/pagination/pagination.js'
import RestrictionMessage from '../../restriction-message/restriction-message.js'
import AddingStudentsToGroup from './adding-students-to-group'

import {Link} from "react-router-dom";
import {Modal, Button} from 'antd';

// Style
import './group.css';
import {Table, Form} from './group-style'
import errorHandler from "../../error-handler/error-handler";

const axios = require('axios'); // AJAX

const Group = () => {

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // /Modal

    const [offsetG, setOffsetG] = useState(0)
    const [Count, setCount] = useState(1)

    const [availableStudents, setAvailableStudents] = useState(['Пусто...']);
    const [PUPILS_search, setPUPILS_search] = useState([]);
    const [availableTutor, setAvailableTutor] = useState([]);

    const [groups, setGroups] = useState([]);

    // Получить учеников
    const getPupils = () => {
        axios({
            method: 'post',
            url: `${Url}/CRM/Pupils/find?limit=150&offset=0`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
        .then((res) => {
            let arr = [];
            res.data.forEach((item) => {
                arr.push([`${item.surname} ${item.name}`, item._id]);
            });
            setAvailableStudents(arr);
            setPUPILS_search(arr);
        })
        .catch((error) => {
            errorHandler(update, error)
        });
    }

    // Получить группы
    const getGroup = (offset = 0) => {
        axios({
            method: 'post',
            url: `${Url}/CRM/Groups/find?limit=10&offset=${offset}`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
        .then((res) => {
            let {data, headers} = res
            setGroups(data)
            setCount(headers.count)
        })
        .catch((error) => {
            errorHandler(update, error)
        })
    }

    const getTUTOR = (offset = 0) => {
        axios({
            method: 'get',
            url: `${Url}/AdminPanel/CRMAccounts?limit=10&offset=${offset}&accountType=teacher`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
        .then((res) => {
            let {data} = res
            setAvailableTutor(data)
        })
        .catch((error) => {
            errorHandler(getTUTOR, error)
        })
    }

    const update = () => {
        getTUTOR();
        getPupils();
        getGroup(offsetG);
    };

    useEffect(() => {
        update();
    }, []);

    let A_Tutor = availableTutor.map((item, i) => {
        let {name, surname, midname, _id} = item
        return (
            <option key={name + i} value={_id}>{surname} {name} {midname}</option>
        );
    });

    const [pupils, setPupils] = useState([]);

    const [group_name, setGROUP_NAME] = useState(''),
        [places, setPLACES] = useState(''),
        [tutor, setTUTOR] = useState(''),
        [level, setLEVEL] = useState('');

    let dataInput = {
        group_name,
        places,
        tutor,
        level
    };

    const addingStudentSafely = (newArr) => {

        const {group_name, places, tutor, level} = dataInput

        setGROUP_NAME(group_name)
        setPLACES(places)
        setTUTOR(tutor)
        setLEVEL(level)
        setPupils(newArr)
    }

    let tableGroup = groups.map((item) => {

        const trashGroup = () => {

            let i = document.getElementById(item._id);
            i.style.opacity = '0.3';

            axios({
                method: "DELETE",
                url: `${Url}/CRM/Groups/${item._id}`,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
                },
            })
            .then((res) => {
                getGroup(offsetG);
                i.style.opacity = '1';
            })
            .catch((error) => {
                errorHandler(trashGroup, error)
            });
        };

        const {group_name, tutor, level, places, pupils, global_schedule, _id} = item;

        let PUPILS01 = pupils? pupils : []

        let tutorText = 'Учитель не добавлен...',
            time = '-'

        if (global_schedule) {
            if (global_schedule[0]) {

                let {duration} = global_schedule[0]

                time = `с ${duration[0]} до ${duration[1]}`
            }
        }

        if (tutor) {
            let {surname, name, midname} = tutor
            tutorText = `${surname} ${name} ${midname}`
        }

        return (
            <tr key={`${_id}`}>
                <td className="td-trash" scope="row">
                    <i id={_id} onClick={trashGroup} className="bi bi-trash"
                       style={{fontSize: '30px', color: '#F56767'}}></i>
                </td>
                <td className="align-middle td-use">
                    <Link
                        className="link-info"
                        to={`/group/${_id}`}>
                        {group_name}
                    </Link>
                </td>
                <td className="align-middle td-use">{tutorText}</td>
                <td className="align-middle td-use">{level} класс</td>
                <td className="align-middle td-use">{places}</td>
                <td className="align-middle td-use">{places - PUPILS01.length}</td>
                <td className="align-middle td-use">{time}</td>
            </tr>
        );

    });

    const formSubmit = () => {

        let {group_name, places, tutor, level} = dataInput; // + pupils

        let PUPILS_ID = [];
        pupils.forEach((item) => {
            PUPILS_ID.push(item.id);
        });

        setLoading(true)

        axios({
            method: "POST",
            url: `${Url}/CRM/Groups`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
            },
            data: {
                group_name: group_name,
                tutor: tutor || undefined,
                level: +level,
                places: +places,
                pupils: PUPILS_ID
            }
        })
        .then((res) => {
            setLoading(false)
            swallGood('Группа создана', 'Теперь добавьте расписание');
            setIsModalVisible(false)
            getGroup();
            setGROUP_NAME('')
            setPupils([])
            setPLACES('')
            setTUTOR('')
            setLEVEL('')

        })
        .catch((error) => {
            setLoading(false)
            if (error.response) {
                RestrictionMessage(error.response.status)
                let {status} = error.response;

                if (status == 400) {
                    if (+places < PUPILS_ID.length) {
                        swallErr('Ой...', 'Мест для учеников не хватает');
                    } else {
                        swallErr('Ой...', 'Заполните поля правильно');
                    }
                } else if (status == 401) {
                    swallErr('Ой...', 'Где токен ?');
                } else if (status == 500) {
                    swallErr('Произошла поломка сервера', 'Сообщите об ошибке владельцу сервиса')
                }
            }
        });
    };

    return (
        <>
            <nav id="navbar-student" className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid d-flex">
                    <div className="collapse d-flex flex-row h3-person">
                        <div className="d-flex plus-box">
                            <div>
                                <h3>Группы</h3>
                            </div>
                        </div>
                    </div>
                    <div className="collapse d-flex flex-row-reverse" id="navbarScroll">
                        <div className="d-flex plus-box">
                            <div className="nav-item plus" onClick={showModal}>
                                <i className="bi bi-people" style={{fontSize: '38px', color: '#F56767'}}></i>
                                <i className="bi bi-plus" style={{fontSize: '30px', color: '#F56767'}}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Table className=''>
                <div>
                    <div className={`table_user`}>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th className="th-h" scope="col"></th>
                                <th className="th-h align-middle" scope="col">Группы</th>
                                <th className="th-h align-middle" scope="col">Учитель</th>
                                <th className="th-h align-middle" scope="col">Уровень</th>
                                <th className="th-h align-middle" scope="col">Количество мест</th>
                                <th className="th-h align-middle" scope="col">Свободных мест</th>
                                <th className="th-h align-middle" scope="col">Время занятий</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableGroup}
                            </tbody>
                        </table>
                    </div>
                    <Pagination getItem={getGroup} count={Count} offset={offsetG} setOffset={setOffsetG}/>
                </div>
            </Table>

            <Modal
                title="Добавить группу"
                visible={isModalVisible}
                onCancel={handleCancel}
                width={1000}
                footer={[
                    <Button key="onCancel1" onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button
                        key="onOk1"
                        onClick={formSubmit}
                        loading={loading}
                        type="primary"
                    >
                        Сохранить
                    </Button>
                ]}
            >
                <Form>
                    <div className="modal-body">
                        <div className="row mb-3">
                            <label htmlFor="inputName" className="fs-5 col-sm-4 col-form-label">Имя группы</label>
                            <div className="col-sm-8">
                                <input defaultValue={dataInput.group_name} autoComplete='off' onChange={(e) => {
                                    dataInput.group_name = e.target.value
                                }} required type="name" name="group_name" className={`form-control`} id="group_name"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputMidname" className="fs-5 col-sm-4 col-form-label">Количество
                                мест</label>
                            <div className="col-sm-8">
                                <input defaultValue={dataInput.places} autoComplete='off' onChange={(e) => {
                                    dataInput.places = e.target.value
                                }} required type="number" name="places" className={`form-control`} id="places"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputSirname" className="fs-5 col-sm-4 col-form-label">Уровень
                                подготовки</label>
                            <div className="col-sm-8 input-group">
                                <select defaultValue={dataInput.level} onChange={(e) => {
                                    dataInput.level = e.target.value
                                }} required className="form-control" id="inputGroupSelect01">
                                    <option defaultValue></option>
                                    <option value="1">1 класс</option>
                                    <option value="2">2 класс</option>
                                    <option value="3">3 класс</option>
                                    <option value="4">4 класс</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="fs-5 col-sm-4 col-form-label">Учитель</label>
                            <div className="col-sm-8 input-group">
                                <select defaultValue={dataInput.tutor} onChange={(e) => {
                                    dataInput.tutor = e.target.value
                                }} className="form-control">
                                    <option defaultValue></option>
                                    {A_Tutor}
                                </select>
                            </div>
                        </div>
                        <AddingStudentsToGroup addStudent={addingStudentSafely} addedStudents={pupils}/>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default Group;