import React, {useState, useEffect} from 'react';
import url from './../../url/url.js';

import Pagination from './../#function/pagination/pagination.js'


import styled from '@emotion/styled';

import './app.css';
import errorHandler from "../error-handler/error-handler";

const App = () => {

    const axios = require('axios'); // AJAX

    const [Role, setRole] = useState([])

    const [offsetG, setOffsetG] = useState(0)
    const [Count, setCount] = useState(1)

    const [users, setUsers] = useState([
        {name: 'Список пуст', surname: '', midname: '', login: '', role: ''}
    ]);

    const [modalForm2, setModalForm2] = useState(''); // modal-form2
    const [overflowScroll, setOverflowScroll] = useState('overflow-auto'); // overflow-auto

    // Данные из input
    const [dataInp, setDataInp] = useState({});

    let alertWarning = (
        <div className="alert alert-warning" role="alert">
            Загрузка...
        </div>
    );
    let alertSuccess = (
        <div className="alert alert-success" role="alert">
            Готово!
        </div>
    );
    const [alert, setAlert] = useState("");
    const [alertModal, setAlertModal] = useState("");

    // Style
    const [InputBorder, set_I_Border] = useState('');

    const update = (offset = 0) => {

        setAlert(alertWarning);
        fetch(`${url}/AdminPanel/CRMAccounts?limit=10&offset=${offset}&accountType=admin&accountType=manager&accountType=support&accountType=partner&accountType=senior-teacher`, {
            method: 'GET',
            header: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => {
                return response.json()
                setCount(response.headers.count)
            })
            .then((data) => {
                setAlert('');
                setUsers(data);
            });
    };

    const getRole = () => {

        axios({
            method: 'get',
            url: `${url}/AdminPanel/Roles`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then((res) => {
                setRole(res.data)
            })
            .catch(error => {
                if (error.response) {
                }
            })
    }

    useEffect(() => {
        update()
        getRole()
    }, []);

    console.log(users)

    let tableUser = users.map((item) => {

        const trashUser = () => {

            setAlert(alertWarning);

            fetch(`${url}/AdminPanel/CRMAccounts/${item.login}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then((dataJson) => {
                    console.log(dataJson);
                })
                .then(() => {
                    setAlert('');
                    update();
                });
        };

        return (
            <tr key={item.login}>
                <td className="td-trash" scope="row">
                    <i onClick={trashUser} className="bi bi-trash" style={{fontSize: '30px', color: '#F56767'}}></i>
                </td>
                <td className="align-middle td-use">{item.name}</td>
                <td className="align-middle td-use">{item.surname}</td>
                <td className="align-middle td-use">{item.midname}</td>
                <td className="align-middle td-use">{item.login}</td>
                <td className="align-middle td-use">{item.accountType}</td>
            </tr>
        );
    });

    let dataInput = {
        name: dataInp.name,
        surname: dataInp.surname,
        midname: dataInp.midname,
        login: dataInp.login,
        password: dataInp.password,
        role: dataInp.role,
        accountType: dataInp.accountType
    };

    const formSubmit = (e) => {

        setDataInp(dataInput);

        setAlertModal(alertWarning);
        setModalForm2('modal-form2');

        let {name, surname, midname, login, password, role, accountType} = dataInput;


        fetch(`${url}/AdminPanel/CRMAccounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                midname: midname,
                login: login,
                password: password,
                accountType: accountType,
                role: role
            })
        })
            .then((data) => {
                if (data.message === 'THIS_USER_EXISTS') {
                    set_I_Border(' border-red');
                    setAlertModal('');
                } else {
                    setAlertModal(alertSuccess);
                    e.target.reset();
                    update();
                }

                document.querySelector('.btn-close').click() // Закрыть модальное окно
            })
            .catch(error => {
                errorHandler(formSubmit, error)
            })

        e.preventDefault();
    };

    const optionRole = Role.map(role => (
        <option key={role._id} value={role._id}>{role.name}</option>
    ))

    const AddAcaunt = styled.div({
        '.h3Ac, .boxAdd': {
            display: 'inline-block'
        },
        '.boxAdd': {
            marginLeft: '10px'
        }
    })

    return (
        <>
            <AddAcaunt className={`container`}>
                <div className="row">
                    <div className={`table_user ${overflowScroll}`}>
                        <h3 className="h3Ac">Аккаунты</h3>
                        <div className="boxAdd">
                            <div className="d-flex plus-box">
                                <i className="bi bi-person-circle" style={{fontSize: '30px', color: '#0498FA'}}></i>
                                <div
                                    onClick={() => {
                                        setOverflowScroll('overflowH');
                                    }}
                                    className="nav-item plus" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="bi bi-plus" style={{fontSize: '30px', color: '#F56767'}}></i>
                                </div>
                            </div>
                        </div>
                        {alert}
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th className="th-h" scope="col"></th>
                                <th className="th-h align-middle" scope="col">Имя</th>
                                <th className="th-h align-middle" scope="col">Фамилия</th>
                                <th className="th-h align-middle" scope="col">Отчество</th>
                                <th className="th-h align-middle" scope="col">Логин</th>
                                <th className="th-h align-middle" scope="col">Тип аккаунта</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableUser}
                            </tbody>
                        </table>
                    </div>
                    <Pagination getItem={update} count={Count} offset={offsetG} setOffset={setOffsetG}/>
                </div>
            </AddAcaunt>

            <div className="modal fade" tabIndex="-1" id="exampleModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Создать новый аккаунт</h5>
                            <button
                                onClick={() => {
                                    setDataInp(dataInput);
                                    setAlertModal('');
                                    setModalForm2('');
                                    setOverflowScroll('overflow-auto');
                                }}
                                type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="alert-modal">
                            {alertModal}
                        </div>
                        <form className={modalForm2} action="#" method="post"
                              onSubmit={formSubmit}>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <label htmlFor="inputSirname"
                                           className="fs-5 col-sm-2 col-form-label">Фамилия</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(e) => {
                                                dataInput.surname = e.target.value
                                            }}
                                            autoComplete='off'
                                            required
                                            type="name" name="surname" className={`form-control${InputBorder}`}
                                            id="inputSirname"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputName" className="fs-5 col-sm-2 col-form-label">Имя</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(e) => {
                                                dataInput.name = e.target.value
                                            }}
                                            autoComplete='off'
                                            required
                                            type="name" name="name" className={`form-control${InputBorder}`}
                                            id="inputname"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputMidname"
                                           className="fs-5 col-sm-2 col-form-label">Отчество</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(e) => {
                                                dataInput.midname = e.target.value
                                            }}
                                            autoComplete='off'
                                            required
                                            type="name" name="midname" className={`form-control${InputBorder}`}
                                            id="inputMidname"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputLogin" className="fs-5 col-sm-2 col-form-label">Логин</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(e) => {
                                                dataInput.login = e.target.value
                                            }}
                                            autoComplete='off'
                                            required
                                            type="name" name="login" className={`form-control${InputBorder}`}
                                            id="inputLogin"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3"
                                           className="fs-5 col-sm-2 col-form-label">Пароль</label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={(e) => {
                                                dataInput.password = e.target.value
                                            }}
                                            autoComplete='off'
                                            required
                                            type="password" name="password" className={`form-control${InputBorder}`}
                                            id="inputPassword3"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="fs-5 col-sm-4 col-form-label">Тип аккаунта</label>
                                    <div className="col-sm-8 input-group">
                                        <select defaultValue=' ' onChange={(e) => {
                                            dataInput.accountType = e.target.value
                                        }} required className="form-control" id="inputGroupSelect01">
                                            <option defaultValue></option>
                                            <option value="manager">Менеджер</option>
                                            <option value="admin">Администратор</option>
                                            <option value="senior-teacher">Главный учитель</option>
                                            <option value="partner">Партнер</option>
                                            <option value="support">Поддержка</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="fs-5 col-sm-4 col-form-label">Роль</label>
                                    <div className="col-sm-8 input-group">
                                        <select defaultValue=' ' onChange={(e) => {
                                            dataInput.role = e.target.value
                                        }} required className="form-control">
                                            <option defaultValue></option>
                                            {optionRole}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена
                                </button>
                                <button type="submit" className="btn btn-primary">Добавить пользователя</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;