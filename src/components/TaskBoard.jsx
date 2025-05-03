"use client"

import { useState } from "react"
import TaskColumn from "./TaskColumn"
import TaskModal from "./TaskModal"
import { Plus } from "lucide-react"
import "../styles/TaskBoard.css"

const TaskBoard = ({ tasks, addTask, deleteTask, editTask, categories }) => {
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [currentList, setCurrentList] = useState(null)

  const handleAddTask = (content, priority, categoryId) => {
    addTask(content, priority, categoryId)
    setShowTaskModal(false)
  }

  const handleEditTask = (content, priority, categoryId) => {
    if (taskToEdit && currentList) {
      editTask(taskToEdit.id, currentList, {
        content,
        priority,
        category: categoryId,
      })
      setShowTaskModal(false)
      setTaskToEdit(null)
      setCurrentList(null)
    }
  }

  const openEditModal = (task, listId) => {
    setTaskToEdit(task)
    setCurrentList(listId)
    setShowTaskModal(true)
  }

  return (
    <div className="task-board">
      <div className="board-header">
        <h1>Task Board</h1>
        <button
          className="add-task-button"
          onClick={() => {
            setTaskToEdit(null)
            setShowTaskModal(true)
          }}
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="board-columns">
        <TaskColumn
          title="To Do"
          tasks={tasks.todo}
          columnId="todo"
          deleteTask={deleteTask}
          editTask={openEditModal}
          categories={categories}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.inProgress}
          columnId="inProgress"
          deleteTask={deleteTask}
          editTask={openEditModal}
          categories={categories}
        />
        <TaskColumn
          title="Completed"
          tasks={tasks.completed}
          columnId="completed"
          deleteTask={deleteTask}
          editTask={openEditModal}
          categories={categories}
        />
      </div>

      {showTaskModal && (
        <TaskModal
          onSave={taskToEdit ? handleEditTask : handleAddTask}
          onClose={() => {
            setShowTaskModal(false)
            setTaskToEdit(null)
          }}
          initialData={taskToEdit}
          categories={categories}
        />
      )}
    </div>
  )
}

export default TaskBoard
