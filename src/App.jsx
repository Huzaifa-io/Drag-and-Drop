"use client"

import { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import Sidebar from "./components/Sidebar"
import TaskBoard from "./components/TaskBoard"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: "task-1", content: "Create project documentation", priority: "high" },
      { id: "task-2", content: "Design system architecture", priority: "medium" },
      { id: "task-3", content: "Set up CI/CD pipeline", priority: "low" },
    ],
    inProgress: [
      { id: "task-4", content: "Implement authentication", priority: "high" },
      { id: "task-5", content: "Create dashboard components", priority: "medium" },
    ],
    completed: [
      { id: "task-6", content: "Project setup", priority: "medium" },
      { id: "task-7", content: "Requirements gathering", priority: "high" },
    ],
  })

  // Handle drag end event with improved positioning
  const handleDragEnd = (result) => {
    const { source, destination } = result

    // If dropped outside a droppable area
    if (!destination) return

    // If dropped in the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    // Create a deep copy of the tasks to avoid mutation issues
    const tasksCopy = JSON.parse(JSON.stringify(tasks))

    // Remove the dragged item from the source list
    const [removed] = tasksCopy[source.droppableId].splice(source.index, 1)

    // Insert the item at the new position
    tasksCopy[destination.droppableId].splice(destination.index, 0, removed)

    // Update the state with the new task arrangement
    setTasks(tasksCopy)
  }

  // Add a new task
  const addTask = (content, priority = "medium") => {
    const newTask = {
      id: `task-${Date.now()}`,
      content,
      priority,
    }

    setTasks({
      ...tasks,
      todo: [...tasks.todo, newTask],
    })
  }

  // Delete a task
  const deleteTask = (id, listId) => {
    const updatedList = tasks[listId].filter((task) => task.id !== id)

    setTasks({
      ...tasks,
      [listId]: updatedList,
    })
  }

  return (
    <div className="app-container">
      <Sidebar />
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskBoard tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
      </DragDropContext>
    </div>
  )
}

export default App
