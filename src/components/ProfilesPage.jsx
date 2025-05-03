import { useState } from "react"
import { Search, Plus, MoreHorizontal, Edit2, Trash2, Star, UserPlus } from 'lucide-react'
import "../styles/ProfilesPage.css"

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Development Team",
      members: 8,
      favorite: true,
      lastUpdated: "2 days ago",
      description: "Software development team profiles and access settings",
    },
    {
      id: 2,
      name: "Marketing Campaign",
      members: 5,
      favorite: false,
      lastUpdated: "1 week ago",
      description: "Marketing team access profiles for Q2 campaign",
    },
    {
      id: 3,
      name: "System Administrators",
      members: 3,
      favorite: true,
      lastUpdated: "3 days ago",
      description: "Admin access profiles with elevated permissions",
    },
    {
      id: 4,
      name: "Client Portal Users",
      members: 12,
      favorite: false,
      lastUpdated: "Yesterday",
      description: "External client access profiles with limited permissions",
    },
    {
      id: 5,
      name: "Data Analysis Team",
      members: 6,
      favorite: false,
      lastUpdated: "4 days ago",
      description: "Data science team with database access profiles",
    },
  ])

  const [filterText, setFilterText] = useState("")

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(filterText.toLowerCase()) ||
    profile.description.toLowerCase().includes(filterText.toLowerCase())
  )

  const toggleFavorite = (id) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, favorite: !profile.favorite } : profile
    ))
  }

  return (
    <div className="profiles-container">
      <div className="profiles-header">
        <div className="profiles-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search profiles..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="profiles-search-input" 
          />
        </div>
        
        <button className="create-profile-btn">
          <Plus size={16} />
          <span>Create Profile</span>
        </button>
      </div>
      
      <div className="profiles-grid">
        {filteredProfiles.map(profile => (
          <div className="profile-card" key={profile.id}>
            <div className="profile-card-header">
              <div className="profile-icon">{profile.name.charAt(0)}</div>
              <button 
                className={`favorite-btn ${profile.favorite ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(profile.id)}
              >
                <Star size={16} fill={profile.favorite ? "currentColor" : "none"} />
              </button>
              <div className="profile-menu">
                <button className="profile-menu-btn">
                  <MoreHorizontal size={18} />
                </button>
                <div className="profile-menu-dropdown">
                  <button className="profile-menu-item">
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </button>
                  <button className="profile-menu-item">
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="profile-card-content">
              <h3 className="profile-name">{profile.name}</h3>
              <p className="profile-description">{profile.description}</p>
            </div>
            
            <div className="profile-card-footer">
              <div className="profile-members">
                <UserPlus size={14} />
                <span>{profile.members} members</span>
              </div>
              <div className="profile-updated">Updated {profile.lastUpdated}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilesPage
