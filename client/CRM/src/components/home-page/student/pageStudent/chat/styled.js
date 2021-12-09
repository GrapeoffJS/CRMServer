import styled from "@emotion/styled"

export const DivDrawerStyles = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  
  .ant-list-items {
    overflow: hidden auto;
    max-height: 220px;
  }
  .tasks {
    font-family: "MontLight";
  }
`
export const List = styled.div`
  max-height: 350px;
  overflow: hidden auto;
  border-top: 1px solid lightgray;
  margin: 0 0 10px 0;
  li {
    border-bottom: 1px solid lightgray;
  }
`
