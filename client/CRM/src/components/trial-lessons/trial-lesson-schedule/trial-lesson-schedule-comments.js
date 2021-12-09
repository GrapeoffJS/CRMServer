import React, {useState} from "react";
import {Button, Input} from "antd";
import {commentingOnGroup, setNotes} from "./trial-lesson-schedule.logics";

const TrialLessonScheduleComments = ({data, change_trial_lessons}) => {
    const [value, setValue] = useState(data.pupils[0].localSchedule[data._id][0].title)
    const [loading, setLoading] = useState(false)
    return (
        <div className={'trial-lesson-schedule-comments'}>
            <Input.TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button
                loading={loading}
                onClick={() => {
                    commentingOnGroup(value, data, change_trial_lessons, setNotes, setLoading)
                }}
            >
                Сохранить
            </Button>
        </div>
    )
}

export default TrialLessonScheduleComments