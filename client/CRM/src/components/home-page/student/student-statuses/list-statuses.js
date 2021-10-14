import React from "react";
import {Tag} from "antd";
import styled from "@emotion/styled";

// let colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
const Box = styled.div`
  height: 47px;
  display: flex;
  line-height: 47px;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #5c636a;
  }
`

const ListStatuses = ({items}) => {

    return (
        <Box>
            {
                items.map((status) => {

                    // let idx = Math.floor(Math.random() * (10))
                    // if (i > colors.length - 1) {
                    //     idx = 0
                    // } else {
                    //     idx += 1
                    // }

                    return (
                        <div key={status._id}>
                            <Tag color={status.color}>{status.name}</Tag>
                        </div>
                    )
                })
            }
        </Box>
    )
}

export default ListStatuses