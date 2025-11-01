"use client"

import type React from "react"
import { useRef, useState } from "react"

const BrowserFrame: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [currentUrl, setCurrentUrl] = useState("https://www.khanacademy.org")
  const [urlInput, setUrlInput] = useState(currentUrl)
  const [error, setError] = useState("")

  const handleNavigate = async () => {
    try {
      if (!window.electronAPI) {
        setError("Electron API not available")
        setTimeout(() => setError(""), 3000)
        return
      }

      const isAllowed = await window.electronAPI.checkUrl(urlInput)

      if (isAllowed) {
        setCurrentUrl(urlInput)
        setError("")
      } else {
        setError("This website is not allowed. Please try another URL.")
        setTimeout(() => setError(""), 3000)
      }
    } catch (err) {
      console.error("[v0] Error checking URL:", err)
      setError("Error checking URL")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNavigate()
    }
  }

  return (
    <div className="browser-frame">
      <div className="browser-toolbar">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter whitelisted URL"
          className="url-input"
        />
        <button onClick={handleNavigate} className="nav-button">
          Go
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <iframe
        ref={iframeRef}
        src={currentUrl}
        title="Lockdown Browser"
        className="iframe-content"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
      />
    </div>
  )
}

export default BrowserFrame
