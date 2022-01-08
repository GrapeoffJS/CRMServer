import React, { useRef } from 'react'
import { Form, TimePicker } from 'antd'

const TimePickerSchedule = ({ label, name }) => {
  return (
    <Form.Item style={{ marginBottom: 0 }} label={label}>
      <Form.Item
        name={`${name}0`}
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
      >
        <TimePicker
          allowClear={false}
          format={'HH'}
          placeholder="Начало урока"
        />
      </Form.Item>
      <span
        style={{
          display: 'inline-block',
          width: '23px',
          lineHeight: '32px',
          textAlign: 'center',
        }}
      >
        -
      </span>
      <Form.Item
        name={`${name}1`}
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
      >
        <TimePicker
          format={'HH'}
          allowClear={false}
          placeholder="Конец урока"
        />
      </Form.Item>
    </Form.Item>
  )
}

export default TimePickerSchedule
