"use client"

import { useState, useEffect } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import Sidebar from "./components/Sidebar"
import TaskBoard from "./components/TaskBoard"
import Header from "./components/Header"
import ProfilesPage from "./components/ProfilesPage"
import CategoriesPage from "./components/CategoriesPage"
import ProfileModal from "./components/ProfileModal"
import { useLocalStorage } from "./hooks/useLocalStorage"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("tasks") // "tasks", "profiles", or "categories"
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showProfileModal, setShowProfileModal] = useState(false)

  // Load user profile from localStorage
  const [userProfile, setUserProfile] = useLocalStorage("userProfile", null)

  // Load categories from localStorage with default categories
  const [categories, setCategories] = useLocalStorage("categories", [
    // { id: "cat-1", name: "Blockchain", color: "#F59E0B" },
    // { id: "cat-2", name: "Module", color: "#3B82F6" },
    // { id: "cat-3", name: "General", color: "#10B981" },
  ])

  // Load tasks from localStorage with default structure
  const [tasks, setTasks] = useLocalStorage("tasks", {
    todo: [
      // {
      //   id: "task-1",
      //   content: "Create project documentation",
      //   priority: "high",
      //   category: "cat-1",
      //   createdAt: new Date().toISOString(),
      // },
      // {
      //   id: "task-2",
      //   content: "Design system architecture",
      //   priority: "medium",
      //   category: "cat-2",
      //   createdAt: new Date().toISOString(),
      // },
    ],
    inProgress: [
      // {
      //   id: "task-3",
      //   content: "Implement authentication",
      //   priority: "high",
      //   category: "cat-1",
      //   createdAt: new Date().toISOString(),
      // },
    ],
    completed: [
      // {
      //   id: "task-4",
      //   content: "Project setup",
      //   priority: "medium",
      //   category: "cat-3",
      //   createdAt: new Date().toISOString(),
      // },
    ],
  })

  // Check if user profile exists on first load
  useEffect(() => {
    if (!userProfile) {
      setShowProfileModal(true)
    }
  }, [userProfile])

  // Handle drag end event
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result

    // If dropped outside a droppable area
    if (!destination) return

    // If dropped in the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    // Create a deep copy of the tasks to avoid mutation issues
    const tasksCopy = JSON.parse(JSON.stringify(tasks))

    // Find the task that was dragged
    const sourceList = tasksCopy[source.droppableId]
    const movedTask = sourceList.find((task) => task.id === draggableId)

    if (!movedTask) {
      console.error(`Task with id ${draggableId} not found in ${source.droppableId}`)
      return
    }

    // Remove the task from the source list
    tasksCopy[source.droppableId] = sourceList.filter((task) => task.id !== draggableId)

    // Add the task to the destination list
    tasksCopy[destination.droppableId].splice(destination.index, 0, movedTask)

    // Update the state with the new task arrangement
    setTasks(tasksCopy)
  }

  // Add a new task
  const addTask = (content, priority = "medium", categoryId) => {
    const newTask = {
      id: `task-${Date.now()}`,
      content,
      priority,
      category: categoryId,
      createdAt: new Date().toISOString(),
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

  // Edit a task
  const editTask = (id, listId, updatedTask) => {
    const updatedList = tasks[listId].map((task) => (task.id === id ? { ...task, ...updatedTask } : task))

    setTasks({
      ...tasks,
      [listId]: updatedList,
    })
  }

  // Add a new category
  const addCategory = (name, color) => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      name,
      color,
    }

    setCategories([...categories, newCategory])
  }

  // Edit a category
  const editCategory = (id, updatedCategory) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, ...updatedCategory } : category,
    )

    setCategories(updatedCategories)
  }

  // Delete a category
  const deleteCategory = (id) => {
    // Don't delete if there are tasks using this category
    const hasTasksWithCategory = Object.values(tasks)
      .flat()
      .some((task) => task.category === id)

    if (hasTasksWithCategory) {
      alert("Cannot delete category that is being used by tasks")
      return false
    }

    const updatedCategories = categories.filter((category) => category.id !== id)
    setCategories(updatedCategories)
    return true
  }

  // Save user profile
  const saveUserProfile = (profile) => {
    setUserProfile(profile)
    setShowProfileModal(false)
  }

  return (
    <div className="app-container">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        userProfile={userProfile}
      />
      <div className="main-content">
        <Header
          currentPage={currentPage}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userProfile={userProfile}
          openProfileModal={() => setShowProfileModal(true)}
        />

        {currentPage === "tasks" ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <TaskBoard
              tasks={tasks}
              addTask={addTask}
              deleteTask={deleteTask}
              editTask={editTask}
              categories={categories}
            />
          </DragDropContext>
        ) : currentPage === "profiles" ? (
          <ProfilesPage userProfile={userProfile} openProfileModal={() => setShowProfileModal(true)} />
        ) : currentPage === "categories" ? (
          <CategoriesPage
            categories={categories}
            addCategory={addCategory}
            editCategory={editCategory}
            deleteCategory={deleteCategory}
          />
        ) : null}
      </div>

      {showProfileModal && (
        <ProfileModal
          onSave={saveUserProfile}
          onClose={() => userProfile && setShowProfileModal(false)}
          initialData={userProfile}
        />
      )}
    </div>
  )
}

export default App
