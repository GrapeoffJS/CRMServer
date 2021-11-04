import React, {useState} from 'react';
import {Modal, Button} from 'antd';

import Url from './../../../../url/url.js';

import {loading, Swalclose} from '../../../../alert/alert';

import moment from 'moment';

//Style
import styled from '@emotion/styled';
import errorHandler from "../../../error-handler/error-handler";
import {serverRequest} from "../../../search/server-request";
import {sortingSearchResponses} from "../../group/group-logic";

const axios = require('axios'); // AJAX

const Li = styled.li({
    span: {
        cursor: 'pointer'
    }
});
const Span = styled.span({
    cursor: 'pointer'
});

const AddStydent_Group = ({title, pageId, update, schedule}) => {

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // /Modal

    const [pupils, setPupils] = useState([]);

    const changeSchedulePupil = (idPupil) => {

        let newSchedule = [];

        schedule.forEach((item) => {

            let day = moment(item.date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
                time_day = moment().diff(day, 'day');

            if (time_day <= 0) {
                newSchedule.push(item);
            }
        })

        axios({
            method: 'put',
            url: `${Url}/CRM/Groups/${pageId}/Pupils/${idPupil}/Schedule`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: newSchedule
        })
        .then((res) => {
            update();
            Swalclose();
        })
        .catch(error => {
            errorHandler(changeSchedulePupil, error)
        })
    }
    const addPUPILS_Group = (data, idPupil) => {
        axios({
            method: 'post',
            url: `${Url}/CRM/Groups/${pageId}/Pupils`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: {
                ids: data
            }
        })
        .then(() => {
            changeSchedulePupil(idPupil);
        })
        .catch((error) => {
            errorHandler(addPUPILS_Group, error)
        })
    }

    let PUPILS_search_Li = pupils.map((item, i) => {

        const choice = () => {
            loading('Ученик добавляется', 'Пожалуйста подождите');
            addPUPILS_Group([item.id], item.id);
        };

        return (
            <Li key={item.id}
                onClick={choice}
                className="list-group-item">
                <span className="badge bg-warning text-dark">{item.surname} {item.name} {item.midname}</span>
            </Li>
        );
    });

    return (
        <>
            <Span
                className="btn "
                onClick={showModal}
            >
                <i className="bi bi-person-plus-fill" style={{color: '#ffc107', fontSize: '24px'}}></i>
            </Span>

            <Modal
                title={`Добавить ${title}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                width={600}
                footer={[
                    <Button key="onCancel1" onClick={handleCancel}>
                        Отмена
                    </Button>
                ]}
            >
                <div className="row addPUPILS">
                    <div className="col-12 input-group">
                        <input
                            id="fort"
                            onChange={(e) => {
                                serverRequest((data) => {sortingSearchResponses(data, setPupils)}, encodeURI(e.target.value))
                            }}
                            autoComplete="off"
                            type="search"
                            className="form-control"
                            name="q"
                            placeholder="Найти ученика..."
                        />

                        <ul className="col-12 list-group list-group-flush">
                            {PUPILS_search_Li}
                        </ul>
                    </div>
                </div>
            </Modal>
        </>
    );

};

export default AddStydent_Group;