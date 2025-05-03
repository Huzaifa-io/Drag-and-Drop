"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Home,
  Calendar,
  CheckSquare,
  Users,
  Settings,
  FileText,
  Code,
  Package,
  Database,
} from "lucide-react"
import "../styles/Sidebar.css"

const Sidebar = () => {
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
    { title: "Dashboard", icon: <Home size={16} /> },
    { title: "My Tasks", icon: <CheckSquare size={16} /> },
    { title: "Calendar", icon: <Calendar size={16} /> },
    { title: "Team", icon: <Users size={16} /> },
    { title: "Settings", icon: <Settings size={16} /> },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>Project Manager</span>
      </div>

      <div className="quick-links">
        {quickLinks.map((item, index) => (
          <div key={index} className="quick-link-item">
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
    </div>
  )
}

export default Sidebar
