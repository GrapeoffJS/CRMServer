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
  .specialList .ant-list-items {
    max-height: 220px;
    margin: 0 0 10px 0;
  }
  .tasks {
    font-family: "MontLight";
  }
`
