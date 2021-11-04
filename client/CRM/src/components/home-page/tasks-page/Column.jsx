import {ContentBlock, HeaderBlock} from "./helpers/Tasks.styled";

export const Column = ({expiredTasks, type, children}) => {
  return (
    <div>
      <HeaderBlock type={type}>{children}</HeaderBlock>
      <ContentBlock>{children}</ContentBlock>
    </div>
  )
}