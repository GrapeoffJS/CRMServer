import React from "react";
import {TrialLessonsStyle} from "./trial-lessons.style";
import {Breadcrumb} from "antd";
import TrialLessonSchedule from "./trial-lesson-schedule/trial-lesson-schedule";
import CreateTrialLesson from "./create-trial-lesson/create-trial-lesson";

const TrialLessons = () => {

  return (
      <TrialLessonsStyle>
          <Breadcrumb style={{ margin: '0 0 16px 0' }}>
              <Breadcrumb.Item>Главная</Breadcrumb.Item>
              <Breadcrumb.Item>Пробные уроки</Breadcrumb.Item>
          </Breadcrumb>
          <CreateTrialLesson/>
          <TrialLessonSchedule/>
      </TrialLessonsStyle>
  )
}

export default TrialLessons
