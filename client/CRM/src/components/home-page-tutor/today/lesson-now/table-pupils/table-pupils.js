import React, {useState, useEffect} from 'react';
import writeComment from './write-сomment/write-comment.js'
import changeSchedule from './change-schedule/change-schedule.js'

import {Table, Tag, Input, Button} from 'antd';

const {Column, ColumnGroup} = Table
const {TextArea} = Input


const TablePupils = ({ID_Group, Group, getUser}) => {

    const [GLOBAL_ARR_PUPILS, set_GLOBAL_ARR_DAY] = useState({})
    const [GLOBAL_ROW_KEY, set_GLOBAL_ROW_KEY] = useState([])

    let ARR_PUPILS = {...GLOBAL_ARR_PUPILS},
        RowKeys = [...GLOBAL_ROW_KEY]

    const onRowKeys = () => {

        RowKeys = []

        for (let key in ARR_PUPILS) {
            if (ARR_PUPILS[key].arr[ID_Group].status == 2) {
                RowKeys.push(key)
            }
        }
    }

    let Notes = {}

    const onSeveChange = () => {
        for (let key in ARR_PUPILS) {
            changeSchedule(ARR_PUPILS[key].arr, key, Group._id, getUser)
        }
        for (let key in Notes) {
            writeComment(key, Notes[key].text)
        }
    }
    console.log(Group)

    const data = Group.pupils.map((item, i) => {

        let {_id, name, surname, midname} = item

        ARR_PUPILS[_id] = {
            arr: item.localSchedule ? item.localSchedule[Group._id] : [],
            pupil_id: _id
        }
        onRowKeys()


        let start = ARR_PUPILS[_id].arr[ID_Group].start ? ARR_PUPILS[_id].arr[ID_Group].start : '',
            finish = ARR_PUPILS[_id].arr[ID_Group].start ? ARR_PUPILS[_id].arr[ID_Group].finish : ''

        const titleProgresStart = (key, text) => {
            ARR_PUPILS[_id].arr[ID_Group][key] = text
        }

        const onChangeStatys = (arr) => {
            if (ARR_PUPILS[_id]) {
                ARR_PUPILS[_id].arr = arr
            } else if (!ARR_PUPILS[_id]) {
                ARR_PUPILS[_id] = {
                    arr: arr,
                    pupil_id: _id
                }
            }
        }

        let changeDayPupil = (index = 3) => {
            let arr = [...item.localSchedule[Group._id]];

            if (index == 2 & arr[ID_Group].status == 3) {
                arr[ID_Group].status = index;

                onChangeStatys(arr)

            } else if (index == 3) {
                arr[ID_Group].status = index;

                onChangeStatys(arr)

            } else if (index != 3 & index != 2) {
                arr[ID_Group].title = index;

                onChangeStatys(arr)
            } else {
                // swallErr('Не возможно установить статус');
            }
        };

        let titlePupil = ''
        if (Group.pupils[i]) {
            titlePupil = Group.pupils[i].localSchedule[Group._id][ID_Group].title
        }

        return {
            key: _id,
            name: `${surname} ${name} ${midname}`,
            title: {
                text: titlePupil,
                action: changeDayPupil,
                addNotes: (value) => {
                    Notes[_id] = {
                        text: value,
                        id: _id
                    }
                }
            },
            progres: {
                start: start,
                finish: finish,
                action: titleProgresStart
            }
        }
    })

    const rowSelection = {

        selectedRowKeys: RowKeys,

        onChange: () => {
            set_GLOBAL_ARR_DAY(ARR_PUPILS)
            set_GLOBAL_ROW_KEY(RowKeys)
        },
        onSelect: (e) => {

            let i,
                box = ARR_PUPILS[e.key].arr[ID_Group].status
            if (box == 2) {
                i = 3
            } else {
                i = 2
            }

            ARR_PUPILS[e.key].arr[ID_Group].status = i

            onRowKeys()
        },
        onSelectAll: (e) => {

            if (e) {
                for (let key in ARR_PUPILS) {
                    ARR_PUPILS[key].arr[ID_Group].status = 2
                }
            } else if (!e) {
                for (let key in ARR_PUPILS) {
                    ARR_PUPILS[key].arr[ID_Group].status = 3
                }
            }

            onRowKeys()
        }
    };

    return (
        <>
            <Table
                pagination={false}
                loading={false}
                rowSelection={rowSelection}
                scroll={{x: 0}}

                dataSource={data}>
                <Column
                    title="Ученик"
                    dataIndex="name"
                    key="name"
                    render={(name) => (
                        <Tag color="blue">{name}</Tag>
                    )}/>
                <ColumnGroup title='Прогресс'>
                    <Column
                        title="Коментарии"
                        dataIndex="title"
                        key="title"
                        render={(title) => (
                            <TextArea
                                defaultValue={title.text}
                                placeholder="Коментарий ученику"
                                onBlur={e => {
                                    title.action(e.target.value)
                                    title.addNotes(e.target.value)
                                }}
                                autoSize={{minRows: 2, maxRows: 6}}
                            />
                        )}
                    />
                    <Column
                        title="Начало"
                        dataIndex="progres"
                        key="progres"
                        render={(progres) => (
                            <TextArea
                                defaultValue={progres.start}
                                placeholder='Старт...'
                                onBlur={e => {
                                    progres.action('start', e.target.value)
                                }}
                                autoSize={{minRows: 2, maxRows: 6}}
                            />
                        )}
                    />
                    <Column
                        title="Конец"
                        dataIndex="progres"
                        key="progres"
                        render={(progres) => (
                            <TextArea
                                defaultValue={progres.finish}
                                placeholder="Финиш..."
                                onBlur={e => {
                                    progres.action('finish', e.target.value)
                                }}
                                autoSize={{minRows: 2, maxRows: 6}}
                            />
                        )}
                    />
                </ColumnGroup>
            </Table>
            <div className='Button'>
                <Button
                    onClick={onSeveChange}
                    type='primary'
                >Сохранить</Button>
            </div>
        </>
    )
}

export default TablePupils