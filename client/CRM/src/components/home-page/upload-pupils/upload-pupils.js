import React from 'react';

import {Button, Upload} from 'antd';

import 'antd/dist/antd.css';

import Url from './../../../url/url.js'
import {Toast} from '../../../alert/alert.js'

import styled from '@emotion/styled'
import RestrictionMessage from "../../restriction-message/restriction-message";

const Box = styled.div({
    '.ButtonUpload': {
        padding: 0,
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        color: '#a6adb4',
        '&:hover': {
            color: '#fff'
        }
    },
    '.ant-upload-list': {
        display: 'none'
    }
})

const UploadPupils = () => {

    const props = {
        name: 'file',
        action: `${Url}/CRM/Pupils/uploadFile`,
        accept: '.csv,.xlsx',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
        },
        onChange(info) {

            if (info.file.status === 'done') {

                Toast.fire({
                    icon: 'success',
                    title: `Фаил ${info.file.name}, успешно загружен`
                })
            } else if (info.file.status === 'error') {

                if (info.file.response.statusCode === 403) {
                    RestrictionMessage(403)
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: `В ${info.file.name}, ошибки на строках: ${info.file.response.message.join(", ")}`
                    })
                }
            }
        }
    };

    return (
        <Box>
            <Upload {...props}>
                <Button className={'ButtonUpload'}>Загрузите файлы c учениками</Button>
            </Upload>
        </Box>
    )
}

export default UploadPupils