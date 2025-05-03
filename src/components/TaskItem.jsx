"use client"

import { Draggable } from "react-beautiful-dnd"
import { Trash2, GripVertical } from "lucide-react"
import "../styles/TaskItem.css"

const TaskItem = ({ task, index, columnId, deleteTask }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
      {(provided, snapshot) => (
        <div
          className={`task-item ${snapshot.isDragging ? "dragging" : ""} priority-${task.priority}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          data-rbd-draggable-id={task.id}
          data-rbd-draggable-context-id="0"
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div className="task-drag-handle" {...provided.dragHandleProps}>
            <GripVertical size={16} />
          </div>

          <div className="task-content">
            <div className="task-priority-indicator"></div>
            <p>{task.content}</p>
          </div>

          <button className="task-delete-btn" onClick={() => deleteTask(task.id, columnId)} type="button">
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default TaskItem
