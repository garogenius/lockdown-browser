import { contextBridge, ipcRenderer } from "electron"

// Expose secure IPC methods to renderer
contextBridge.exposeInMainWorld("electronAPI", {
  startSession: () => ipcRenderer.invoke("start-session"),
  getRemainingTime: () => ipcRenderer.invoke("get-remaining-time"),
  endSession: () => ipcRenderer.invoke("end-session"),
  checkUrl: (url: string) => ipcRenderer.invoke("check-url", url),
  closeApp: () => ipcRenderer.send("close-app"),
})
