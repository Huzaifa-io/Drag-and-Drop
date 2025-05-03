"use client"

import { Search, Bell, Settings, User, Menu } from "lucide-react"
import "../styles/Header.css"

const Header = ({ currentPage, toggleSidebar, userProfile, openProfileModal }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case "tasks":
        return "Dashboard"
      case "profiles":
        return "User Profile"
      case "categories":
        return "Categories"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="header-title">
          <h1>{getPageTitle()}</h1>
        </div>
      </div>

      <div className="header-search">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      <div className="header-actions">
        <button className="header-action-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <button className="header-action-btn">
          <Settings size={20} />
        </button>

        <div className="profile-dropdown">
          <button className="profile-btn" onClick={openProfileModal}>
            <div className="profile-avatar">
              <User size={18} />
            </div>
            {userProfile && <span className="profile-name">{userProfile.name}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
