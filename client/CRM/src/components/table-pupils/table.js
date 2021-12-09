import React, {useEffect} from 'react';
import {Link} from "react-router-dom"
import {Table} from 'antd';
import ReturnAge from './../home-page/return-age/returnAge' // Определяет возраст

import styled from '@emotion/styled';
import moment from "moment";
import 'moment/locale/ru';

const Box = styled.div({
    'th, td': {
        padding: '16px 11px'
    }
})

const Table_Pupils = ({
                          paramFilrers,
                          setParamFilrers,

                          dataGroupsChecked,

                          dataSource,
                          update,
                          columns,

                          scrollLeft
                      }) => {

    useEffect(() => {
        document.querySelector('.ant-table-content').scrollLeft = scrollLeft
    })
    let itemPupils = dataSource.map(item => {
        let {
            _id,
            surname,
            name,
            midname,
            dateOfBirth,
            gender,
            phone,
            balance,
            parentPhone,
            parentFullname,
            discord,
            groups,
            tutor,
            statuses,
            createdAt
        } = item

        return ({
            key: _id,
            surname: () => (
                <Link
                    className="link-info"
                    to={`/student/${_id}`}>

                    {surname}
                </Link>
            ),
            name,
            midname,
            dateOfBirth: ReturnAge(dateOfBirth),
            gender,
            phoneNumber: phone,
            tutor,
            parentFullname,
            parentPhoneNumber: parentPhone,
            balance: `${balance}`,
            discordNickname: discord,
            groups,
            statuses,
            createdAt: moment(createdAt).format('DD - MMMM - YYYY, HH:MM')
        })
    })

    return (
        <Box>
            <Table
                pagination={false}
                dataSource={itemPupils}
                columns={columns}
                scroll={{x: 0}}
                onChange={(pagination, filters) => {
                    let box = {...paramFilrers}
                    if (filters.gender) {
                        box.gender = filters.gender
                    } else {
                        box.gender = []
                    }

                    if (filters.balance) {
                        box.balance = filters.balance
                    } else {
                        box.balance = []
                    }

                    setParamFilrers(box)
                    update(box, dataGroupsChecked)
                }}
            />
        </Box>
    )
}

export default Table_Pupils