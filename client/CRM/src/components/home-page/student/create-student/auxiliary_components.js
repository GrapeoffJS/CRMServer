import {DatePicker, Form, Input} from "antd";
import InputMask from "react-input-mask";
import React from "react";
const textError = 'Пожалуйста, заполните это поле!'

const InputBox = ({label, name, required = true}) => {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{
                required,
                message: textError
            }]}
        >
            {name === 'dateOfBirth' ? <DatePicker placeholder={'гггг-мм-дд'} allowClear={false}/> : <Input/>}
        </Form.Item>
    )
}
const InputPhone = ({label, name, required = true}) => {

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{
                required,
                message: textError
            }]}
        >
            <InputMask autoComplete="off"
                       type="tel"
                       name="tel"
                       className="form-control"
                       mask="+9 (999) 999-99-99"/>
        </Form.Item>
    )
}

export {
    textError,
    InputPhone,
    InputBox
}