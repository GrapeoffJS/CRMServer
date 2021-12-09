import React from "react";
import {connect} from "react-redux";
import {List} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {mapStateToProps, mapDispathToProps} from "./list-students-for-trial-lesson.logics";

const ListStudentsForTrialLesson = ({students_for_trial_lesson, delete_pupil_to_trial_lesson}) => {
    return (
        <div className={'list-students-for-trial-lesson'}>
            <List
                size="large"
                bordered
                dataSource={students_for_trial_lesson}
                renderItem={item => {
                    const {surname, name, midname, id} = item
                    return (
                        <List.Item
                            style={{
                                padding: 0
                            }}
                        >
                            <div className={'item'}>
                                <div className={'title'}>
                                    <Link to={`/student/${id}`}>
                                        {[surname, name, midname].join(' ')}
                                    </Link>
                                </div>
                                <div className={'delete'}>
                                    <DeleteOutlined
                                        onClick={() => delete_pupil_to_trial_lesson(id)}
                                        style={{color: 'red'}}
                                    />
                                </div>
                            </div>
                        </List.Item>
                    )
                }}
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispathToProps)(ListStudentsForTrialLesson)