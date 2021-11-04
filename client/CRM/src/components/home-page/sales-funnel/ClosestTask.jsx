import moment from "moment"
import React from "react"

import {DropdownClosestTask} from "./helpers/sales-funnel-styled"

export const ClosestTask = ({closestTask}) => {
  return (
    <DropdownClosestTask>
      <p className="name">{closestTask.name}</p>
      <p>До: {moment(closestTask.deadline).format("DD/MM/YYYY | HH:mm")}</p>
      <p>Ответственнен: {closestTask.responsible[0]?.surname} {closestTask.responsible[0]?.name} {closestTask.responsible[0]?.midname}</p>
      <div>
        {closestTask.text}
      </div>
    </DropdownClosestTask>
  )
}