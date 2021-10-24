import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import Url from './../../../../url/url.js';
import localStorage_change from './../../../../#localStorage_change.js';
import {swallErr} from './../../../../alert/alert.js'

import PupilsSandTime from './../../group/group-page/PupilsSandTime/PupilsSandTime.js';
import InfoTable from './Info-table/InfoTable.js';
import PayHistory from './payment-history/paymentHistory.js';
import DrawerChat from './chat/drawer-chat.js'
import RestrictionMessage from '../../../restriction-message/restriction-message.js'
// Block
import Balance from './balance/balance.js';

// Style
import styled from '@emotion/styled';
import StudentStatuses from "../student-statuses/student-statuses";
import ListStatuses from "../student-statuses/list-statuses";
import {Select} from "antd"
import {FlexDiv} from "../pageStudent.styled";
import {axiosGetFunnelSteps, axiosUpdateStudent} from "../../sales-funnel/helpers/axios-requests";

const {Option} = Select

const breakpoints = [767],
    mq = breakpoints.map(
        bp => `@media (max-width: ${bp}px)`
    );

const StudentPage = styled.div({
    marginTop: '0px',
    margin: '0 auto',
    '.pad': {
        padding: '0px',
        paddingRight: '10px',
        [mq[0]]: {
            paddingRight: '0px'
        }
    },
    '.infoLog': {
        marginBottom: '10px',
        padding: '0',
        [mq[0]]: {
            paddingBottom: '10px'
        },
        '.calendar': {
            margin: 'auto 0',
            marginRight: '10px',
            fontSize: '20px',
            span: {
                paddingLeft: '6px'
            }
        }
    },
    '.group-name': {
        borderBottom: '1px solid #0dcaf0',
        padding: '0px',
        [mq[0]]: {
            borderRight: 'none'
        }
    },
    '.balance': {
        display: 'flex',
        h5: {
            fontSize: '1.25rem'
        }
    },
    '.Button-Drawer': {
        position: 'absolute',
        right: '0',
        top: '8px'
    },
    '.ulBox': {
        borderRadius: '15px',
        padding: '0px',
    },
    '.editing': {
        background: '#fff',
        borderRadius: '10px 10px 0 0',
        i: {
            marginLeft: '95%',
            cursor: 'pointer'
        }
    },
    li: {
        backgroundColor: 'none',
        span: {
            fontSize: '16px',
            margin: '0 5px 5px 0'
        }
    }
});

const TablePupils = styled.div({
    background: '#fff',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '15px',
    '& > h3': {
        fontSize: '22px'
    }
});

const PageStudent = () => {

    let pageStudent_id = useParams().id

    const [dataStudent, setDataS] = useState({
        _id: "60ba505dc12d3b9783c51d0f",
        name: "Загрузка...",
        surname: "",
        midname: "",
        gender: "",
        dateOfBirth: "2004-12-07",
        phone: "",
        parentPhone: "",
        discord: "",
        balance: 0,
        localSchedule: {},
        groups: [],
        paymentHistory: [
            {type: 1, date: "", amount: 0, issuer: "", subscription: null},
            {type: 0, date: "", amount: 0, issuer: "", subscription: null}
        ],
        notes: [],
        statuses: []
    });
    const [salesFunnelSteps, setSalesFunnelSteps] = useState([])

    const {notes, groups, name, balance, localSchedule, paymentHistory, tasks, salesFunnelStep} = dataStudent;

    const axios = require('axios'); // AJAX

    const getStudent_Id = () => {
        axios({
            method: 'get',
            url: `${Url}/CRM/Pupils/${pageStudent_id}`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
            .then((res) => {
                setDataS(res.data);
            })
            .catch((error) => {
                if (error.response) {
                    RestrictionMessage(error.response.status)
                    let {status, data} = error.response;

                    if (status == 404) {
                        swallErr('404', 'Сервер не найден')
                    } else if (status == 401) {

                        if (data.message == 'TOKEN_EXPIRED') {

                            localStorage_change(data.token);
                            getStudent_Id();
                        } else {
                            localStorage.removeItem('tokenID');
                            window.location.replace("/");
                        }
                    }
                }
            })
    }

    const requestsAsync = useCallback(async () => {
        await getStudent_Id()
        const salesFunnelStepsServ = await axiosGetFunnelSteps(Url, 1)
        setSalesFunnelSteps(prev => prev = salesFunnelStepsServ)
    }, [])

    useEffect(() => {
        requestsAsync()
    }, [requestsAsync]);

    let arrIdSch = [];
    for (let key in localSchedule) {
        arrIdSch.push(key);
    }

    let groups_id = [];

    groups.forEach((item) => {
        groups_id.push(item.group_name);
    });

    let PupilsSandTimeGroup = arrIdSch.map((id, i) => {

        if (i < groups_id.length) {
            return <PupilsSandTime key={id} pageInfo={'group'} itemG={dataStudent} dataGroup={id}
                                   getGroup_Id={getStudent_Id} setData={setDataS} name={groups_id[i]} type='pupil'/>
        }
    });

    const id = useParams().id

    const onChangeSelect = async (salesFunnelId) => {
        await axiosUpdateStudent(Url, id, {salesFunnelStep: salesFunnelId})
    }

    return (
        <StudentPage className="container row col-12">
            <div className="col-12 col-md-6 pad">
                <div className="infoLog align-self-start col-md-12 col-12">
                    <FlexDiv first={true}>
                        <h3>{name}</h3>
                        <FlexDiv>
                            <Select defaultValue="current" style={{ width: 120 }} onChange={onChangeSelect}>
                                <Option value="current" style={{display: "none"}}>{salesFunnelStep?.name}</Option>
                                {salesFunnelSteps?.map(step => (
                                  <Option key={step._id} value={step._id}>{step.name}</Option>
                                ))}
                            </Select>
                            <DrawerChat tasks={tasks} notes={notes} fio={{
                                name: dataStudent.name,
                                midname: dataStudent.midname,
                                surname: dataStudent.surname
                            }} update={getStudent_Id} _id={pageStudent_id}/>
                        </FlexDiv>
                    </FlexDiv>
                    <div style={{display: 'flex', height: '47px'}}>
                        <Balance
                            balance_item={balance}
                            pageStudent_id={pageStudent_id}
                            updeteStudent={getStudent_Id}/>
                        <ListStatuses items={dataStudent.statuses ? dataStudent.statuses : []}/>
                        <StudentStatuses updateStudent={setDataS}
                                         studentStatusesGlobal={dataStudent.statuses ? dataStudent.statuses : []}/>
                    </div>
                </div>
                <PayHistory pay_History={paymentHistory}/>
            </div>
            <div className="col-md-6 ulBox">
                <InfoTable dataStudent={dataStudent} updetePage={setDataS}/>
            </div>
            <TablePupils className="container col-12">
                <h3 className="badge bg-warning">Группы:</h3>
                {PupilsSandTimeGroup}
            </TablePupils>
        </StudentPage>
    );
};

export default PageStudent;
