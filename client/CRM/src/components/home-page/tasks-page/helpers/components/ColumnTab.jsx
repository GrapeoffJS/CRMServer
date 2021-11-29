import {ContentBlock, HeaderBlock} from "../Tasks.styled";
import {TaskComponent} from "./TaskComponent";

export const ColumnTab = ({
                            tasks, type, children, setReservTasks, setCompletedTasks, setTasks = () => {
  }
                          }) => {
  return (
    <div>
      <HeaderBlock type={type}>{children}</HeaderBlock>
      <ContentBlock>
        {tasks.map(task => (
          <TaskComponent key={task._id} task={task} type={type} setCompletedTasks={setCompletedTasks}
                         setTasks={setTasks} setReservTasks={setReservTasks}/>
        ))}
      </ContentBlock>
    </div>
  )
}