import React, {useEffect, useState} from 'react'
import {Button, Comment, Form, Input} from 'antd';
import Url from '../../../../../../url/url.js';
import moment from 'moment';
import errorHandler from "../../../../../error-handler/error-handler";

const {TextArea} = Input;
const axios = require('axios'); // AJAX

const Chat = ({_id, commentsObj}) => {

    useEffect(() => {
        document.querySelector('.ant-input').value = ''
    })

    // ===========================================================================================================================

    let {surname, name, midname} = require('jsonwebtoken').decode(localStorage.getItem('tokenID'))

    let UserName = `${surname} ${name} ${midname}`

    const {comments, setComments} = commentsObj
    const [submitting, setSubmitting] = useState(false)
    let value = ''

    const handleSubmit = () => {
        if (!value) {
            return;
        }

        setSubmitting(true)

        axios({
            method: 'post',
            url: `${Url}/CRM/Pupils/${_id}/Notes`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: {
                text: value
            }
        })
            .then(() => {

                setSubmitting(false)
                setComments([...comments, {
                    author: UserName,
                    content: <p>{value}</p>,
                    datetime: moment().locale('ru').format("dddd, D MMMM YYYY г., HH:MM"),
                }])
                // update()
            })
            .catch((error) => {
                errorHandler(handleSubmit, error)
            })
    };


    return (
        <>
            <Comment
                content={
                    <>
                        <Form.Item>
                            <TextArea
                                id='TextArea'
                                onClick={() => {
                                    document.querySelector("#TextArea").value = ''
                                }}
                                rows={4} onChange={(e) => {
                                value = e.target.value
                            }} placeholder='Добавить комментарий'/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                Добавить комментарий
                            </Button>
                        </Form.Item>
                    </>
                }
            />
        </>
    );
}

export default Chat