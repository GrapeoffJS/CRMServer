import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import {Button, Input, Space, Checkbox, Menu} from 'antd';
import {SearchOutlined, CloseCircleOutlined} from '@ant-design/icons';

import TableGroups from './../../../table-groups/table-groups.js'
import {getColumn} from '../change-column/change-column'
import Pagination from './../pagination/pagination.js'
import getLimit from './../../#more-functions/getLimit/getLimit.js'
// Style
import styled from '@emotion/styled';

import Url from './../../../../url/url.js'
import errorHandler from "../../../error-handler/error-handler";
import {connect} from "react-redux";
import {install_all_groups, install_param_filters_groups} from "../../../../actions";

const Create_Columns_Rows_Groups = (
    {
        dataObj,
        install_all_groups,
        paramFilrers,
        setParamFilrers
    }
) => {

    const [offsetG, setOffsetG] = useState(0)
    const [Count, setCount] = useState(1)

    // Filters
    const [loadingButtomFilrer, setLoadingButtomFilrer] = useState(false)
    const [filterDropdownVisible, setFilterDropdownVisible] = useState({
        group_name: false,
    })

    const [g, setG] = useState([
        <span style={{paddingLeft: "7px"}}>Группа</span>,
        "group_name",
    ])
    const [l, setL] = useState([
        <span style={{paddingLeft: "7px"}}>Уровень группы</span>,
        "level",
    ])
    const [p, setP] = useState([
        <span style={{paddingLeft: "7px"}}>Количество мест</span>,
        "places",
    ])
    const [o, setO] = useState([
        <span style={{paddingLeft: "7px"}}>Свободных мест</span>,
        "occupied",
    ])
    const [n, setN] = useState([
        <span style={{paddingLeft: "7px"}}>Число учеников</span>,
        "NUMBER_PUPILS",
    ])
    const [t, setT] = useState([
        <span style={{paddingLeft: "7px"}}>Учитель</span>,
        "tutor",
    ])
    // /Change colums

    const axios = require('axios'); // AJAX

    const [Tutors, setTutors] = useState([])

    const addTUTOR = () => {
        axios({
            method: 'get',
            url: `${Url}/AdminPanel/CRMAccounts?limit=100&offset=0&accountType=teacher`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            }
        })
            .then((res) => {
                let {data} = res
                setTutors(data)
            })
            .catch(error => {
                errorHandler(addTUTOR, error)
            })
    }

    const update = (offset = 0, filters = {}) => {

        setLoadingButtomFilrer(true)

        let box = {}

        for (let key in filters) {
            if (key !== 'occupied' && filters[key][0] !== undefined) {
                console.log(filters[key], 1)
                box[`${key}s`] = filters[key]
            } else if (filters[key].length) {
                console.log(filters[key], 2)
                box[key] = filters[key][0]
            }
        }

        axios({
            method: 'post',
            url: `${Url}/CRM/Groups/find?limit=${getLimit}&offset=${offset}`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${localStorage.getItem('tokenID')}`
            },
            data: {
                filters: box
            }
        })
            .then(res => {
                let {data, headers} = res
                install_all_groups(data)
                setFilterDropdownVisible({group_name: false})
                setLoadingButtomFilrer(false)
                setCount(headers.count);
            })
            .catch((error) => {
                errorHandler(update, error, () => {
                    setLoadingButtomFilrer(false)
                })
            })
    }

    useEffect(() => {
        addTUTOR()
        update(0, paramFilrers)
    }, [])

    // // Filrers
    // const [paramFilrers, setParamFilrers] = useState({
    //     group_name: [],
    //     level: [],
    //     tutor: [],
    //     occupied: []
    // });

    let CheckboxValue = {
        group_name: {}
    };

    for (let key in CheckboxValue) {
        paramFilrers[key].forEach((item) => {
            CheckboxValue[key][item] = true;
        });
    }

    const [globalFilters, setGlobalFilters] = useState({
        group_name: []
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {

        if (selectedKeys[0]) {
            let FiltersLocal = {...globalFilters};

            FiltersLocal[dataIndex].push({
                text: selectedKeys[0],
                value: selectedKeys[0],
            });

            setGlobalFilters(FiltersLocal);
            selectedKeys[0] = ''
        }
    };

    let DataSource = dataObj.map(item => {

        let {group_name, level, places, pupils, tutor, _id} = item

        return ({
            key: _id,
            group_name: [group_name, _id],
            level,
            places,
            NUMBER_PUPILS: pupils ? pupils.length : '',
            tutor: tutor ? `${tutor.surname} ${tutor.name} ${tutor.midname}` : '-',
            occupied: pupils ? places - pupils.length : ''
        })
    })

    const BoxButtom = styled.div({
        marginTop: "10px",
        svg: {
            marginBottom: "3px",
        },
    });

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Создать фильтр ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{marginBottom: 8, display: "block"}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleSearch(selectedKeys, confirm, dataIndex);
                        }}
                        size="small"
                        style={{width: 140}}
                    >
                        Добавить в фильтр
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            let filters = {...globalFilters};
                            filters[dataIndex] = [];
                            setGlobalFilters(filters)

                            let dataFilters = {...paramFilrers};
                            dataFilters[dataIndex] = [];

                            setParamFilrers(dataFilters)

                            update(0, dataFilters);
                        }}
                    >
                        Очистить фильтр
                    </Button>
                </Space>
                <Menu>
                    {globalFilters[dataIndex].map((item, i) => {
                        let checked = false;
                        paramFilrers[dataIndex].forEach((param) => {
                            if (param == item.text) {
                                checked = true;
                            }
                        });

                        return (
                            <Menu.Item key={`${item.text}${i}`}>
                                <Checkbox
                                    defaultChecked={checked}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            CheckboxValue[dataIndex][
                                                item.text
                                                ] = true;
                                        } else {
                                            CheckboxValue[dataIndex][
                                                item.text
                                                ] = false;
                                        }
                                    }}
                                >
                                    {item.text}
                                </Checkbox>
                            </Menu.Item>
                        );
                    })}
                </Menu>
                <BoxButtom>
                    <Button
                        loading={loadingButtomFilrer}
                        type="primary"
                        size="small"
                        icon={<SearchOutlined/>}
                        onClick={() => {
                            let paramLocal = [];

                            for (let key in CheckboxValue[dataIndex]) {
                                if (CheckboxValue[dataIndex][key]) {
                                    paramLocal.push(key);
                                }
                            }
                            let data = {...paramFilrers};
                            data[dataIndex] = paramLocal;

                            setParamFilrers(data)
                            setGlobalFilters(globalFilters)

                            update(0, data);
                        }}
                    >
                        Применить фильтр
                    </Button>
                </BoxButtom>
            </div>
        ),
        filterIcon: () => {
            let color = undefined;
            if (paramFilrers[dataIndex][0]) {
                color = "#1890ff";
            }

            if (filterDropdownVisible[dataIndex]) {
                return <CloseCircleOutlined/>;
            } else {
                return (
                    <>
                        <SearchOutlined style={{color: color}}/>
                    </>
                )
            }
        },
        onFilterDropdownVisibleChange: (Visible) => {
            let per = {...filterDropdownVisible};
            per[dataIndex] = Visible;
            setFilterDropdownVisible(per);

            if (!Visible) {
                setParamFilrers(paramFilrers)
                setGlobalFilters(globalFilters)
            }
        },
        filterDropdownVisible: filterDropdownVisible[dataIndex],
    });
    // /Filrers

    let filtersTutors = Tutors.map(item => ({
        text: `${item.surname} ${item.name}`,
        value: item._id
    }))

    let Columns = [
        {
            ...getColumn(g, setG, 'Группа', 'group_name'),
            render: (group_name) => {
                if (group_name) {
                    return <Link to={`/group/${group_name[1]}`}>{group_name[0]}</Link>
                }
            },
            ...getColumnSearchProps("group_name")
        },
        {
            ...getColumn(l, setL, 'Уровень группы', 'level'),
            filters: [
                {
                    text: "1",
                    value: 1,
                },
                {
                    text: "2",
                    value: 2,
                },
                {
                    text: "3",
                    value: 3,
                },
                {
                    text: "4",
                    value: 4,
                }
            ],
            defaultFilteredValue: paramFilrers.level.map(item => item + '')
        },
        {
            ...getColumn(p, setP, 'Количество мест', 'places'),
        },
        {
            ...getColumn(o, setO, 'Свободных мест', 'occupied'),
            filters: [
                {
                    text: "Заполненно",
                    value: false,
                },
                {
                    text: "Свободно",
                    value: true,
                },
            ],
            defaultFilteredValue: paramFilrers.occupied.map(item => `${item}`)  // ...paramFilrers.occupied
        },
        {
            ...getColumn(n, setN, 'Число учеников', 'NUMBER_PUPILS'),
        },
        {
            ...getColumn(t, setT, 'Учитель', 'tutor'),
            filters: filtersTutors,
            defaultFilteredValue: [...paramFilrers.tutor]
        }
    ]

    const Box = styled.div({
        padding: '0 30px'
    })

    return (
        <Box>
            <TableGroups
                dataSource={DataSource}
                columns={Columns}
                setParamFilrers={setParamFilrers}
                paramFilrers={paramFilrers}
                update={update}/>
            <Pagination getItem={update} count={Count} offset={offsetG} setOffset={setOffsetG}/>
        </Box>
    )
}

const mapStateToProps = state => ({
    dataObj: state.all_groups,
    paramFilrers: state.param_filters_groups
})
const mapDispatchToProps = {
    install_all_groups,
    setParamFilrers: install_param_filters_groups
}

export default connect(mapStateToProps, mapDispatchToProps)(Create_Columns_Rows_Groups)