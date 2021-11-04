import styled from "@emotion/styled"

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.first ? "1px solid #0DCAF0" : "none"};
  > select {
    margin: 0 10px 0 0;
    border: 1px solid lightgray;
    appearance: revert;
    padding: 3px 5px 3px 2px;
    width: 120px;
  }
`