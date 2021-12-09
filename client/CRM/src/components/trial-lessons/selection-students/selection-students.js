import React from "react";
import {SelectionStudentsStyle} from "./selection-students.style";
import FindStudentsForTrialLesson from "./find-students-for-trial-lesson/find-students-for-trial-lesson";
import ListStudentsForTrialLesson from "./list-students-for-trial-lesson/list-students-for-trial-lesson";

const SelectionStudents = () => {
    return (
        <SelectionStudentsStyle>
            <FindStudentsForTrialLesson/>
            <ListStudentsForTrialLesson/>
        </SelectionStudentsStyle>
    )
}

export default SelectionStudents