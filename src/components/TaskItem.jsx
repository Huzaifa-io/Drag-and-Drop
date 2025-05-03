"use client"

import { Draggable } from "react-beautiful-dnd"
import { Trash2, GripVertical } from "lucide-react"
import "../styles/TaskItem.css"

const TaskItem = ({ task, index, columnId, deleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-item ${snapshot.isDragging ? "dragging" : ""} priority-${task.priority}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            // Fix the right shift issue by ensuring consistent positioning
            left: snapshot.isDragging ? provided.draggableProps.style.left : "auto",
            top: snapshot.isDragging ? provided.draggableProps.style.top : "auto",
          }}
        >
          <div className="task-drag-handle" {...provided.dragHandleProps}>
            <GripVertical size={16} />
          </div>

          <div className="task-content">
            <div className="task-priority-indicator"></div>
            <p>{task.content}</p>
          </div>

          <button className="task-delete-btn" onClick={() => deleteTask(task.id, columnId)}>
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default TaskItem
