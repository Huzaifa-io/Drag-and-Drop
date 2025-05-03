"use client"

import { Draggable } from "react-beautiful-dnd"
import { Trash2, GripVertical, Edit2 } from "lucide-react"
import "../styles/TaskItem.css"

const TaskItem = ({ task, index, columnId, deleteTask, editTask, category }) => {
  return (
    <Draggable draggableId={task.id} index={index} key={task.id}>
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
            {category && (
              <div className="task-category-tag" style={{ backgroundColor: category.color }}>
                {category.name}
              </div>
            )}
            <div className="task-priority-indicator" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
            <p>{task.content}</p>
          </div>

          <div className="task-actions">
            <button className="task-edit-btn" onClick={() => editTask(task, columnId)} type="button">
              <Edit2 size={16} />
            </button>
            <button className="task-delete-btn" onClick={() => deleteTask(task.id, columnId)} type="button">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}

function getPriorityColor(priority) {
  switch (priority) {
    case "high":
      return "var(--priority-high)"
    case "medium":
      return "var(--priority-medium)"
    case "low":
      return "var(--priority-low)"
    default:
      return "var(--priority-medium)"
  }
}

export default TaskItem
