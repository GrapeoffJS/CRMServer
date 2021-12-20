import React, {useState, useEffect} from 'react'
import {Button, Input, Space, Checkbox, Menu, Tag} from 'antd';

import Table_Pupils from './../../../table-pupils/table.js'
import {getColumn} from '../change-column/change-column'
import getLimit from './../../#more-functions/getLimit/getLimit.js'

import {SearchOutlined, CloseCircleOutlined, FilterFilled} from '@ant-design/icons';

// Style
import {TableL, BoxButtom} from './style-filter'

import Url from './../../../../url/url.js'
import Pagination from './../../#more-functions/pagination/pagination.js'
import errorHandler from "../../../error-handler/error-handler";
import {filterStatuses} from "./filter-dropdown/logics-pupils";
import {updateStatuses} from '../../student/student-statuses/logic-statuses'
import FilterByTeachers from "./filter-dropdown/filter-by-teachers";

const axios = require('axios'); // AJAX

const Create_Columns_Rows_Pupils = () => {

    const [ValueGroup, setValueGroup] = useState('')
    const [dataStatusesCheck, setDataStatusesCheck] = useState([{name: '1', color: 'red', _id: '345'}, {name: '2', color: 'red', _id: '335'}])

    const [offsetG, setOffsetG] = useState(0)
    const [Count, setCount] = useState(0)

    const [objPupils, setObjPupils] = useState([])

    const [scrollLeft, setScrollLeft] = useState(0)

    // Filtered
    const [paramFilrers, setParamFilrers] = useState({
        surname: [],
        name: [],
        midname: [],
        age: [],
        gender: [],
        groups: [],
        balance: [],
        statuses: []
    })
    const [emptyAge, setEmptyAge] = useState(false)

    let emptyAgeLocal = false

    const [globalFiltersG, setGlobalFiltersG] = useState({
        surname: [],
        name: [],
        midname: [],
        age: [],
        balance: [],
        statuses: []
    })

    const [loadingButtomFilrer, setLoadingButtomFilrer] = useState(false)

    const [filterDropdownVisible, setFilterDropdownVisible] = useState({
        surname: false,
        name: false,
        midname: false,
        age: false,
        groups: false,
        statuses: false
    })


    const [s, setS] = useState([
        <span style={{paddingLeft: "7px"}}>Фамилия</span>,
        "surname",
    ])
    const [n, setN] = useState([
        <span style={{paddingLeft: "7px"}}>Имя</span>,
        "name",
    ])
    const [m, setM] = useState([
        <span style={{paddingLeft: "7px"}}>Отчество</span>,
        "midname",
    ])
    const [a, setA] = useState([
        <span style={{paddingLeft: "7px"}}>Возраст</span>,
        "dateOfBirth",
    ])
    const [pF, setPF] = useState([
        <span style={{paddingLeft: "7px"}}>ФИО Родителя</span>,
        "parentFullname",
    ])
    const [g, setG] = useState([
        <span style={{paddingLeft: "7px"}}>Пол</span>,
        "gender",
    ])
    const [PhoneTitle, setPhoneTitle] = useState([
        <span style={{paddingLeft: "7px"}}>Номер телефона</span>,
        "phoneNumber",
    ])
    const [CreatedAt, setCreatedAt] = useState([
        <span style={{paddingLeft: "7px"}}>Дата создания</span>,
        "createdAt",
    ])
    const [p, setP] = useState([
        <span style={{paddingLeft: "7px"}}>Номер телефона родителя</span>,
        "parentPhoneNumber",
    ])
    const [b, setB] = useState([
        <span style={{paddingLeft: "7px"}}>Баланс</span>,
        "balance",
    ])
    const [d, setD] = useState([
        <span style={{paddingLeft: "7px"}}>Дискорд никнейм</span>,
        "discordNickname",
    ])
    const [gr, setGr] = useState([
        <span style={{paddingLeft: "7px"}}>Группы</span>,
        "groups",
    ])
    const [st, setSt] = useState([
        <span style={{paddingLeft: "7px"}}>Статусы</span>,
        "statuses",
    ])
    const [t, setT] = useState([
        <span style={{paddingLeft: "7px"}}>Учителя</span>,
        "tutors",
    ])

    let CheckboxValue = {
        surname: {},
        name: {},
        midname: {},
        age: {}
    };

    for (let key in CheckboxValue) {
        paramFilrers[key].forEach((item) => {
            CheckboxValue[key][item] = true;
        });
    }

    // Groups filter
    const [dataGroupsChecked, setDataGroupsChecked] = useState({})

    const [GroupsCheckedF, setGroupsCheckedF] = useState({})

    let heapGroups = {...dataGroupsChecked, ...GroupsCheckedF}

    let dataGroupsCheck = []


    for (let key in heapGroups) {

        dataGroupsCheck.push({
            id: key,
            text: heapGroups[key][0],
            checked: heapGroups[key][1]
        })
    }

    // /Groups filter

    const [globalFilters, setGlobalFilters] = useState(globalFiltersG);

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

    const emptyAgeGet = (dataIndex) => {
        if (dataIndex === 'age') {
            return 'block'
        } else {
            return ' none'
        }
    }
    const ageGet = (type) => {
        if (type === 'age') {
            return 'number'
        } else {
            return 'text'
        }
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    type={ageGet(dataIndex)}
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
                    <Menu.Item
                        style={{display: emptyAgeGet(dataIndex)}}
                        key='emptyAge'>
                        <Checkbox
                            defaultChecked={emptyAge}
                            onChange={(e) => {
                                emptyAgeLocal = e.target.checked
                            }}>
                            Возраст не указан
                        </Checkbox>
                    </Menu.Item>
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
                            setGlobalFiltersG(globalFilters)

                            setFilterAxios(data, dataGroupsChecked);
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
                setGlobalFiltersG(globalFilters)
            }
        },
        filterDropdownVisible: filterDropdownVisible[dataIndex],
    });

    const searchGroups = (value) => {

        let localUrl = encodeURI(value);

        axios({
            method: "get",
            url: `${Url}/CRM/Search/autocompletion?query=${localUrl}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("tokenID")}`
            }
        })
        .then((res) => {

            let box = {} //...GroupsCheckedF

            res.data.body.hits.hits.map(item => {
                let {id, group_name, type} = item._source

                if (type === 'group') {
                    box[id] = [`${group_name}`, false]
                }
            })

            setValueGroup(value)

            setGroupsCheckedF(box)
        })
        .catch(error => {
            errorHandler(searchGroups, error)
        })
    }

    let typingTimer; //timer identifier
    let doneTypingInterval = 500; //time in ms (5 seconds)

    const SearchGroups = (text) => {
        clearTimeout(typingTimer);
        if (text) {
            typingTimer = setTimeout(() => {
                // setValueGroup(name)
                searchGroups(text);
            }, doneTypingInterval);
        } else {
            setValueGroup('')
            setGroupsCheckedF({})
        }
    }

    const handleSearchGroup = (selectedKeys, confirm) => {

    }

    const filterGroups = () => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    // focus={true}
                    id='inputGroup'
                    placeholder={`Найти группы`}
                    defaultValue={ValueGroup}
                    onChange={(e) => {
                        SearchGroups(e.target.value)
                        // setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onPressEnter={() =>
                        handleSearchGroup(selectedKeys, confirm)
                    }
                    style={{marginBottom: 8, display: "block"}}
                />
                <Menu>

                    {dataGroupsCheck.map(item => {
                        let {id, text, checked} = item

                        return (
                            <Menu.Item key={id}>
                                <Checkbox
                                    defaultChecked={checked}
                                    onChange={(e) => {

                                        let box = {...dataGroupsChecked}

                                        if (e.target.checked) {
                                            box[id] = [text, true]
                                        } else {
                                            delete box[id]
                                            // delete obj['gh']
                                        }

                                        setDataGroupsChecked(box)
                                        setGroupsCheckedF({})
                                    }}
                                >
                                    {text}
                                </Checkbox>
                            </Menu.Item>
                        )
                    })}
                </Menu>
                <BoxButtom>
                    <Button
                        loading={loadingButtomFilrer}
                        type="primary"
                        size="small"
                        icon={<SearchOutlined/>}
                        onClick={() => {

                            // setDataGroupsChecked(dataGroupsChecked)
                            setFilterAxios(paramFilrers, dataGroupsChecked)
                        }}
                    >
                        Применить фильтр
                    </Button>
                </BoxButtom>
            </div>
        ),
        onFilterDropdownVisibleChange: (Visible) => {


            if (Visible) {
                setScrollLeft(document.querySelector('.ant-table-content').scrollLeft)
            } else {
                setScrollLeft(0)
            }

            let per = {...filterDropdownVisible};
            per.groups = Visible;
            setFilterDropdownVisible(per);

            if (!Visible) {
                // setDataGroupsChecked(dataGroupsChecked)
                setFilterAxios(paramFilrers, dataGroupsChecked)
            }
        },
        filterDropdownVisible: filterDropdownVisible.groups,
        filterIcon: () => {
            if (Object.keys(dataGroupsChecked).length) {
                return <FilterFilled style={{color: '#1890ff'}}/>
            } else {
                return <FilterFilled/>
            }
        }
    })

    // /Filtered

    const [FILTER, SET_FILTER] = useState({
        filters: {},
    })

    const update = (offset = 0, p) => {
        setLoadingButtomFilrer(true);

        axios({
            method: "post",
            url: `${Url}/CRM/Pupils/find?limit=${getLimit}&offset=${offset}`,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${localStorage.getItem("tokenID")}`,
            },
            data: p ? p : FILTER,
        })
        .then((res) => {
            let {data, headers} = res;
            setObjPupils(data);
            setCount(headers.count);

            setFilterDropdownVisible({
                surname: false,
                name: false,
                midname: false,
            });
            setLoadingButtomFilrer(false);
        })
        .catch((error) => {
            errorHandler(update, error, () => {
                setLoadingButtomFilrer(false)
            })
        });
    };

    const setFilterAxios = (param = {}, filtersGroups = {}) => {
        let filtersLocal = {};

        for (let key in filtersGroups) {
            if (filtersLocal.groups) {
                filtersLocal.groups.push(key);
            } else {
                filtersLocal.groups = [];
                filtersLocal.groups.push(key);
            }
            // filtersLocal.groups = [...filtersLocal.groups]
        }

        for (let key in param) {
            if (param[key][0]) {
                if (
                    key === "surname" ||
                    key === "name" ||
                    key === "midname" ||
                    key === "age"
                ) {
                    filtersLocal[`${key}s`] = param[key];
                } else {
                    filtersLocal[`${key}`] = param[key];
                }
            }
        }

        if (filtersLocal.ages) {
            let age = [...filtersLocal.ages];
            filtersLocal.ages = [];
            age.forEach((age) => {
                filtersLocal.ages.push(+age);
            });
        }

        if (filtersLocal.balance) {
            let balance = [...filtersLocal.balance];
            if ((balance[0] == 1) & !balance[1]) {
                filtersLocal.balance = {$gte: 0};
            } else if ((balance[0] == 2) & !balance[1]) {
                filtersLocal.balance = {$lt: 0};
            } else if (balance[1]) {
                filtersLocal.balance = {$gte: 0, $lte: 0};
            }
        }

        filtersLocal.emptyAge = emptyAgeLocal

        let p = {
            filters: filtersLocal,
        };
        setEmptyAge(emptyAgeLocal)
        SET_FILTER(p)
        update(0, p)
    }

    useEffect(() => {
        update();
        updateStatuses(setDataStatusesCheck, setLoadingButtomFilrer)
    }, [])

    useEffect(() => {
        let input = document.getElementById('inputGroup')
        if (input) {
            input.focus()
        }
    })

    const columns = [
        {
            ...getColumn(s, setS, 'Фамилия', 'surname'),
            render: (surname) => {
                if (typeof (surname) == 'function') {
                    return surname()
                }
            },
            ...getColumnSearchProps("surname"),
        },
        {
            ...getColumn(n, setN, 'Имя', 'name'),
            ...getColumnSearchProps("name"),
        },
        {
            ...getColumn(m, setM, 'Отчество', 'midname'),
            ...getColumnSearchProps("midname"),
        },
        {
            ...getColumn(a, setA, 'Возраст', 'age'),
            ...getColumnSearchProps('age')
        },
        {
            ...getColumn(g, setG, 'Пол', 'gender'),
            filters: [
                {
                    text: "Мужской",
                    value: "Мужской",
                },
                {
                    text: "Женский",
                    value: "Женский",
                },
            ],
            defaultFilteredValue: [...paramFilrers.gender]
        },
        {
            ...getColumn(st, setSt, 'Статусы', 'statuses'),
            render: (statuses) => {
                if (statuses && statuses[0]) {
                    return (
                        statuses.map(status => {
                            const {color, _id, name} = status
                            return (
                                <Tag color={color} key={_id}>{name}</Tag>
                            )
                        })
                    )
                }
            },
            ...filterStatuses(
                dataStatusesCheck,
                setParamFilrers,
                loadingButtomFilrer,
                paramFilrers,
                setFilterAxios)
        },
        {
            ...getColumn(t, setT, 'Учителя', 'tutors'),
            ...<FilterByTeachers/>
        },
        {
            ...getColumn(PhoneTitle, setPhoneTitle, 'Номер телефона', 'phoneNumber')
        },
        {
            ...getColumn(CreatedAt, setCreatedAt, 'Дата создания', 'createdAt')
        },
        {
            ...getColumn(p, setP, 'Номер телефона родителя', 'parentPhoneNumber')
        },
        {
            ...getColumn(pF, setPF, 'ФИО Родителя', 'parentFullname')
        },
        {
            ...getColumn(b, setB, 'Баланс', 'balance'),
            filters: [
                {
                    text: "Положительный",
                    value: '1',
                },
                {
                    text: "Отрицательный",
                    value: '2',
                },
            ],
            defaultFilteredValue: [...paramFilrers.balance] //...paramFilrers.balance
        },
        {
            ...getColumn(gr, setGr, 'Группы', 'groups'),
            render: (groups) => {
                if (groups) {
                    return (groups.map(group => (
                        <Tag
                            color="blue"
                            key={`${group._id}`}
                        >
                            {group.group_name}
                        </Tag>)))
                }
            },
            ...filterGroups()
        },
        {
            ...getColumn(d, setD, "Дискорд никнейм", "discordNickname")
        }
    ]

    return (
        <TableL>
            <Table_Pupils
                paramFilrers={paramFilrers}
                setParamFilrers={setParamFilrers}
                globalFiltersG={globalFilters}
                setGlobalFiltersG={setGlobalFilters}
                dataGroupsChecked={dataGroupsChecked}
                setDataGroupsChecked={setDataGroupsChecked}

                dataSource={objPupils}
                update={setFilterAxios}

                loadingButtomFilrer={loadingButtomFilrer}
                setLoadingButtomFilrer={setLoadingButtomFilrer}
                filterDropdownVisible={filterDropdownVisible}
                setFilterDropdownVisible={setFilterDropdownVisible}
                columns={columns}

                scrollLeft={scrollLeft}
            />
            <Pagination getItem={update} count={Count} offset={offsetG} setOffset={setOffsetG}/>
        </TableL>
    )
}

export default Create_Columns_Rows_Pupils