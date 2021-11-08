import styled from "@emotion/styled"
import {changeColor} from "./changeColor";

export const TahomaWrapper = styled.div`
  font-family: Tahoma, sans-serief;
`
export const TasksSortedStyled = styled.div`
  display: flex;
  color: black;
  > div {
    width: calc(100% / 3);
  }
`
export const HeaderBlock = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  text-align: center;
  padding: 5px 0;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 4px solid ${props => changeColor(props.type)};
  &::before {
    position: absolute;
    content: "";
    display: inline-block;
    bottom: -19px;
    right: calc(50% - 8px);
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-top: 8px solid ${props => changeColor(props.type)};
  }
`
export const ContentBlock = styled.div`
  padding: 0 5px 0 5px;
`
export const ProgressComponentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 5px;
  background: #F6CD52;
  margin: 0 0 10px 0;
  font-size: 20px;
  p {margin: 0;}
`
export const UpperPanelFirstLayer = styled.div`
  display: flex;
  justify-content: space-between;
  > div:first-of-type {
    flex: 0 0 90%;
  }
`
export const UpperPanelSecondLayer = styled.div`
  display: flex;
  > .ant-select {
    flex: 0 1 300px;
  }
  > button {
    margin: 0 10px;
  }
`
export const TaskComponentStyled = styled.div`
  background: white;
  margin: 10px 0;
  padding: 5px;
  border-radius: 2px;
  border: 1px solid ${props => changeColor(props.type)};
  border-top: 4px solid ${props => changeColor(props.type)};
  > p {
    margin: 0;
  }
`
export const BoldContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`
export const OpacityParagraph = styled.p`
  opacity: 0.8;
`