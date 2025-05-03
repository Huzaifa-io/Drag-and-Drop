import { Droppable } from "react-beautiful-dnd"
import TaskItem from "./TaskItem"
import "../styles/TaskColumn.css"

const TaskColumn = ({ title, tasks, columnId, deleteTask, editTask, categories }) => {
  return (
    <div className="task-column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      <Droppable droppableId={columnId} isCombineEnabled={false} isDropDisabled={false}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                columnId={columnId}
                deleteTask={deleteTask}
                editTask={editTask}
                category={categories.find((cat) => cat.id === task.category)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TaskColumn
