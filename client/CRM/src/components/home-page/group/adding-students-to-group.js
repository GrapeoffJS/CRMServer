import React, {useState} from "react";
import {Input} from "antd";
import {setStudent, removeStudent, sortingSearchResponses} from './group-logic'
import {serverRequest} from "../../search/server-request";

const AddingStudentsToGroup = ({addStudent, addedStudents}) => {

    const [ArrayEligibleStudents, setArrayEligibleStudents] = useState([])
    const [value, setValue] = useState('')

    const SuitableStudents = ArrayEligibleStudents.map(item => {

        const {name, surname, midname, id} = item

        return (
            <li
                onClick={() => {
                    setStudent(item, addedStudents, addStudent, setValue)
                }}
                key={id}
                className="list-group-item">
                <span className="badge bg-warning text-dark">{`${surname} ${name} ${midname}`}</span>
            </li>
        )
    })

    const AddedStudentButton = addedStudents.map(item => {

        const {name, surname, midname, id} = item

        return (
            <button
                onClick={() => {
                    removeStudent(id, addedStudents, addStudent, setValue)
                }}
                key={id}
                type="button"
                className="btn btn-info">
                {`${surname} ${name} ${midname}`}
                <i className="bi bi-x" style={{fontSize: '15px'}}/>
            </button>
        )
    })

    return (
        <div className="mb-3">
            <label htmlFor="inputSirname" className="fs-5 col-sm-4 col-form-label">Добавить
                учеников</label>
            <div className="row addPUPILS">
                <div className="col-sm-6 input-group">
                    <Input
                        placeholder={'Найти...'}
                        onChange={(e) => {
                            setValue(e.target.value)
                            serverRequest((data) => {sortingSearchResponses(data, setArrayEligibleStudents)}, encodeURI(e.target.value), '')
                        }}
                        value={value}
                    />

                    <ul className="col-12 list-group list-group-flush">
                        {SuitableStudents}
                    </ul>
                </div>
                <div className="col-sm-6 boxPUPILS">
                    {AddedStudentButton}
                </div>
            </div>
        </div>
    )
}

export default AddingStudentsToGroup