import React from "react";
import {Tag} from "antd";
import styled from "@emotion/styled";

const Box = styled.div`
  height: 47px;
  display: flex;
  line-height: 47px;
  overflow: auto;
  width: 100%;

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