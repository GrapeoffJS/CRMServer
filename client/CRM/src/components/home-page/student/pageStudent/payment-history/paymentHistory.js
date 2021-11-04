import React from 'react';

// Style
import styled from '@emotion/styled';
import Balance from "../balance/balance";

const PayHistoryDiv = styled.div({
    margin: '0',
    padding: '0',
    '.colona': {
        padding: '0 3px',
        marginBottom: '15px',
        h3: {
            fontSize: '16px'
        },
        ul: {
            borderRadius: '5px',
            overflow: 'auto',
            maxHeight: '268px',
            '&::-webkit-scrollbar': {
                width: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#17a2b8',
                borderRadius: '10px'
            }
        },
        li: {
            span: {
                fontSize: '17px',

            }
        }
    },
    '.colona-1': {
        ul: {
            border: '1px solid #28a745'
        },
        li: {
            span: {
                color: '#28a745',
            }
        }
    },
    '.colona-2': {
        ul: {
            border: '1px solid #f27474'
        },
        li: {
            span: {
                color: '#28a745',
            }
        }
    }
})
const Box2 = styled.div`
  padding: 0 13px;
`

const PayHistory = ({balance_item, pageStudent_id, updeteStudent, pay_History}) => {

    let pay_HistoryLocal = pay_History ? pay_History : []

    let liInc = [];
    pay_HistoryLocal.forEach((item, i) => {
        if (item.type == 0) {
            liInc.unshift(
                <li key={i} className="list-group-item">{item.date} <span>{item.amount}₽</span> <br/>{item.issuer}</li>
            );
        }
    })

    let liDec = [];
    pay_HistoryLocal.forEach((item, i) => {
        if (item.type == 1) {
            liDec.unshift(
                <li key={i} className="list-group-item">{item.date} <span>{item.amount}₽</span> <br/>{item.issuer}</li>
            );
        }
    })

    return (
        <PayHistoryDiv className='col-12'>
            <Balance
                balance_item={balance_item}
                pageStudent_id={pageStudent_id}
                updeteStudent={updeteStudent}/>
            <Box2 className="row">
                <div className="colona colona-1 col-6">
                    <h3 className="badge bg-success text-light">Пополнение</h3>
                    <ul className="list-group">
                        {liInc}
                    </ul>
                </div>
                <div className="colona colona-2 col-6">
                    <h3 className="badge bg-danger text-light">Оплата</h3>
                    <ul className="list-group">
                        {liDec}
                    </ul>
                </div>
            </Box2>
        </PayHistoryDiv>
    )
}

export default PayHistory;