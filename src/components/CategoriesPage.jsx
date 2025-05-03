"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import "../styles/CategoriesPage.css"

const CategoriesPage = ({ categories, addCategory, editCategory, deleteCategory }) => {
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    color: "#F59E0B",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.name.trim()) {
      if (editingCategory) {
        editCategory(editingCategory.id, formData)
        setEditingCategory(null)
      } else {
        addCategory(formData.name, formData.color)
      }

      setFormData({ name: "", color: "#F59E0B" })
      setShowForm(false)
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      color: category.color,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    deleteCategory(id)
  }

  const handleCancel = () => {
    setEditingCategory(null)
    setFormData({ name: "", color: "#F59E0B" })
    setShowForm(false)
  }

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Categories</h1>
        <button
          className="add-category-button"
          onClick={() => {
            setEditingCategory(null)
            setFormData({ name: "", color: "#F59E0B" })
            setShowForm(true)
          }}
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      {showForm && (
        <div className="category-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Category Color</label>
              <div className="color-picker-container">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="color-picker"
                />
                <span className="color-value">{formData.color}</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="categories-list">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <div className="category-color" style={{ backgroundColor: category.color }}></div>
            <div className="category-info">
              <h3>{category.name}</h3>
            </div>
            <div className="category-actions">
              <button className="category-edit-btn" onClick={() => handleEdit(category)}>
                <Edit2 size={16} />
              </button>
              <button className="category-delete-btn" onClick={() => handleDelete(category.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
