import React from "react"
import {Tabs} from "antd";

const {TabPane} = Tabs

export const TabsBlock = ({viewbagFunnel, viewbagTable}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Воронка" key="1">
        {viewbagFunnel}
      </TabPane>
      <TabPane tab="Таблица" key="2">
        {viewbagTable}
      </TabPane>
    </Tabs>
  )
}