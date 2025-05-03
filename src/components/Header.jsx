import { Search, Bell, Settings, User, Menu } from 'lucide-react'
import "../styles/Header.css"

const Header = ({ currentPage, setCurrentPage, toggleSidebar }) => {
    const getPageTitle = () => {
        switch (currentPage) {
            case "tasks":
                return "Task Management"
            case "profiles":
                return "Saved Profiles"
            default:
                return "Dashboard"
        }
    }

    return (
        <header className="app-header">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <Menu size={20} />
            </button>
            <div className="header-title">
                <h1>{getPageTitle()}</h1>
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

                <div
                    onClick={() => { setCurrentPage("profiles") }} className="profile-dropdown">
                    <button className="profile-btn">
                        <div className="profile-avatar">
                            <User size={18} />
                        </div>
                        <span className="profile-name">Alex Morgan</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
