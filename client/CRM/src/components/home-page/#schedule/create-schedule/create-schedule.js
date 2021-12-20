import React, {useState} from 'react';
import Url from './../../../../url/url.js';
import {swallGood} from '../../../../alert/alert';
import moment from 'moment';
import {Modal, Button, Form, DatePicker} from 'antd';
import errorHandler from "../../../error-handler/error-handler";
import TimePickerSchedule from "../../student/create-student/time-picker/time-picker-schedule";
import {formItemLayout, ScheduleForm} from "./create-schedule.style";

const {RangePicker} = DatePicker;
const axios = require('axios'); // AJAX

const CreateSchedule = ({updateGroup, groupID}) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields()
    };
    // /Modal

    let dataInputs = {
        startDate: '',
        endDate: '',
        weekDay: []
    };

    let schedule = [];

    const FindNeedle = () => {
        // let {startDate, duration_Start, duration_End, endDate} = dataInputs
        let {startDate, endDate} = dataInputs

        let dayNumber = moment(startDate, 'DD.MM.YYYY').day();

        let day_end = endDate;
        let day = startDate,
            day_number = moment(day, 'DD.MM.YYYY').day(),
            inc = 1;

        const PushDay = () => {
            dataInputs.weekDay.forEach((item) => {
                if (item.index === day_number) {
                    let academicHours = (moment(`2000-01-01, ${item.duration[1]}`).diff(`2000-01-01, ${item.duration[0]}`, 'hours'))

                    let scheduleItem = {
                        date: day,
                        duration: item.duration,
                        status: 2,
                        tutor: '',
                        paid: false,
                        title: ''
                    };
                    for (let i = 0; i < academicHours; i++) {
                        schedule.push(scheduleItem);
                    }
                }
            });
        };
        PushDay();

        do {
            day = moment(dataInputs.startDate, 'DD.MM.YYYY').day(dayNumber + inc).format('DD.MM.YYYY');
            day_number = moment(day, 'DD.MM.YYYY').day();

            PushDay();

            inc++;
        } while (day !== day_end);

        axios({
            method: 'post',
            url: `${Url}/CRM/Groups/${groupID}/Schedule`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: schedule
        })
            .then(() => {
                updateGroup(() => {
                    setLoading(false)
                    handleCancel()
                    swallGood('Расписание создано', '');
                }); // Обновить группу.
            })
            .catch((error) => {
                errorHandler(FindNeedle, error)
            })
    };


    const FormChance = (values) => {
        setLoading(true)

        for (let key in values) {
            if (values[key] && key !== 'range_picker') {
                dataInputs.weekDay.push({
                    duration: [values[key][0], values[key][1]],
                    index: +key
                });
            }
        }
        dataInputs.startDate = values.range_picker[0]
        dataInputs.endDate = values.range_picker[1]
        FindNeedle();
    };

    return (
        <ScheduleForm>
            <Button
                style={{margin: '8px 0 8px 0'}}
                onClick={showModal}
            >
                Создать расписание
            </Button>
            <Modal
                title="Добавить расписание"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="onCancel1"
                        onClick={() => {
                            form.resetFields()
                        }}
                    >
                        Сброс
                    </Button>,
                    <Button
                        key="onOk1"
                        onClick={() => {
                            form.submit()
                        }}
                        loading={loading}
                        type="primary"
                    >
                        Сохранить
                    </Button>
                ]}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="basic"
                    onFinish={(values) => {
                        let valuesSuccess = {
                            range_picker: values.range_picker.map(item => moment(item).format('DD.MM.YYYY'))
                        }
                        for (let key in values) {
                            const returnTime = (value) => {
                                if (value) {
                                    return `${moment(value).format('HH')}:00`
                                } else {
                                    return undefined
                                }
                            }
                            let newKey = +`${key[0]}`
                            if (key !== 'range_picker' && values[key]) {
                                if (key[1] === '1') {
                                    valuesSuccess[newKey].push(returnTime(values[key]))
                                } else {
                                    valuesSuccess[newKey] = [returnTime(values[key])]
                                }
                            } else if (key !== 'range_picker' && !values[key]) {
                                valuesSuccess[newKey] = undefined
                            }
                        }
                        FormChance(valuesSuccess)
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        className={'form-item'}
                        name="range_picker"
                        label="Период"
                        rules={[{required: true, message: 'Заполните это поле!'}]}
                    >
                        <RangePicker
                            format={'DD.MM.YYYY'}
                            allowClear={false}
                        />
                    </Form.Item>
                    <TimePickerSchedule label={'Понедельник'} name={'1'}/>
                    <TimePickerSchedule label={'Вторник'} name={'2'}/>
                    <TimePickerSchedule label={'Среда'} name={'3'}/>
                    <TimePickerSchedule label={'Четверг'} name={'4'}/>
                    <TimePickerSchedule label={'Пятница'} name={'5'}/>
                    <TimePickerSchedule label={'Суббота'} name={'6'}/>
                    <TimePickerSchedule label={'Воскресенье'} name={'0'}/>
                </Form>
            </Modal>
        </ScheduleForm>
    );
};

export default CreateSchedule;