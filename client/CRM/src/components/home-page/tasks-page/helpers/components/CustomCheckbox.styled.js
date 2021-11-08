import styled from "@emotion/styled"
import {changeColor} from "../changeColor";

export const CustomCheckboxStyled = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  min-height: 22px;
  max-width: 22px;
  max-height: 22px;
  background: transparent;
  border: 1px solid ${props => changeColor(props.type)};
  border-radius: 50%;
  margin: 0 5px 0 0;
  > span {
    display: inline-block;
    min-width: 16px;
    min-height: 16px;
    transition: all .2s ease;
    background: ${props => props.active ? changeColor(props.type) : "transparent"};
    border-radius: 50%;
    &:hover {
      opacity: 0.8;
    }
  }
`