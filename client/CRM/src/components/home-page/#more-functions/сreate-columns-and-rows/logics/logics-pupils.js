import {Button, Checkbox, Menu} from "antd";
import {FilterFilled, SearchOutlined} from "@ant-design/icons";
import {BoxButtom} from "../style-filter";
import React from "react";

export const filterStatuses = (
    dataStatusesCheck,
    setParamFilrers,
    loadingButtomFilrer,
    paramFilrers,
    setFilterAxios
) => {

    return ({
        filterDropdown: () => (
            <div style={{padding: 8}}>
                <Menu>

                    {dataStatusesCheck.map(item => {
                        let checked = false
                        let {_id, name} = item

                        paramFilrers.statuses.forEach(item => {
                            if (_id === item) {
                                checked = true
                            }
                        })

                        return (
                            <Menu.Item key={_id}>
                                <Checkbox
                                    defaultChecked={checked}
                                    onChange={(e) => {

                                        let box = [...paramFilrers.statuses]

                                        if (e.target.checked) {
                                            box.push(_id)
                                        } else {
                                            box = box.filter(item => (item !== _id))
                                        }
                                        setParamFilrers({...paramFilrers, statuses: box})
                                    }}
                                >
                                    {name}
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
                            setFilterAxios(paramFilrers, {})
                        }}
                    >
                        Применить фильтр
                    </Button>
                </BoxButtom>
            </div>
        ),
        filterIcon: () => {
            if (Object.keys(paramFilrers.statuses).length) {
                return <FilterFilled style={{color: '#1890ff'}}/>
            } else {
                return <FilterFilled/>
            }
        }
    })
}