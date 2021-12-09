import React, {useState} from 'react';
import {Dropdown, Menu} from 'antd';

import Change_Balance from './../../../change-balance/changeBalance.js';
import {Span, Div} from "./balance.style";

const Balance = ({balance_item, pageStudent_id, updeteStudent}) => {

    const [visible, setVisible] = useState(false)
    const [balance, setBalance] = useState(balance_item);

    let incBalance = 0;

    const returnBalance = () => {
        setBalance(balance)
    }

    const ChangeBalance = () => {
        let sum = +balance + +incBalance
        setBalance(sum);

        Change_Balance(incBalance, pageStudent_id, updeteStudent, undefined, undefined, returnBalance);
    }

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
        <Div className="balance">
            <h6 className="calendar badge bg-success text-light">
                {balance_item}
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
        </Div>
    );
}

export default Balance;