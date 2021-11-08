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
    max-height: 350px;
    margin: 0 0 20px 0;
  }
  .tasks {
    font-family: "MontLight";
  }
`
