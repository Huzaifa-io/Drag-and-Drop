"use client"

import { useState } from "react"
import TaskColumn from "./TaskColumn"
import "../styles/TaskBoard.css"

const TaskBoard = ({ tasks, addTask, deleteTask }) => {
  const [newTaskContent, setNewTaskContent] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState("medium")

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTaskContent.trim()) {
      addTask(newTaskContent, newTaskPriority)
      setNewTaskContent("")
    }
  }

  return (
    <div className="task-board">
      <div className="board-header">
        <h1>Task Board</h1>
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="Add a new task..."
            className="task-input"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
      </div>

      <div className="board-columns">
        <TaskColumn title="To Do" tasks={tasks.todo} columnId="todo" deleteTask={deleteTask} />
        <TaskColumn title="In Progress" tasks={tasks.inProgress} columnId="inProgress" deleteTask={deleteTask} />
        <TaskColumn title="Completed" tasks={tasks.completed} columnId="completed" deleteTask={deleteTask} />
      </div>
    </div>
  )
}

export default TaskBoard
