import React from "react"
import {ProgressComponentStyled} from "../Tasks.styled"

export const Progress = ({reservTasks, completedTasks, statusTasks}) => {
  return (
    <ProgressComponentStyled status={statusTasks}>
      <div></div>
      <p>
        {completedTasks.length}/{reservTasks.length}
      </p>
    </ProgressComponentStyled>
  )
}