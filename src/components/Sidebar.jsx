"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Home, CheckSquare, Users, Settings, FileText, Tag, User, X } from "lucide-react"
import "../styles/Sidebar.css"

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen, userProfile }) => {
  const [expandedItems, setExpandedItems] = useState({
    "Project Structure": true,
  })

  const toggleExpand = (title) => {
    setExpandedItems({
      ...expandedItems,
      [title]: !expandedItems[title],
    })
  }

  const quickLinks = [
    { title: "Dashboard", icon: <Home size={16} />, id: "tasks" },
    { title: "Categories", icon: <Tag size={16} />, id: "categories" },
    { title: "Profile", icon: <Users size={16} />, id: "profiles" },
  ]

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="app-logo">
          <CheckSquare size={20} />
          <span>TaskFlow</span>
        </div>
        <button className="close-sidebar" onClick={() => setIsOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="quick-links">
        {quickLinks.map((item) => (
          <div
            key={item.id}
            className={`quick-link-item ${currentPage === item.id ? "active" : ""}`}
            onClick={() => {
              setCurrentPage(item.id)
              if (window.innerWidth < 768) {
                setIsOpen(false)
              }
            }}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-title">{item.title}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-content">

      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <div className="user-name">{userProfile ? userProfile.name : "Guest User"}</div>
            <div className="user-role">{userProfile ? userProfile.businessName : "No Business"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
