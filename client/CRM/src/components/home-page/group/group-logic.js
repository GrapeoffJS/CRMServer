export const setStudent = (pupil, addedStudents, addStudent, setValue) => {

    let permitted = true

    addedStudents.forEach(item => {
        if (item.id === pupil.id) {
            permitted = false
        }
    })

    if (permitted) {
        addStudent([...addedStudents, pupil])
        setValue('')
    }
}

export const removeStudent = (id, addedStudents, addStudent, setValue) => {
    const newStydent = addedStudents.filter(item => (item.id !== id))
    addStudent(newStydent)
    setValue('')
}

export const sortingSearchResponses = (data, setArrayEligibleStudents, index = "pupils") => {
    let arrPupils = []

    data.forEach(item => {
        if (item._index === index) {
            arrPupils.push(item._source)
        }
    })
    setArrayEligibleStudents(arrPupils)
}