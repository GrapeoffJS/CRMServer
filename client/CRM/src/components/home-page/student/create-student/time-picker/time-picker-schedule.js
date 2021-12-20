import React from "react";
import {Form, TimePicker} from "antd";

const TimePickerSchedule = ({label, name}) => (
    <Form.Item
        style={{marginBottom: 0}}
        label={label}
    >
        <Form.Item name={`${name}0`} style={{display: 'inline-block', width: 'calc(50% - 12px)'}}>
            <TimePicker format={'HH:00'} allowClear={false}/>
        </Form.Item>
        <span
            style={{display: 'inline-block', width: '23px', lineHeight: '32px', textAlign: 'center'}}
        >-</span>
        <Form.Item name={`${name}1`} style={{display: 'inline-block', width: 'calc(50% - 12px)'}}>
            <TimePicker format={'HH:00'} allowClear={false}/>
        </Form.Item>
    </Form.Item>
)

export default TimePickerSchedule