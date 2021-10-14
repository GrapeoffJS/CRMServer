import React, {useState} from 'react';
import {Dropdown, Menu} from 'antd';

import Change_Balance from './../../../change-balance/changeBalance.js';
// Style
import styled from '@emotion/styled';

const Balance = ({balance_item, pageStudent_id, updeteStudent}) => {

    const [visible, setVisible] = useState(false)
    const [balance, setBalance] = useState(+balance_item ? +balance_item : 0);

    let incBalance = 0;

    const returnBalance = () => {
        setBalance(balance)
    }

    const ChangeBalance = () => {
        let sum = +balance + +incBalance
        setBalance(sum);

        Change_Balance(incBalance, pageStudent_id, updeteStudent, undefined, undefined, undefined, returnBalance);
    }

    const Span = styled.span({
        borderRadius: '6px',
        fontWeight: '500',
        cursor: 'pointer',
        fontSize: '14px'
    });

    const menu = (
        <Menu>
            <Menu.Item>
                <input
                    placeholder="Пополнить"
                    onChange={(e) => {
                        incBalance = e.target.value
                    }}
                    type="number" className="text-info form-control col-12"
                />
            </Menu.Item>
            <Menu.Item>
                <Span
                    onClick={() => {
                        setVisible(!visible)
                        ChangeBalance()
                    }}
                    className="badge bg-warning text-dark">
                    Сохранить
                </Span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="balance">
            <h6 className="calendar badge bg-success text-light">
                {balance}
                <span>₽</span>
            </h6>
            <Dropdown overlay={menu} visible={visible} trigger={['click']}>
                <i id="dropdownMenuReference"
                   className="bi bi-plus"
                   onClick={() => {
                       setVisible(!visible)
                   }}
                   style={{fontSize: "30px", color: '#17a2b8', cursor: 'pointer'}}
                />
            </Dropdown>
        </div>
    );
}

export default Balance;