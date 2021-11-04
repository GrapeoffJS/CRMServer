import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import Url from './../../../../url/url.js';

import PupilsSandTime from './../../group/group-page/PupilsSandTime/PupilsSandTime.js';
import InfoTable from './Info-table/InfoTable.js';
import PayHistory from './payment-history/paymentHistory.js';
import DrawerChat from './chat/drawer-chat.js'
import {getStudent_Id} from "../service-student/service-student";
// Block

// Style
import {TablePupils, StudentPage} from "./style-pageStudent";

import StudentStatuses from "../student-statuses/student-statuses";
import ListStatuses from "../student-statuses/list-statuses";
import {Select} from "antd"
import {FlexDiv} from "../pageStudent.styled";
import {axiosGetFunnelSteps, axiosUpdateStudent} from "../../sales-funnel/helpers/axios-requests";
import TabsPupil from "./tabs-pupil/tabs-pupil";

const {Option} = Select

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
    console.log("pageStudent: ", tasks)

    useEffect(() => {
        const requestsAsync = async () => {
            await getStudent_Id(pageStudent_id, setDataS)
            const salesFunnelStepsServ = await axiosGetFunnelSteps(Url, 1)
            setSalesFunnelSteps(prev => prev = salesFunnelStepsServ)
        }
        requestsAsync()
    }, [pageStudent_id]);

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
                                   getGroup_Id={() => {
                                       getStudent_Id(pageStudent_id, setDataS)
                                   }} setData={setDataS} name={groups_id[i]} type='pupil'/>
        }
    });

    const onChangeSelect = (event) => {
        axiosUpdateStudent(Url, pageStudent_id, {salesFunnelStep: event.target.value})
    }

    return (
        <StudentPage className="container row col-12">
            <div className="col-12 col-md-3 pad">
                <div className="infoLog align-self-start col-md-12 col-12">
                    <FlexDiv first={true}>
                        <h3>{name}</h3>
                        <FlexDiv>
                            <select onChange={onChangeSelect} value={salesFunnelStep?._id}>
                                {salesFunnelSteps?.map(step => (
                                  <option key={step._id} value={step._id}>{step.name}</option>
                                ))}
                            </select>
                        </FlexDiv>
                    </FlexDiv>
                    <div style={{display: 'flex', height: '47px'}}>
                        <ListStatuses items={dataStudent.statuses ? dataStudent.statuses : []}/>
                        <StudentStatuses updateStudent={setDataS}
                                         studentStatusesGlobal={dataStudent.statuses ? dataStudent.statuses : []}/>
                    </div>
                </div>
                <PayHistory
                    balance_item={balance}
                    pageStudent_id={pageStudent_id}
                    updeteStudent={() => {
                        getStudent_Id(pageStudent_id, setDataS)
                    }}
                    pay_History={paymentHistory}
                />
            </div>
            <div
                className="col-md-6"
                style={{background: '#fff'}}
            >
                <DrawerChat
                    tasks={tasks}
                    notes={notes}
                    fio={{
                        name: dataStudent.name,
                        midname: dataStudent.midname,
                        surname: dataStudent.surname
                    }}
                    update={() => {
                        getStudent_Id(pageStudent_id, setDataS)
                    }}
                    _id={pageStudent_id}
                />
            </div>
            <div className="col-md-3 ulBox">
                <InfoTable dataStudent={dataStudent} updetePage={setDataS}/>
            </div>
            <TablePupils className="container col-12">
                <TabsPupil tabs_groups={PupilsSandTimeGroup}/>
            </TablePupils>
        </StudentPage>
    );
};

export default PageStudent;
