import React from 'react';
import {Link} from "react-router-dom";
import {
    ApartmentOutlined
} from '@ant-design/icons'

import './sidebar.css';

import styled from '@emotion/styled';

const Sidebar = ({sitdebarClass, setUrl}) => {

    const breakpoints = [379, 700, 1024, 565];

    const mq = breakpoints.map(
        bp => `@media (max-width: ${bp}px)`
    );

    const Sidebar = styled.div({
        height: '100vh',
        backgroundColor: '#fff',
        zIndex: '99',
        width: '230px',
        padding: '.5rem 1rem',
        [mq[3]]: {
            width: '99px'
        },
        h5: {
            whiteSpace: 'nowrap',
            textOverflow: 'clip',
            overflow: 'hidden',
            margin: 'auto 0',
            [mq[3]]: {
                display: 'none'
            },
            [mq[0]]: {
                fontSize: '17px'
            }
        },
        section: {
            width: '100%'
        },
        div: {
            marginBottom: '10px',
            transition: '0.2s',
            overflow: 'hidden',
            padding: '12px 17px',
            borderRadius: '12px',
            '&:hover': {
                transition: '0.2s',
                backgroundColor: '#DEF2FF',
                i: {
                    color: '#0099FF'
                }
            },
            [mq[3]]: {
                margin: '0 auto',
                marginBottom: '10px',
                'modal-footer': {
                    alignItems: 'initial'
                }
            },
            [mq[2]]: {
                backgroundColor: '#DEF2FF',
                i: {
                    color: '#0099FF'
                }
            }
        },
        i: {
            marginRight: '17px',
            color: '#91A8B0',
            [mq[0]]: {
                marginRight: '9px'
            },
            [mq[3]]: {
                margin: '0px'
            }
        },
        a: {
            color: '#91A8B0'
        },
        '#UploadPupils': {
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: '#fff'
            },
            padding: '0',
            '.css-7hkkzb': {
                padding: '0',
                margin: '0 auto'
            },
            'div': {
                '&:hover': {
                    backgroundColor: '#fff'
                },
            }
        }
    });

    return (
        <Sidebar className={`Sidebar modernSidebar-nav header navbar ${sitdebarClass}`}>
            <section>
                <div className="d-flex">
                    <Link
                        onClick={setUrl}
                        className="d-flex" style={{textDecoration: 'none'}} to='/account'>
                        <i className="bi bi-person-circle" style={{fontSize: '35px'}}></i>
                        <h5>
                            Аккаунты
                        </h5>
                    </Link>
                </div>
                <div className="d-flex">
                    <Link
                        onClick={setUrl}
                        className="d-flex" style={{textDecoration: 'none'}} to='/subscriptions'>
                        <i className="bi bi-tags-fill" style={{fontSize: '33px'}}></i>
                        <h5>
                            Абонементы
                        </h5>
                    </Link>
                </div>
                <div className="d-flex">
                    <Link
                        onClick={setUrl}
                        className="d-flex" style={{textDecoration: 'none'}} to='/teacher'>
                        <i className="bi bi-person-plus-fill" style={{fontSize: '35px'}}></i>
                        <h5>
                            Учителя
                        </h5>
                    </Link>
                </div>
                <div className="d-flex">
                    <Link
                        className="d-flex" style={{textDecoration: 'none'}} to='/sales-funnel'>
                        <i className="bi bi-funnel-fill" style={{fontSize: '35px'}}></i>
                        <h5>
                            Воронка продаж
                        </h5>
                    </Link>
                </div>
                <div className="d-flex">
                    <Link
                        onClick={setUrl}
                        className="d-flex" style={{textDecoration: 'none'}} to='/allemployees'>
                        <i className="bi bi-person-lines-fill" style={{fontSize: '35px'}}></i>
                        <h5>
                            Сотрудники
                        </h5>
                    </Link>
                </div>
                <div className="d-flex">
                    <Link
                        className="d-flex" style={{textDecoration: 'none'}} to='/roleCreation'>
                        <ApartmentOutlined style={{fontSize: '35px', padding: '0px 18px 0 0'}}/>
                        <h5>
                            Роли
                        </h5>
                    </Link>
                </div>
            </section>
        </Sidebar>
    );
};

//allemployees

export default Sidebar;