import {BoldParagraph, ContentBlock, HeaderBlock, OpacityParagraph, TaskComponent} from "./helpers/Tasks.styled";
import moment from "moment";

export const Column = ({tasks, type, children}) => {
  return (
    <div>
      <HeaderBlock type={type}>{children}</HeaderBlock>
      <ContentBlock>
        {tasks.map(task => (
          <TaskComponent key={task._id} type={type}>
            <BoldParagraph>{task.name}</BoldParagraph>
            <OpacityParagraph>До: {moment(task.deadline).format("DD/MM/YYYY | HH:mm")}</OpacityParagraph>
            <div>{task.text}</div>
          </TaskComponent>
        ))}
      </ContentBlock>
    </div>
  )
}