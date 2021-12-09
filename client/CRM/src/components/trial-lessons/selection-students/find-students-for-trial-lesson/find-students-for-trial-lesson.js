import React, {useState} from "react";
import {Input, List} from "antd";
import {serverRequest} from "../../../search/server-request";
import {Button, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {connect} from "react-redux";
import {addPupil, mapDispatchToProps, mapStateToProps} from "./find-students-for-trial-lesson.logics";

const FindStudentsForTrialLesson = ({students_for_trial_lesson, add_pupil_to_trial_lesson}) => {

    const [allPupils, setAllPupils] = useState([])
    const [value, setValue] = useState('')

    return (
        <div className={'find-students-for-trial-lesson'}>
            <div>
                <Input
                    value={value}
                    onChange={e => {
                        if (e.target.value) {
                            serverRequest(
                                data => {
                                    const pupils = data.map(item => {
                                        const {_index, _source} = item
                                        if (_index === 'pupils') {
                                            return _source
                                        }
                                    })
                                    setAllPupils(pupils.filter(item => item))
                                },
                                encodeURI(e.target.value)
                            )
                        }
                        setValue(e.target.value)
                    }}
                    placeholder="Подбери учеников для урока"
                />
            </div>
            <List
                size="large"
                bordered
                dataSource={allPupils}
                renderItem={pupil => {
                    const {name, surname, midname, id} = pupil
                    let textDecoration = ''
                    students_for_trial_lesson.forEach(item => {
                        if (item.id === id) {
                            textDecoration = 'line-through'
                        }
                    })
                    return (
                        <ListItem
                            key={id}
                            disablePadding
                        >
                            <Button className={'Button'} disabled={!!textDecoration}>
                                <ListItemButton onClick={() => {
                                    addPupil(pupil, () => setValue(''), students_for_trial_lesson, add_pupil_to_trial_lesson)
                                }} dense>
                                    <ListItemText style={{textDecoration}} id={id} primary={[surname, name, midname].join(' ')}/>
                                </ListItemButton>
                            </Button>
                        </ListItem>
                    )
                }}
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FindStudentsForTrialLesson)