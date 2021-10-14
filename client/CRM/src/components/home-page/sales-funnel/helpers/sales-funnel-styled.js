import styled from "@emotion/styled"

export const StylesForInputMaskPhoneParentOrChild = {
  borderRadius: "2px"
}

export const StylesForUserAddOutlined = {
  fontSize: "18px",
  color: '#001529',
  position: "absolute",
  top: "4px",
  right: "2px"
}

export const BoldSpan = styled.span`
  font-weight: bold;
`

export const VisibilitySpan = styled.span`
  opacity: 0.8;
`

export const Wrapper = styled.div`
  position: relative;
`
export const FunnelSection = styled.div`
  ::-webkit-scrollbar {
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
  }
  overflow: auto hidden;
  height: auto;
  min-width: 100%;
  display: flex;
  justify-content: ${props => props.jstctn ? "space-evenly" : "flex-start"};
  .droppable-container {
    min-height: 150px;
    height: 100%;
  }
`
export const FlexFunnelElement = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  > p {
    flex: 1 0 50%;
    margin: 0;
    padding: 0;
  }
  > Input {
    flex: 1 0 50%;
  }
`


export const FunnelStep = styled.div`
  overflow: hidden;
  max-width: 260px;
  min-width: 260px;
  margin: 0px 10px;
  background: white;
  border-radius: 4px;
  .ant-pagination.ant-pagination-simple {
    display: flex;
    justify-content: center;
    margin-bottom: 3px;
  }
`
export const FunnelStepHeader = styled.div`
  border-bottom: 1px solid ${props => props.background ? props.background : "#001529"};
  max-height: 26px;
  padding: 2px 5px;
  background: white;
  color: black;
  font-weight: 500;
`

export const FunnelStepAbonementSum = styled.div`
  position: relative;
  margin: 0;
  margin-bottom: 8px;
  padding: 5px 0;
  text-align: center;
  background: white;
  color: black;
  font-weight: 500;
  border-bottom: 4px solid ${props => props.background ? props.background : "#001529"};
  &::before {
    position: absolute;
    content: "";
    display: inline-block;
    bottom: -20px;
    right: calc((260px - (8px + 8px)) / 2);
    border-top: 8px solid ${props => props.background ? props.background : "#001529"};
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`

export const FunnelStepText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  width: ${props => props.width !== '' ? props.width : "190px"};
  height: 25px;
  margin: 0;
`

export const FunnelStepStudent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 3px 8px 8px;
  margin: 5px 0;
  border: 1px solid lightgray;
  border-radius: 1px;
  background: white;
  color: black;
  .funnelStepStudent__first--info {
    display: flex;
    flex-direction: column;
    div:first-of-type {
      font-weight: bold;
    }
    p {
      margin: 0;
    }
    div:last-of-type {
      margin-bottom: 3px;
    }
  }
  p {
    margin: 0;
  }
`
export const StatusesBlock = styled.div`
  margin: 2.5px 0 0 0;
  display: flex;
  max-width: 250px;
  overflow: auto hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: ${props => props.contains ? "0 0 5px 0" : "0"};
  &::-webkit-scrollbar {
    height: 2px;
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    border: 3px solid lightgray;
  }
`
export const HoverTask = styled.p`
  cursor: pointer;
  margin: 0 0 2.5px 0;
  color: #18AEFF;
  font-weight: 600;
`
export const DropdownClosestTask = styled.div`
  border: 1px solid lightgray;
  background: white;
  padding: 5px;
  > p {
    margin: 0;
    opacity: 0.8;
  }
  > .name {
    font-weight: bold;
  }
`