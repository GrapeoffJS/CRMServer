import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import PupilsAndTime from './pupils-and-time/pupils-and-time.js';
import AddStydentGroup from './../../#more-functions/add-student_group/add-Student_Group.js';
import InfoTable from './Info-table/InfoTable.js';
import {TablePupils, GroupPageStyle} from "./group-page.style";
import {getGroup_Id} from "./group-page.logics";
import Schedule from '../../#schedule/schedule.js';
import CreateSchedule from "../../#schedule/create-schedule/create-schedule";

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

    const {group_name, pupils, global_schedule} = DataALL;

    useEffect(() => {
        getGroup_Id(setDataALL, dataGroup);
    }, []);

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
            return <PupilsAndTime key={itemG._id} itemG={itemG} dataGroup={dataGroup}
                                  getGroup_Id={() => getGroup_Id(setDataALL, dataGroup)} setData={setDataALL}
                                  surname={itemG.surname}
                                  name={itemG.name} type='group'/>;
        });
    }

    let addPupils_g =
        <AddStydentGroup
            schedule={global_schedule}
            update={() => getGroup_Id(setDataALL, dataGroup)}
            pageId={dataGroup}
            title='ученика'
        />
    return (
        <>
            <GroupPageStyle className="container row col-12">
                <div className="col-12 col-md-6 pad">
                    <div className="infoLog align-self-start col-md-12 col-12">
                        <div className="group-name col-12 col-lg-12">
                            <h3>{group_name}</h3>
                        </div>
                        <div className="time col-md-12 row">
                            <CreateSchedule updateGroup={(onSuccess) => getGroup_Id((data) => {
                                setDataALL(data)
                                onSuccess()
                            }, dataGroup)} groupID={dataGroup}/>
                            <Schedule global_schedule={global_schedule ? global_schedule : []}/>
                        </div>
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
            </GroupPageStyle>
        </>
    );
};
export default GroupPage;