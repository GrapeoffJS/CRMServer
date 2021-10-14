import React, {useState, useEffect} from 'react';
import {Menu, Dropdown, Popover} from 'antd';

import Url from './../../../../../url/url.js';
import localStorage_change from './../../../../../#localStorage_change.js';
import {swallErr} from './../../../../../alert/alert.js';
import RestrictionMessage from '../../../../restriction-message/restriction-message.js'

import Change_Balance from './../../../change-balance/changeBalance.js';

import moment from 'moment';
import {Link} from "react-router-dom";
// Style 
import styled from '@emotion/styled';

const PupilsSandTime = ({itemG, dataGroup, getGroup_Id, setData, surname, name, pageInfo, type}) => {

    const axios = require('axios'); // AJAX

    const [visibleNumber, setVisibleNumber] = useState('-1')
    // const [trigger, setTrigger] = useState('click')

    const [fixedSchedule, setFixedSchedule] = useState(['fixedSchedule-H', '', 'bi-plus-circle']);

    let ScheduleItem = itemG.localSchedule[`${dataGroup}`] ? itemG.localSchedule[`${dataGroup}`] : []

    const [dataS, setDataS] = useState(ScheduleItem);
    // const [dataS, setDataS] = useState([]);


    const revers = () => {
        if (fixedSchedule[0] == 'fixedSchedule-H') {
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
            // getGroup_Id()
            axiosPut()
        })
        .catch((error) => {
            if (error.response) {
                RestrictionMessage(error.response.status)
                getGroup_Id()
            }
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
            if (error.response) {
                RestrictionMessage(error.response.status)
                let {status, data, statusText} = error.response;

                if (status == 404) {
                    swallErr("Error 404", "Сервер не найден");
                } else if (status == 401) {
                    if (data.message == "TOKEN_EXPIRED") {
                        localStorage_change(error.response.data.token);
                        getGroup_Id();
                    } else {
                        localStorage.removeItem("tokenID");
                        window.location.replace("/");
                    }
                }
            }
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
        .then((res) => {
            ChangeBalic()
        })
        .catch((error) => {
            if (error.response) {
                RestrictionMessage(error.response.status)
                let {status, data, statusText} = error.response;

                if (status == 404) {

                    swallErr('Error 404', 'Сервер не найден');

                } else if (status == 401) {

                    if (data.message == 'TOKEN_EXPIRED') {

                        localStorage_change(error.response.data.token);
                        getGroup_Id();
                    } else {
                        localStorage.removeItem('tokenID');
                        window.location.replace("/");
                    }
                }
            }
        });
    }

    const liAbic = Abic.map((abic, i) => {

        const PaySubscription = () => {
            let arr = [...dataS];

            let n = 0,
                index = 0;
            while (n < abic.hoursCount) {
                if (!arr[index].paid) {
                    arr[index].paid = true;
                    n++;
                }
                index++;
            }

            let updete = () => {
            }; // Не обращяй внимание.

            axiosPut(arr, () => {
                Change_Balance(`-${abic.price}`, itemG._id, updete, getGroup_Id, abic._id, dataGroup, () => {
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
                    href="#">
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

    const breakpoints = [780, 1380, 2002], // 619, 1238, 1857, > 2476
        mq = breakpoints.map(
            bp => `@media (max-width: ${bp}px)`
        ),
        mqMin = breakpoints.map(
            bp => `@media (min-width: ${bp}px)`
        );


    const Div_box = styled.div({
        borderBottom: '1px solid #91A8B0',
        paddingBottom: '5px',
        marginBottom: '5px',
        i: {
            color: '#17a2b8',
            fontSize: '26px',
            cursor: 'pointer',
            paddingTop: '10px'
        },
        '.global-fon3000': {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '99',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.6)',
            overflowY: 'scroll',
            i: {
                position: 'fixed',
                top: '3px',
                left: '7px',
                color: '#fff'
            },
            '.bi-trash': {
                display: 'none'
            }
        },
        h4: {
            display: 'inline-block',
            marginRight: '10px',
            marginBottom: '19px'
        },
        '.fixedSchedule-H': {
            maxHeight: '81px',
            overflow: 'hidden'
        },

        '.scheblueFixet': {
            margin: '0 auto',
            marginTop: '50px',
            width: '86%'
        },
        '.fixedSchedule-H, .scheblueFixet': {
            overflow: 'hidden',
            width: '2476px',
            [mq[2]]: {
                width: '1857px'
            },
            [mq[1]]: {
                width: '1238px'
            },
            [mq[0]]: {
                width: '619px'
            },
        },
        '.boxDay': {
            overflowX: 'auto',
            padding: '0 0 10px 0',
            '&::-webkit-scrollbar': {
                height: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#17a2b8',
                borderRadius: '10px'
            }
        }
    });

    let Span = styled.div({ // День из расписания ученика.
        margin: '0 3px 0 0',
        position: 'initial',
        button: {
            fontSize: '15px',
            fontWeight: '600',
            padding: '1px 7px',
            width: '71px'
        },
        '.btnAbic': {
            width: '100%'
        },
        ul: {
            border: 'none',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '6px'
        },
        '.li': {
            border: 'none',
            background: 'rgba(0, 0, 0, 0)',
            span: {
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer'
            },
            '.input-group-text': {
                margin: '0',
                borderRadius: '6px 0 0 6px'
            },
            textarea: {
                padding: '2px 7px',
                fontWeight: '500'
            }
        }
    });

    let SchedulePupils;

    let index = 1;

    SchedulePupils = dataS.map((item, i) => {
        let marginRight = 0;
        if (index == 8) {
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

        if (item.paid & item.status != 3 & time_day <= 0) {
            color = '#17a2b8';
        } else if (item.status == 3 & time_day <= 0) {
            color = '#6c757d'
        } else if (item.status == 3 & item.paid) {
            color = '#dc3545';
        } else if (time_day > 0 & item.paid) {
            color = '#28a745';
        } else if (time_day > 0 & !item.paid & item.status != 3) {
            color = '#28a745';
            opacity = '0.5';
        } else if (time_day > 0 & !item.paid & item.status == 3) {
            color = '#dc3545';
            opacity = '0.5';
        }

        const changeDayIndex = (index) => {
            let arr = [...dataS];

            if (index == 2 & arr[i].status == 3) {
                arr[i].status = index;

                axiosPut(arr);
                setDataS(arr);

            } else if (index == 3 & time_day < 0) {
                arr[i].status = index;

                axiosPut(arr);
                setDataS(arr);
            } else if (index !== 3 & index !== 2) {
                arr[i].title = index;
                addNotes(index, () => {
                    axiosPut(arr)
                })
                // changeSchedule(arr);
                setDataS(arr);
            } else {
                swallErr('Не возможно установить статус');
            }
        };

        const Item = styled.span({
            marginRight: `${marginRight}px`
        })
        let title = '';
        let colorTitle = '';
        if (item.title) {
            colorTitle = '#ffc107';
        }

        const menuItem = (
            <Menu key={day}>
                <Menu.Item key={`${day}1`}>
                    <span onClick={() => {
                        changeDayIndex('3')
                    }} className="dropdown-item bg-secondary text-light" href="#">Пропустил</span>
                </Menu.Item>
                <Menu.Item key={`${day}2`}>
                    <span onClick={() => {
                        changeDayIndex('2')
                    }} className="dropdown-item bg-success text-light" href="#">Урок пройден</span>
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
                            defaultValue={item.title}
                            onChange={(e) => {
                                title = e.target.value
                            }}
                            className="form-control" aria-label="With textarea"
                        ></textarea>
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
                        onVisibleChange={(s) => {}}
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
    if (jwt.decode(localStorage.getItem('tokenID')).accountType != 'teacher') {
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

            if (type == 'group') {
                setData(group)
            } else if (type == 'pupil') {
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
                    }} className={`bi ${fixedSchedule[2]}`}></i>
                    <Popover
                        title={'Внимание'}
                        content={'Удаление ученика из группы'}
                        placement="right"
                        trigger={'hover'}
                    >
                        <i
                            onClick={deletePupils}
                            className='bi bi-trash'
                            style={{color: 'rgb(245, 103, 10', marginLeft: '10px'}}></i>
                    </Popover>
                </div>
            </div>
        </Div_box>
    );
};

PupilsSandTime.defaultProps = {
    surname: ''
}

export default PupilsSandTime;