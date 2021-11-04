import React from "react";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const callback = (key) => {
    console.log(key);
}

const TabsPupil = ({tabs_groups}) => {
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Группы" key="1">
                {tabs_groups}
            </TabPane>
            <TabPane tab="Прогресс" key="2">
                {"<"}... <br/>
                Прогресс...<br/>
                ../>
            </TabPane>
            <TabPane tab="Архив посещаемости" key="3">
                {"<"}... <br/>
                Архив посещаемости <br/>
                ../>
            </TabPane>
        </Tabs>
    )
}

export default TabsPupil