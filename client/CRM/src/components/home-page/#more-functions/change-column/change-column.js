import React from 'react';
import {MenuFoldOutlined} from '@ant-design/icons';

export const getColumn = (con, fnc, title, dataIndex) => ({
    title: () => (
        <>
            <MenuFoldOutlined
                onClick={() => {
                    if (con[1]) {
                        fnc(["", ""]);
                    } else {
                        fnc([
                            <span style={{paddingLeft: "7px"}}>{title}</span>,
                            dataIndex,
                        ]);
                    }
                }}
            />
            {con[0]}
        </>
    ),
    dataIndex: `${con[1]}`,
    key: `${con[1]}`
})