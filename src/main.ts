import { app, BrowserWindow, ipcMain, Menu, globalShortcut } from "electron"
import path from "path"
import isDev from "electron-is-dev"
import { URL } from "url"

const WHITELIST = [
  "https://www.ixl.com",
  "https://www.khanacademy.org",
  "https://www.google.com",
  "https://www.youtube.com/watch?v=",
]

const SESSION_DURATION_MS = 10 * 60 * 1000 // 10 minutes
let mainWindow: BrowserWindow | null = null
let sessionEndTime = 0
let isSessionActive = false

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
      webSecurity: true,
    },
  })

  const startUrl = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`

  mainWindow.loadURL(startUrl)

  mainWindow.webContents.on("will-navigate", (event, url) => {
    const isAllowed = WHITELIST.some((whitelistedUrl) => url.startsWith(whitelistedUrl))
    if (!isAllowed) {
      event.preventDefault()
    }
  })

  mainWindow.webContents.on("will-navigate", (event, url) => {
    const isAllowed = WHITELIST.some((whitelistedUrl) => url.startsWith(whitelistedUrl))
    if (!isAllowed) {
      event.preventDefault()
    }
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return { action: "deny" }
  })

  // Prevent window closing
  mainWindow.on("close", (event) => {
    if (isSessionActive) {
      event.preventDefault()
    }
  })

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show()
  })

  mainWindow.on("closed", () => {
    mainWindow = null
  })

  // Remove menu and developer tools
  Menu.setApplicationMenu(null)

  mainWindow.webContents.on("before-input-event", (event, input) => {
    // Block developer tools and common escape shortcuts
    if (input.control && input.shift && input.key.toLowerCase() === "i") {
      event.preventDefault()
    }
    if (input.key === "F12") {
      event.preventDefault()
    }
    if (input.control && input.key.toLowerCase() === "r") {
      event.preventDefault()
    }
    if (input.key === "F5") {
      event.preventDefault()
    }
  })
}

// Disable all global shortcuts
function disableSystemShortcuts() {
  const shortcutsToDisable = ["Alt+Tab", "Ctrl+Shift+Esc", "Ctrl+N", "Ctrl+T", "Ctrl+W", "Cmd+Tab", "Cmd+Q"]

  shortcutsToDisable.forEach((shortcut) => {
    try {
      globalShortcut.register(shortcut, () => {
        return
      })
    } catch (e) {
      // Some shortcuts may not be available on all platforms
    }
  })
}

// IPC Handlers
ipcMain.handle("start-session", () => {
  isSessionActive = true
  sessionEndTime = Date.now() + SESSION_DURATION_MS
  return sessionEndTime
})

ipcMain.handle("get-remaining-time", () => {
  const remaining = Math.max(0, sessionEndTime - Date.now())
  return remaining
})

ipcMain.handle("end-session", () => {
  isSessionActive = false
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.handle("check-url", (event, url: string) => {
  try {
    const parsedUrl = new URL(url)
    const isAllowed = WHITELIST.some((whitelistedUrl) => parsedUrl.href.startsWith(whitelistedUrl))
    return isAllowed
  } catch {
    return false
  }
})

ipcMain.on("close-app", () => {
  if (!isSessionActive) {
    if (mainWindow) {
      mainWindow.close()
    }
  }
})

app.on("ready", () => {
  createWindow()
  disableSystemShortcuts()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
