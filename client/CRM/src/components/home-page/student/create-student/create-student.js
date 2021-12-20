import {connect} from "react-redux";
import {Modal, Form, Select, Button} from "antd";
import React, {useState} from "react";
import {InputBox, InputPhone, textError} from "./auxiliary_components";
import {mapDispatchToProps, mapStateToProps, onFinish} from "./create-student.logics";

const {Option} = Select;

const CreateStudent = ({funnel, add_all_pupils}) => {

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)
    const [loading_button, setLoading_button] = useState(false)
    const changeVisibility = (visible, setVisible) => setVisible(!visible)

    return (
        <div>
            <Button
                type={'primary'}
                onClick={() => {
                    changeVisibility(visible, setVisible)
                }}
            >
                Создать ученика
            </Button>
            <Modal
                width={800}
                title={'Добавить ученика'}
                visible={visible}
                onCancel={() => {
                    changeVisibility(visible, setVisible)
                    form.resetFields()
                }}
                footer={false}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    onFinish={values => {
                        onFinish(values, setLoading_button, setVisible, add_all_pupils, form)
                    }}
                    autoComplete="off"
                    initialValues={{
                        surname: '',
                        name: '',
                        midname: '',
                        gender: '',
                        phone: '',
                        parentPhone: '',
                        parentFullname: '',
                        discord: '',
                        salesFunnelStep: '',
                        dateOfBirth: ''
                    }}
                >
                    <InputBox label={'Фамилия'} name={'surname'}/>
                    <InputBox label={'Имя'} name={'name'}/>
                    <InputBox label={'Отчество'} name={'midname'}/>
                    <InputBox label={'Дата рождения'} name={'dateOfBirth'}/>
                    <Form.Item
                        name="gender"
                        label="Пол"
                        rules={[{
                            required: true,
                            message: textError
                        }]}
                    >
                        <Select
                            placeholder="Мальчик или девочка?"
                            allowClear
                        >
                            <Option value='Мужской'>Мальчик</Option>
                            <Option value='Женский'>Девочка</Option>
                        </Select>
                    </Form.Item>
                    <InputPhone label={'Номер телефона ребёнка'} name={'phone'} required={false}/>
                    <InputPhone label={'Номер телефона родителя'} name={'parentPhone'}/>
                    <InputBox label={'Фамилия, имя, отчество родителя'} name={'parentFullname'}/>
                    <InputBox label={'Дискорд nik-name'} name={'discord'} required={false}/>
                    <Form.Item
                        name="salesFunnelStep"
                        label="Этап в воронке продаж"
                        rules={[{
                            required: true,
                            message: textError
                        }]}
                    >
                        <Select
                            allowClear
                        >
                            {funnel.map(item => {
                                return (
                                    <Option value={item._id} key={item._id}>{item.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item className={'submit'} wrapperCol={{offset: 8, span: 16}}>
                        <Button
                            style={{
                                marginRight: '10px'
                            }}
                            onClick={() => {
                                changeVisibility(visible, setVisible)
                                form.resetFields()
                            }}
                        >
                            Закрыть
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading_button}
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)