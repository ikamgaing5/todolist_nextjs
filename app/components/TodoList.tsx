import {ITask} from "@/types/tasks";
import Task from "@/app/components/Task" ;
 
interface TodoListProps{
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
    <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Tâches</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
            <Task key={task.id} task={task}/>
        ))}
      </tbody>
    </table>
  </div>
  )
    ;
};

export default TodoList;