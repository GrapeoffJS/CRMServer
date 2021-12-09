import React from "react";
import {Swalclose, Toast} from "../../../alert/alert";
import {
    specify_loading,
    when_choosing_subject,
    set_subject_teachers,
    set_local_week,
    set_chosen_teacher,
    set_trial_lesson_day
} from "../../../actions";
import {List, Select} from "antd";
import axios from "axios";
import errorHandler from "../../error-handler/error-handler";
import Url from "../../../url/url";
import {getGroup_Id} from "../../home-page/group/group-page/group-page";
import moment from "moment";

const mapStateToProps = (state) => ({
    subjects: state.all_disciplines,
    selected_subject: state.selected_subject,
    loading: state.loading,
    subject_teachers: state.subject_teachers,
    week: state.local_week,
    chosen_teacher: state.chosen_teacher
})
const mapDispathToProps = {
    when_choosing_subject,
    specify_loading,
    set_subject_teachers,
    set_local_week,
    set_chosen_teacher,
    set_trial_lesson_day
}

let week_initial = {
    hour8: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour9: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour10: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour11: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour12: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour13: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour14: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour15: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour16: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour17: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour18: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour19: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour20: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
    hour21: {
        Mo: {
            free: true,
            tutors: []
        },
        Tu: {
            free: true,
            tutors: []
        },
        We: {
            free: true,
            tutors: []
        },
        Th: {
            free: true,
            tutors: []
        },
        Fr: {
            free: true,
            tutors: []
        },
        Sa: {
            free: true,
            tutors: []
        },
        Su: {
            free: true,
            tutors: []
        }
    },
}

let initial_work_time = {
    hour8: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour9: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour10: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour11: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour12: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour13: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour14: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour15: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour16: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour17: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour18: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour19: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour20: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
    hour21: {
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
    },
}

const planning_week = async (tutors, setWeek, setLoading) => {

    let localWeek = JSON.parse(JSON.stringify(week_initial)),
        groupNumber = 0,
        numberOfGroups = 0

    if (tutors.length === 0) {
        setWeek(localWeek)
        setLoading(false)
    }

    tutors.forEach((tutor) => {
        const {groups} = tutor

        let group_schedule = [], // Расписание групп учителя.
            Start = '', // Время
            End = '',
            difference = '',
            work_time = tutor.workHours ? tutor.workHours : JSON.parse(JSON.stringify(initial_work_time))  // JSON.parse(JSON.stringify(week_initial)) // tutor.workHours ? tutor.workHours : undefined

        if (groups.length === 0) {
            groupNumber += 1
            getDaysOfWeek([], -1)
        }

        const addNumderGroup = () => {
            groupNumber += 1
        }

        groups.forEach((group_id, i) => {
            numberOfGroups += 1
            getGroup_Id(
                data => {
                    group_schedule = data.global_schedule.filter((day, i) => i < 7)
                    const {duration} = data.global_schedule[0]
                    const start = duration[0].substr(0, 2),
                        end = duration[1].substr(0, 2)
                    Start = start[0] === '0' ? start[1] : start
                    End = end[0] === '0' ? end[1] : end
                    difference = +End - +Start
                    addNumderGroup()
                    getDaysOfWeek(group_schedule, i)
                },
                group_id,
                () => {
                    addNumderGroup()
                    getDaysOfWeek([], -1)
                },
                false
            )
        })

        function getDaysOfWeek(group_schedule) {

            let DaysOfWeek = [['понедельник', 'Mo'], ['вторник', 'Tu'], ['среда', 'We'], ['четверг', 'Th'], ['пятница', 'Fr'], ['суббота', 'Sa'], ['воскресенье', 'Su']],
                trash = []

            group_schedule.forEach(day => {
                trash.push(moment(day.date, 'DD.MM.YYYY').format('dddd'))
            })

            trash.forEach(t => {
                DaysOfWeek.forEach(day => {

                    if (t === day[0]) {
                        if (difference === 0) {
                            work_time[`hour${Start}`][day[1]] = false
                        } else {
                            for (let i = 0; i < difference; ++i) {
                                work_time[`hour${+Start + i}`][day[1]] = false
                            }
                        }
                    }
                })
            })

            DaysOfWeek.forEach(day => {
                ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'].forEach(time => {
                    let permitted = work_time[`hour${time}`][day[1]]
                    if (permitted === true) {
                        localWeek[`hour${time}`][day[1]].tutors.push(tutor)
                        let box = [...localWeek[`hour${time}`][day[1]].tutors]
                        localWeek[`hour${time}`][day[1]].tutors = box.reduce(
                            (unique, box) =>
                                unique.indexOf(box) !== -1 ? unique : [...unique, box],
                            []
                        );
                    } else {
                        localWeek[`hour${time}`][day[1]].tutors = localWeek[`hour${time}`][day[1]].tutors.filter(tut => tut._id !== tutor._id)
                    }
                })
            })
            if (groupNumber >= numberOfGroups) {
                setWeek(localWeek)
                setLoading(false)
            }
        }
    })
}

