"use client"

import { useState } from "react"
import TaskColumn from "./TaskColumn"
import TaskModal from "./TaskModal"
import { Plus, Search, Filter } from "lucide-react"
import "../styles/TaskBoard.css"

const TaskBoard = ({ tasks, addTask, deleteTask, editTask, categories }) => {
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [currentList, setCurrentList] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all") // "all", "todo", "inProgress", "completed"

  // Filter tasks based on search term and status filter
  const filteredTasks = {
    todo: filterTasksByStatus("todo", tasks.todo),
    inProgress: filterTasksByStatus("inProgress", tasks.inProgress),
    completed: filterTasksByStatus("completed", tasks.completed),
  }

  // Function to filter tasks by status and search term
  function filterTasksByStatus(status, tasksList) {
    // If status filter is set and doesn't match current column, return empty array
    if (statusFilter !== "all" && statusFilter !== status) {
      return []
    }

    // If no search term, return all tasks for this status
    if (!searchTerm.trim()) {
      return tasksList
    }

    // Filter tasks by search term
    return tasksList.filter((task) => task.content.toLowerCase().includes(searchTerm.toLowerCase()))
  }

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

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
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

      <div className="search-filter-container">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <Filter size={18} className="filter-icon" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-filter">
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {(searchTerm || statusFilter !== "all") && (
          <button className="clear-filters-button" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      <div className="board-columns">
        <TaskColumn
          title="To Do"
          tasks={filteredTasks.todo}
          columnId="todo"
          deleteTask={deleteTask}
          editTask={openEditModal}
          categories={categories}
        />
        <TaskColumn
          title="In Progress"
          tasks={filteredTasks.inProgress}
          columnId="inProgress"
          deleteTask={deleteTask}
          editTask={openEditModal}
          categories={categories}
        />
        <TaskColumn
          title="Completed"
          tasks={filteredTasks.completed}
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
