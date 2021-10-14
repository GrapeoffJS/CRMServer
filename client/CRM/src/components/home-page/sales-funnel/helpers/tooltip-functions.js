// imports from plugins
import {Tooltip} from "antd"
import React from "react"

// imports from files of project
import {FunnelStepText} from "./sales-funnel-styled"

export const tooltipNeedsCheckerOfSingleString = (length, string, dop = '', maxLength = 24, width = "", dopTooltipText = "") => {
  if (length + dop.length > maxLength) {
    return (
      <Tooltip placement="leftTop" title={`${dopTooltipText}${dopTooltipText !== "" ? " " : ""}${string}`}>
        <FunnelStepText width={width}>{dop} {string}</FunnelStepText>
      </Tooltip>
    )
  }
  return <FunnelStepText>{dop} {string}</FunnelStepText>
}

export const tooltipCheckerOfTrioString = (length, stud, dop = '', maxLength = 24, width = "", dopTooltipText = "") => {
  if (length + dop.length > maxLength) {
    return (
      <Tooltip placement="leftTop" title={`${dopTooltipText}${dopTooltipText !== "" ? " " : ""}${stud.surname} ${stud.name} ${stud.midname}`}>
        <FunnelStepText width={width}>{stud.surname} {stud.name} {stud.midname}</FunnelStepText>
      </Tooltip>
    )
  }
  return <FunnelStepText>{stud.surname} {stud.name} {stud.midname}</FunnelStepText>
}