const get_subject_teachers = (setVariable, selected_subject, specify_loading, week, set) => {
    if (selected_subject) {
        specify_loading(true)

        axios({
            method: 'get',
            url: `${Url}/CRM/Teachers?limit=100&offset=${0}&subject=${selected_subject}`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
            .then(res => {
                let {data} = res
                setVariable(data)
                set(data)
            })
            .catch(error => errorHandler(
                () => get_subject_teachers(setVariable, selected_subject, specify_loading),
                error,
                () => specify_loading(false)
            ))
    } else {
        specify_loading(false)
    }
}

const next_day = (day_name) => {
    let nextDay = null
    switch (day_name) {
        case 'Mo':
            nextDay = 1
            break
        case 'Tu':
            nextDay = 2
            break
        case 'We':
            nextDay = 3
            break
        case 'Th':
            nextDay = 4
            break
        case 'Fr':
            nextDay = 5
            break
        case 'Sa':
            nextDay = 6
            break
        case 'Su':
            nextDay = 0
            break
    }
    let current = moment();
    let currentDay = current.day();
    if (nextDay < currentDay)
        nextDay += 7;
    return current.day(nextDay).format('DD.MM.YYYY')
}

const scheduling = (Time, obj, title, name, set_chosen_teacher, chosen_teacher, set_trial_lesson_day) => {

    let time = name

    for (let index in obj) {
        Time.push(
            <td className={'td'}
                key={`${index}${obj}`}
                style={{background: obj[index].tutors[0] ? '#fff' : 'rgb(166 173 180)'}}
            >
                <List
                    className={obj[index].tutors[0] ? '' : 'displayNone'}
                    size={`small`}>
                    {obj[index].tutors.map(tutor => {
                        const {surname, name, midname, _id} = tutor

                        let nextDay = next_day(index)

                        return (
                            <List.Item
                                key={_id}
                                onClick={() => {
                                    set_chosen_teacher({tutor, time, index})
                                    set_trial_lesson_day(nextDay)
                                }}
                                style={{
                                    background: (chosen_teacher.tutor._id === _id && chosen_teacher.time === time && chosen_teacher.index === index) ? 'aquamarine' : '#fff'
                                }}
                            >
                                <div className={'item-span'}/>
                                {`${name[0]}.${midname[0]}.${surname}`}
                            </List.Item>
                        )
                    })}
                </List>
            </td>
        )
    }
    return (
        <tr>
            <td className={'time'}>{name}</td>
            {Time}
        </tr>
    )
}

const info_window = (selected_subject) => {
    if (!selected_subject) {
        Toast.fire({
            icon: 'info',
            title: 'Чтобы создать пробный урок, выберете дисциплину для изучения!',
            text: '(Нажми, что бы скрыть уведомление)',
            timer: null,
            position: 'top'
        });
    } else {
        Swalclose()
    }
}

const {Option} = Select
const funOptionSubjects = (subjects) => {
    return subjects.map(subject => (
        <Option key={subject} value={subject}>{subject}</Option>
    ))
}

export {
    week_initial,
    get_subject_teachers,
    scheduling,
    info_window,
    mapStateToProps,
    mapDispathToProps,
    funOptionSubjects,
    planning_week
}