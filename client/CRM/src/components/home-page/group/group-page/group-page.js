import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import Schedule from './../../#schedule/schedule.js';
import ScheduleForm from './../../#schedule/form/scheduleForm.js';
import PupilsSandTime from './../group-page/PupilsSandTime/PupilsSandTime.js';
import AddStydentGroup from './../../#more-functions/add-student_group/add-Student_Group.js';
import InfoTable from './Info-table/InfoTable.js';

import Url from './../../../../url/url.js';
// Style 
import './group-page.css';
import styled from '@emotion/styled';
import errorHandler from "../../../error-handler/error-handler";

const GroupPage = () => {

    let dataGroup = useParams().id

    let localSchedule = {};
    const [DataALL, setDataALL] = useState({
        pupils: [
            {
                _id: '564564',
                localSchedule: localSchedule
            }
        ],
        group_name: "Загрузка...",
        tutor: "",
        level: '',
        places: '',
        global_schedule: [
            {
                duration: ['--:--', '--:--']
            }
        ],
        _id: '6456'
    });

    const {group_name, pupils, global_schedule, _id} = DataALL;

    let arrPayHistory = [];
    if (pupils) {
        pupils.forEach((item) => {

            if (item.paymentHistory) {
                item.paymentHistory.forEach((itemLocal) => {
                    if (itemLocal.group_id == _id) {
                        arrPayHistory.push(itemLocal);
                    }
                });
            }
        });
    }

    const axios = require('axios'); // AJAX

    const getGroup_Id = () => {
        axios({
            method: 'get',
            url: `${Url}/CRM/Groups/${dataGroup}`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
        .then((res) => {
            setDataALL(res.data);
        })
        .catch((error) => {
            errorHandler(getGroup_Id, error)
        });
    }

    useEffect(() => {
        getGroup_Id();
    }, [useParams().id]);

    const breakpoints = [767],
        mq = breakpoints.map(
            bp => `@media (max-width: ${bp}px)`
        );

    const GroupPage = styled.div({
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
                margin: '9px 0',
                marginRight: '10px',
                fontSize: '15px'
            }
        },
        '.group-name': {
            padding: '0',
            borderBottom: '1px solid #0dcaf0',
            [mq[0]]: {
                borderRight: 'none'
            }
        },
        '.time': {
            margin: '0',
            padding: '0',
            h5: {
                fontSize: '1.25rem'
            }
        },
        '.ulBox': {
            borderRadius: '15px',
            padding: '0px'
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

    let PUPILS_List = ''

    if (pupils) {
        PUPILS_List = pupils.map((item) => {
            return (
                <span key={item._id} className="badge bg-info text-dark">{`${item.name} ${item.surname}`}</span>
            );
        });
    }

    let PUPILSandTIME = ''

    if (pupils) {
        PUPILSandTIME = pupils.map((itemG) => {
            return <PupilsSandTime key={itemG._id} itemG={itemG} dataGroup={dataGroup}
                                   getGroup_Id={getGroup_Id} setData={setDataALL} surname={itemG.surname}
                                   name={itemG.name} type='group'/>;
        });
    }

    let addPupils_g =
        <AddStydentGroup
            schedule={global_schedule}
            update={getGroup_Id}
            pageId={dataGroup}
            title='ученика'
        />
    return (
        <>
            <GroupPage className="container row col-12">
                <div className="col-12 col-md-6 pad">
                    <div className="infoLog align-self-start col-md-12 col-12">
                        <div className="group-name col-12 col-lg-12">
                            <h3>{group_name}</h3>
                        </div>
                        <div className="time col-md-12 row">
                            <h6 className="calendar badge bg-info text-dark">Расписание: </h6>
                            {/*{calendarPlus}*/}
                            <ScheduleForm updateGroup={getGroup_Id} groupID={dataGroup}/>
                            <Schedule global_schedule={global_schedule ? global_schedule : []}/>
                        </div>
                        {/*<PayHistory pay_History={arrPayHistory}/>*/}
                    </div>
                </div>
                <div className="col-md-6 ulBox">
                    <ul className="list-group list-group-flush">
                        <InfoTable Data_ALL={DataALL} updetePage={setDataALL}/>
                        <li className="list-group-item">Ученики: {PUPILS_List} {addPupils_g}</li>
                    </ul>
                </div>
                <TablePupils className="container col-12">
                    <h3 className="badge bg-warning">Ученики:</h3>
                    {PUPILSandTIME}
                </TablePupils>
            </GroupPage>
        </>
    );
};
export default GroupPage;
// useParams()