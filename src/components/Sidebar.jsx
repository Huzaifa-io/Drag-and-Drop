"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  FileText,
  Code,
  Package,
  Database,
  Shield,
  User,
  X,
} from "lucide-react"
import "../styles/Sidebar.css"

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const [expandedItems, setExpandedItems] = useState({
    "Project Structure": true,
    Components: true,
    Pages: true,
  })

  const toggleExpand = (title) => {
    setExpandedItems({
      ...expandedItems,
      [title]: !expandedItems[title],
    })
  }

  const menuItems = [
    {
      title: "Project Structure",
      icon: <FileText size={16} />,
      subItems: ["src", "public", "assets"],
    },
    {
      title: "Libraries",
      icon: <Package size={16} />,
      subItems: ["react-beautiful-dnd", "lucide-react", "date-fns"],
    },
    {
      title: "Scripts",
      icon: <Code size={16} />,
      subItems: ["dev", "build", "preview", "lint"],
    },
    {
      title: "Components",
      icon: <Database size={16} />,
      subItems: ["TaskBoard.jsx", "TaskColumn.jsx", "TaskItem.jsx", "Sidebar.jsx"],
    },
    {
      title: "Pages",
      icon: <FileText size={16} />,
      subItems: ["Dashboard.jsx", "Projects.jsx", "Calendar.jsx", "Settings.jsx"],
    },
  ]

  const quickLinks = [
    { title: "Dashboard", icon: <Home size={16} />, id: "tasks" },
    { title: "Profiles", icon: <Users size={16} />, id: "profiles" },
  ]

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="app-logo">
          <Shield size={20} />
          <span>Argus</span>
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
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-header" onClick={() => toggleExpand(item.title)}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
              <span className="menu-expand">
                {expandedItems[item.title] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            </div>
            {expandedItems[item.title] && item.subItems.length > 0 && (
              <div className="submenu">
                {item.subItems.map((subItem, subIndex) => (
                  <div key={subIndex} className="submenu-item">
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <div className="user-name">Alex Morgan</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
