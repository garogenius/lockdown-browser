import type React from "react"

interface TimerProps {
  timeRemaining: number
}

const Timer: React.FC<TimerProps> = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60000)
  const seconds = Math.floor((timeRemaining % 60000) / 1000)

  const formatTime = (mins: number, secs: number) => {
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return (
    <div className="timer-bar">
      <span className="timer-label">Time Remaining:</span>
      <span className="timer-display">{formatTime(minutes, seconds)}</span>
    </div>
  )
}

export default Timer
