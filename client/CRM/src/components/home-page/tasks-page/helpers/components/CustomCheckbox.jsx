import React from "react"
import {CustomCheckboxStyled} from "./CustomCheckbox.styled";

export const CustomCheckbox = ({active, onClick, type}) => {

  return (
    <CustomCheckboxStyled onClick={onClick} active={active} type={type}>
      <span></span>
    </CustomCheckboxStyled>
  )
}