import styled from "@emotion/styled";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
}

const ScheduleForm = styled.div`

`;
const TimePickerStyle = styled.div`
  .ant-picker-clear {
    top: 16%;
  }
`

export {
    formItemLayout,
    ScheduleForm,
    TimePickerStyle
}