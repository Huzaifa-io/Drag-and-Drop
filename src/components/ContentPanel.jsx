import "../styles/ContentPanel.css"

const ContentPanel = ({ title, type }) => {
  // Different content based on panel type
  const renderContent = () => {
    if (type === "attributes") {
      return (
        <div className="attributes-content">
          <div className="attribute-item">
            <span className="attribute-label">select.css / function</span>
            <span className="attribute-value">selector.apply</span>
          </div>
          <div className="attribute-item">
            <span className="attribute-label">arguments / type</span>
            <span className="attribute-value">string[] / literal</span>
          </div>
          <div className="attribute-item">
            <span className="attribute-label">return / type</span>
            <span className="attribute-value">string</span>
          </div>
          <div className="attribute-item">
            <span className="attribute-label">location</span>
            <span className="attribute-value">src/utils/styles.js:45</span>
          </div>
          <div className="attribute-item">
            <span className="attribute-label">system.branch.lock.in</span>
            <span className="attribute-value code-value">main</span>
          </div>
          <div className="attribute-item highlight">
            <span className="attribute-label">function.ts.lock.in</span>
            <span className="attribute-value code-value">main</span>
          </div>
        </div>
      )
    }

    // Empty panel for other types
    return <div className="empty-panel"></div>
  }

  return (
    <div className="content-panel">
      <div className="panel-header">
        <h3>{title}</h3>
      </div>
      <div className="panel-content">{renderContent()}</div>
    </div>
  )
}

export default ContentPanel
