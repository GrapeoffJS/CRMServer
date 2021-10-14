import React, {useState, useEffect} from 'react'
import {Breadcrumb, Layout, List, Badge, Input} from "antd"
import styled from '@emotion/styled';
import {
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons'
import {delete_funnel, get_funnel, post_funnel, put_funnel} from "./change-funnel/change-funnel";

const {Content} = Layout;
const App = styled.div({
    '.cards': {
        boxSizing: 'border-box',
        cursor: 'grab',
        border: '3px solid #ABBED0',
        margin: '5px',
        borderRadius: '6px',
        background: '#DBF8F2',
        fontWeight: '600',
        fontSize: '18px',
        position: 'relative',
        '.anticon-delete': {
            color: '#FF0000',
            position: 'absolute',
            top: '12px',
            fontSize: '21px',
            right: '16px'
        },
        '.ant-badge': {
            position: 'absolute',
            top: '-7px',
            left: '-10px',
            sup: {
                borderRadius: '6px',
                background: '#ABBED0'
            }
        }
    },
    '.addCard': {
        cursor: 'pointer',
        border: 'none',
        padding: '0 0 0 8px',
        background: '#DBF8F2',
        input: {
            fontSize: '18px',
            padding: '8px 16px'
        },
        '.anticon-plus': {
            color: '#FF0000',
            fontSize: '21px',
            marginRight: '8px'
        }
    }
})

const eraseValue = () => {
    document.querySelector('#Input_addCard').value = ''
}

const SalesFunnel = () => {

    const [cardList, setCadtList] = useState([])
    const [currentCard, setCurrentCard] = useState(null)

    useEffect(() => {
        document.querySelector('#Input_addCard').focus()
        eraseValue()
    })
    useEffect(() => {
        get_funnel(setCadtList)
    }, [])

    function dragStartHandler(e, card) {
        setCurrentCard(card)
    }

    function dragEndHandler(e) {
        e.target.style.background = '#DBF8F2'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = '#fff'
    }

    function dropHandler(e, card) {
        e.preventDefault()
        let box = cardList.map(c => {
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        })
        setCadtList(box)
        put_funnel(box, () => {
            setCadtList(cardList)
        })
        e.target.style.background = '#DBF8F2'
    }

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    const deleteCard = (id, order) => {
        let box = []
        cardList.forEach(item => {
            if (item.id !== id) {
                if (order < item.order) {
                    box.push({...item, order: item.order - 1})
                } else {
                    box.push(item)
                }
            }
        })
        setCadtList(box)
        delete_funnel(id, () => {
            setCadtList(cardList)
        })
    }

    const listItem = cardList.sort(sortCards).map((card) => {
        return (
            <List.Item
                key={card.id}
                onDragStart={(e) => dragStartHandler(e, card)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, card)}
                draggable={true}
                className={'cards'}
            >
                <Badge count={card.order}></Badge>
                {card.name}
                <DeleteOutlined onClick={() => {
                    deleteCard(card.id, card.order)
                }}/>
            </List.Item>
        )
    })

    let valueInput = ''
    const changeValue = (value) => {
        if (value) {
            valueInput = value
        }
    }
    const addСell = () => {

        if (valueInput) {
            let numder = cardList.length + 1
            let box = [...cardList,
                {id: Math.random(), order: numder, name: valueInput}
            ]
            setCadtList(box)
            post_funnel(
                {name: valueInput, order: numder, background: '#001529', color: "#FFFFFF"},
                () => {
                    setCadtList(cardList)
                },
                (newData) => {
                    setCadtList([...cardList, newData])
                }
            )
        }
    }

    return (
        <Content style={{padding: "0 50px"}}>
            <Breadcrumb style={{margin: "16px 0"}}>
                <Breadcrumb.Item>Админ панель</Breadcrumb.Item>
                <Breadcrumb.Item>Редактирование воронки продаж</Breadcrumb.Item>
            </Breadcrumb>
            <App className="site-layout-content">
                <div className="site-card-wrapper">
                    <List
                        size="small">
                        <List.Item
                            className={'cards addCard'}
                            onClick={addСell}
                        >
                            <PlusOutlined/>
                            <Input
                                onClick={eraseValue}
                                id={'Input_addCard'}
                                onChange={(e) => {
                                    changeValue(e.target.value)
                                }}
                                onPressEnter={addСell}
                                placeholder={'Название новой ячейки'}/>
                        </List.Item>
                        {listItem}
                        <List.Item style={{display: 'none'}}></List.Item>
                    </List>
                </div>
            </App>
        </Content>
    )
}

export default SalesFunnel