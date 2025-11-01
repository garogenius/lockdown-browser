"use client"

import type React from "react"
import { useState, useEffect } from "react"
import BrowserFrame from "./components/BrowserFrame"
import Timer from "./components/Timer"
import "./App.css"

declare global {
  interface Window {
    electronAPI?: {
      startSession: () => Promise<number>
      getRemainingTime: () => Promise<number>
      endSession: () => Promise<void>
      checkUrl: (url: string) => Promise<boolean>
      closeApp: () => void
    }
  }
}

const App: React.FC = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSessionStarted) return

    const interval = setInterval(async () => {
      try {
        if (!window.electronAPI) {
          console.error("[v0] electronAPI not available")
          return
        }
        const remaining = await window.electronAPI.getRemainingTime()
        setTimeRemaining(remaining)

        if (remaining <= 0) {
          clearInterval(interval)
          await window.electronAPI.endSession()
        }
      } catch (err) {
        console.error("[v0] Error getting remaining time:", err)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isSessionStarted])

  const handleStartSession = async () => {
    try {
      if (!window.electronAPI) {
        setError("Electron API not available. Make sure you're running the app with Electron.")
        return
      }
      await window.electronAPI.startSession()
      setIsSessionStarted(true)
    } catch (err) {
      console.error("[v0] Error starting session:", err)
      setError("Failed to start session")
    }
  }

  if (!isSessionStarted) {
    return (
      <div className="start-screen">
        <div className="start-container">
          <h1>Lockdown Browser</h1>
          <p>Secure browsing with time limits</p>
          {error && (
            <p className="error-message" style={{ color: "#e74c3c", marginTop: "15px" }}>
              {error}
            </p>
          )}
          <button onClick={handleStartSession} className="start-button">
            Start Session
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Timer timeRemaining={timeRemaining} />
      <BrowserFrame />
    </div>
  )
}

export default App
