import React from "react";
import {Breadcrumb} from "antd";
import TrialLessonSchedule from "../trial-lesson-schedule/trial-lesson-schedule";
import {TrialLessonsStyle} from "../trial-lessons.style";

const TrialLessonsTutor = () => {
    return (
        <TrialLessonsStyle>
            <Breadcrumb style={{ margin: '0 0 16px 0' }}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                <Breadcrumb.Item>Пробные уроки</Breadcrumb.Item>
            </Breadcrumb>
            <TrialLessonSchedule/>
        </TrialLessonsStyle>
    )
}

export default TrialLessonsTutor