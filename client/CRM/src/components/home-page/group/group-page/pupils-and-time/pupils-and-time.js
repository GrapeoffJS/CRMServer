import React, {useState, useEffect} from 'react';
import {Menu, Dropdown, Popover} from 'antd';

import Url from './../../../../../url/url.js';
import {swallErr} from '../../../../../alert/alert';
import RestrictionMessage from '../../../../restriction-message/restriction-message.js'

import Change_Balance from './../../../change-balance/changeBalance.js';

import moment from 'moment';
import {Link} from "react-router-dom";
// Style 
import styled from '@emotion/styled';
import errorHandler from "../../../../error-handler/error-handler";
import {Div_box, Span} from "./pupils-and-time.style";

const axios = require('axios'); // AJAX

const PupilsAndTime = ({itemG, dataGroup, getGroup_Id, setData, surname, name, pageInfo, type}) => {

    const [visibleNumber, setVisibleNumber] = useState('-1')

    const [fixedSchedule, setFixedSchedule] = useState(['fixedSchedule-H', '', 'bi-plus-circle']);

    let ScheduleItem = itemG.localSchedule[`${dataGroup}`] ? itemG.localSchedule[`${dataGroup}`] : []

    const [dataS, setDataS] = useState(ScheduleItem);


    const revers = () => {
        if (fixedSchedule[0] === 'fixedSchedule-H') {
            setFixedSchedule(['scheblueFixet', ' global-fon3000', 'bi-x-circle']);
        } else {
            setFixedSchedule(['fixedSchedule-H', '', 'bi-plus-circle']);
        }
    }

    const addNotes = (name, axiosPut = () => {
    }) => {
        axios({
            method: 'post',
            url: `${Url}/CRM/Pupils/${itemG._id}/Notes`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: {
                text: name
            }
        })
            .then(() => {
                axiosPut()
            })
            .catch((error) => {
                errorHandler(() => {
                    addNotes(name, axiosPut)
                }, error, getGroup_Id)
            })
    }

    const [Abic, setAbic] = useState([]);

    const getAbic = () => {
        axios({
            method: "get",
            url: `${Url}/CRM/Subscriptions`,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
            },
        })
            .then((res) => {
                setAbic(res.data);
            })
            .catch((error) => {
                errorHandler(getAbic, error)
            });
    }

    const axiosPut = (mass, ChangeBalic = () => {
    }) => {
        axios({
            method: 'put',
            url: `${Url}/CRM/Groups/${dataGroup}/Pupils/${itemG._id}/Schedule`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: mass
        })
            .then(() => {
                ChangeBalic()
            })
            .catch((error) => {
                errorHandler(() => {
                    axiosPut(mass, ChangeBalic)
                }, error)
            });
    }

    const liAbic = Abic.map((abic, i) => {

        const PaySubscription = () => {
            let arr = [...dataS];

            let n = 0,
                index = 0;
            while (n < abic.hoursCount) {
                if (!arr[index].paid && arr[index].status !== 1) {
                    arr[index].paid = true;
                    n++;
                }
                index++;
            }

            axiosPut(arr, () => {
                Change_Balance(`-${abic.price}`, itemG._id, setData, abic._id, dataGroup, () => {
                    axiosPut(arr)
                })
            });
            setDataS(arr);
        }
        return (
            <Menu.Item key={i} className="li">
				<span
                    onClick={PaySubscription}
                    className="dropdown-item bg-info text-light"
                >
					{abic.name}
				</span>
            </Menu.Item>);
    });

    const menu = (
        <Menu>
            {liAbic}
        </Menu>
    )

    useEffect(() => {
        getAbic();
    }, []);

    let index = 1;

    let SchedulePupils = dataS.map((item, i) => {
        let marginRight = 0;
        if (index === 8) {
            marginRight = 27;
            index = 1;
        } else {
            index++;
        }

        let day = moment(item.date, 'DD.MM.YYYY').format('DD.MM');

        let color = '#f8f9fa',
            opacity = '1';

        let time = moment(item.date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
            time_day = moment().diff(time, 'day');

        if (item.status === 1) {
            color = '#000';
        } else if (item.paid && item.status !== 3 && time_day <= 0) {
            color = '#17a2b8';
        } else if (item.status === 3 && time_day <= 0) {
            color = '#6c757d'
        } else if (item.status === 3 && item.paid) {
            color = '#dc3545';
        } else if (time_day > 0 && item.paid) {
            color = '#28a745';
        } else if (time_day > 0 && !item.paid && item.status !== 3) {
            color = '#28a745';
            opacity = '0.5';
        } else if (time_day > 0 && !item.paid && item.status === 3) {
            color = '#dc3545';
            opacity = '0.5';
        }

        const changeDayIndex = (index) => {
            let arr = [...dataS];

            const setStatus = () => {
                arr[i].status = index;

                axiosPut(arr);
                setDataS(arr);
            }

            if (index === 1) {
                setStatus()
            } else if (index === 2 && arr[i].status === 3) {
                setStatus()
            } else if (index === 3 && time_day < 0) {
                setStatus()
            } else if (index !== 3 && index !== 2) {
                arr[i].title = index;
                addNotes(index, () => {
                    axiosPut(arr)
                })
                setDataS(arr);
            } else {
                swallErr('Не возможно установить статус');
            }
        };

        const Item = styled.span({
            marginRight: `${marginRight}px`
        })

        let title = item.title
        let colorTitle = '';
        if (item.title) {
            colorTitle = '#ffc107';
        } else if (item.status === 1) {
            colorTitle = '#fff'
        }

        const menuItem = (
            <Menu key={day}>
                <Menu.Item key={`${day}1`}>
                    <span
                        onClick={() => {
                            changeDayIndex(3)
                        }}
                        className="dropdown-item bg-secondary text-light">
                        Пропустил
                    </span>
                </Menu.Item>
                <Menu.Item key={`${day}2`}>
                    <span
                        onClick={() => {
                            changeDayIndex(2)
                        }}
                        className="dropdown-item bg-success text-light"
                    >
                        Урок пройден
                    </span>
                </Menu.Item>
                <Menu.Item key={`${day}4`}>
                    <span
                        style={{
                            background: '#000'
                        }}
                        onClick={() => {
                            changeDayIndex(1)
                        }}
                        className="dropdown-item text-light"
                    >
                        Урока не будет/не было
                    </span>
                </Menu.Item>
                <Menu.Item key={`${day}3`}>
                    <div className="input-group">
								<span
                                    onClick={() => {
                                        changeDayIndex(title)
                                        setVisibleNumber('')
                                    }}
                                    className="input-group-text bg-info text-light"
                                >
									Сохранить
								</span>
                        <textarea
                            placeholder='Оставьте заметку...'
                            defaultValue={title}
                            onChange={(e) => {
                                title = e.target.value
                            }}
                            className="form-control" aria-label="With textarea"
                        />
                    </div>
                </Menu.Item>
            </Menu>
        )

        let visibleLocal = false

        if (visibleNumber === i) {
            visibleLocal = true
        } else if (visibleNumber === '') {
            visibleLocal = false
        }

        return (
            <Item key={`${day}${i}`}>
                <Span className="btn-group">
                    <Dropdown
                        overlay={menuItem}
                        visible={visibleLocal}
                        trigger={['click']}
                    >
                        <button
                            type="button"
                            style={{color: `${colorTitle}`, background: `${color}`, opacity: `${opacity}`}}
                            className={`btn dropdown-toggle`}
                            onClick={() => {
                                if (visibleNumber === i) {
                                    setVisibleNumber('')
                                } else {
                                    setVisibleNumber(i)
                                }
                            }}
                        >
                            {day}
                        </button>
                    </Dropdown>
                </Span>
            </Item>
        );
    });

    let urlPage = itemG._id,
        page = 'student';
    if (pageInfo) {
        page = pageInfo;
        urlPage = dataGroup;
    }
    let LinkItem = (
        <Link
            to={`/${page}/${urlPage}`}>
            <h4>{`${surname} ${name}`}</h4>
        </Link>
    );

    let oplata = ''

    let jwt = require('jsonwebtoken');
    if (jwt.decode(localStorage.getItem('tokenID')).accountType !== 'teacher') {
        oplata = (
            <span>
					<Span className="btn-group">
						<Dropdown overlay={menu} trigger={['click']}>
							<button
                                type="button"
                                className={`btn btn-success dropdown-toggle btnAbic`}
                            >
								Оплатить
							</button>
						</Dropdown>
					</Span>
				</span>
        )
    }

    const deletePupils = () => {

        axios({
            method: 'delete',
            url: `${Url}/CRM/Groups/${dataGroup}/Pupils/${itemG._id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
            .then(res => {

                let {group, pupil} = res.data

                if (type === 'group') {
                    setData(group)
                } else if (type === 'pupil') {
                    setData(pupil)
                }
            })
            .catch(error => {
                if (error.response) {
                    RestrictionMessage(error.response.status)
                }
            })
    }

    return (
        <Div_box key={itemG._id} className="table">
            <div className="pupils-item row">
                <div className="col-12">
                    {LinkItem}
                    {oplata}
                </div>
                <div className={`col-12${fixedSchedule[1]}`}>
                    <div className="boxDay">
                        <div className={`${fixedSchedule[0]}`}>
                            {SchedulePupils}
                        </div>
                    </div>
                    <i onClick={() => {
                        revers()
                    }} className={`bi ${fixedSchedule[2]}`}/>
                    <Popover
                        title={'Внимание'}
                        content={'Удаление ученика из группы'}
                        placement="right"
                        trigger={'hover'}
                    >
                        <i
                            onClick={deletePupils}
                            className='bi bi-trash'
                            style={{color: 'rgb(245, 103, 10', marginLeft: '10px'}}/>
                    </Popover>
                </div>
            </div>
        </Div_box>
    );
};

PupilsAndTime.defaultProps = {
    surname: ''
}

export default PupilsAndTime;