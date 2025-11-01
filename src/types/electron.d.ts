interface ElectronAPI {
  startSession: () => Promise<number>
  getRemainingTime: () => Promise<number>
  endSession: () => Promise<void>
  checkUrl: (url: string) => Promise<boolean>
  closeApp: () => void
}

interface Window {
  electronAPI: ElectronAPI
}
