const { spawn } = require("child_process")
const path = require("path")

let reactProcess = null
let electronProcess = null

function startReactDev() {
  console.log("Starting React dev server...")
  reactProcess = spawn("npm", ["run", "react-dev"], {
    stdio: "inherit",
    shell: true,
  })

  reactProcess.on("error", (err) => {
    console.error("React dev server error:", err)
    process.exit(1)
  })
}

function startElectronDev() {
  console.log("Waiting for React dev server to start...")
  setTimeout(() => {
    console.log("Starting Electron...")
    electronProcess = spawn("npm", ["run", "electron-dev"], {
      stdio: "inherit",
      shell: true,
    })

    electronProcess.on("error", (err) => {
      console.error("Electron error:", err)
      process.exit(1)
    })
  }, 3000)
}

startReactDev()
startElectronDev()

process.on("SIGINT", () => {
  console.log("Shutting down...")
  if (reactProcess) reactProcess.kill()
  if (electronProcess) electronProcess.kill()
  process.exit(0)
})
