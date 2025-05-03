"use client"

import { User, Edit } from "lucide-react"
import "../styles/ProfilesPage.css"

const ProfilesPage = ({ userProfile, openProfileModal }) => {
  if (!userProfile) {
    return (
      <div className="profiles-container empty-profile">
        <div className="empty-profile-message">
          <User size={48} />
          <h2>No Profile Created</h2>
          <p>Please create a profile to get started</p>
          <button className="create-profile-btn" onClick={openProfileModal}>
            Create Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="profiles-container">
      <div className="profiles-header">
        <h1>User Profile</h1>
      </div>

      <div className="profile-details">
        <div className="profile-avatar">
          <User size={28} />
        </div>

        <div className="profile-info">
          <div className="profile-field">
            <label>Name</label>
            <p>{userProfile.name}</p>
          </div>

          <div className="profile-field">
            <label>Business Name</label>
            <p>{userProfile.businessName}</p>
          </div>

          <div className="profile-actions">
            <button className="edit-profile-btn" onClick={openProfileModal}>
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilesPage
