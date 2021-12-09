import React, {useEffect, useState} from "react";
import {Checkbox, List, Table, Skeleton, Space} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {change_trial_lessons, delete_trial_lessons, install_trial_lessons} from "../../../actions";
import {getTrialLessons, setLessonPassed, deleteGroups} from "./trial-lesson-schedule.logics";
import TrialLessonScheduleDelete from "./trial-lesson-schedule-button_delete";
import moment from "moment";
import TrialLessonScheduleComments from "./trial-lesson-schedule-comments";

const TrialLessonSchedule = ({trial_lessons, change_trial_lessons, install_trial_lessons, delete_trial_lessons, selected_subject}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTrialLessons(setLoading, install_trial_lessons)
    }, [])

    const dataSource = trial_lessons.map(group => {
        const start = group.global_schedule[0].duration[0].substr(0, 2)
        let day = moment(group.global_schedule[0].date, 'DD.MM.YYYY').locale('en').format('dddd').substr(0, 2)

        return {
            ...group,
            group,
            key: group._id,
            delete_group: {
                tutor: group.tutor,
                hour: `hour${start[0] === '0' ? start[1] : start}`,
                day,
                _id: group._id
            },
            group_name: {
                name: group.group_name,
                id: group._id
            },
            comment: {
                pupils: group.pupils,
                group_id: group._id
            }
        }
    })

    const columns = [
        {
            title: 'Урок пройден',
            dataIndex: 'group',
            key: 'group',
            render: (group) => {
                let checked = group.global_schedule[0].status === 2
                return (
                    <Checkbox
                        loading={true}
                        checked={checked}
                        onChange={e => {
                            setLessonPassed(e.target.checked, group._id, group.global_schedule, group, change_trial_lessons)
                        }}
                    />
                )
            }
        },
        {
            title: 'Название',
            dataIndex: 'group_name',
            key: 'group_name',
            render: group_name => (
                <Link to={`/group/${group_name.id}`}>
                    {group_name.name}
                </Link>
            )
        },
        {
            title: 'Ученики',
            dataIndex: 'pupils',
            key: 'pupils',
            render: (pupils) => (
                <List size={'small'}>
                    {
                        pupils.map(pupil => {
                            const {surname, name, midname, _id} = pupil
                            return (
                                <List.Item key={_id}>
                                    <Link to={`/student/${_id}`}>
                                        {`${surname} ${name} ${midname}`}
                                    </Link>
                                </List.Item>
                            )
                        })
                    }
                </List>
            )
        },
        {
            title: 'Учитель',
            dataIndex: 'tutor',
            key: 'tutor',
            render: (tutor) => {
                const {surname, name, midname} = tutor
                return `${surname} ${name} ${midname}`
            }
        },
        {
            title: 'Дата урока',
            dataIndex: 'global_schedule',
            key: 'global_schedule',
            render: (global_schedule) => {
                const {date, duration} = global_schedule[0]
                return `${date}г., с ${duration[0]} до ${duration[1]}`
            }
        },
        {
            title: 'Комментарии',
            dataIndex: 'group',
            key: 'comment',
            render: (group) => (
                <TrialLessonScheduleComments data={group} change_trial_lessons={change_trial_lessons}/>
            )
        },
        {
            title: 'Удаление групп',
            dataIndex: 'delete_group',
            key: 'delete_group',
            render: delete_group => (
                <TrialLessonScheduleDelete setFnc={(setLoading, free_day_for_teacher) => {
                    deleteGroups(delete_group._id, delete_trial_lessons, setLoading, () => {
                        if (selected_subject === delete_group.tutor.subject) {
                            free_day_for_teacher(delete_group.hour, delete_group.day, delete_group.tutor)
                        }
                    })
                }}/>
            )
        }
    ];

    const skeleton = (
        <Space className={'trial-lesson-schedule-skeleton'}>
            <Skeleton.Button key={'0'} active={true} size={'large'} block={true}/>
            <Skeleton.Button key={'1'} active={true} size={'large'} block={true}/>
            <Skeleton.Button key={'2'} active={true} size={'large'} block={true}/>
            <Skeleton.Button key={'3'} active={true} size={'large'} block={true}/>
        </Space>
    )
    const table = (
        <Table
            className={'trial-lesson-schedule'}
            dataSource={dataSource}
            columns={columns}
        />
    )

    return (
        <>
            {loading ? skeleton : table}
        </>
    )
}

const mapStateToProps = (state) => ({
    trial_lessons: state.trial_lessons,
    selected_subject: state.selected_subject
})
const mapDispatchToProps = {
    change_trial_lessons,
    install_trial_lessons,
    delete_trial_lessons
}

export default connect(mapStateToProps, mapDispatchToProps)(TrialLessonSchedule)