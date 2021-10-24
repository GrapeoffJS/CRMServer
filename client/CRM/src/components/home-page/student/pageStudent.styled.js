import styled from "@emotion/styled"

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.first ? "1px solid #0DCAF0" : "none"};
  > .ant-select {
    margin: 0 10px 0 0;
  }
`