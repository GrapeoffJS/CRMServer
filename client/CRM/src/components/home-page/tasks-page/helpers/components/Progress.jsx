import React from "react"
import {ProgressComponentStyled} from "../Tasks.styled"

export const Progress = ({reservTasks, completedTasks}) => {
  return (
    <ProgressComponentStyled>
      <div></div>
      <p>
        {completedTasks.length}/{reservTasks.length}
      </p>
    </ProgressComponentStyled>
  )
}