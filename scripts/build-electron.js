const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")

try {
  console.log("Building Electron main process...")
  execSync("npx tsc src/main.ts --target ES2020 --module commonjs --outDir public --skipLibCheck --esModuleInterop", {
    stdio: "inherit",
    cwd: process.cwd(),
  })

  console.log("Building preload script...")
  execSync(
    "npx tsc src/preload.ts --target ES2020 --module commonjs --outDir public --skipLibCheck --esModuleInterop",
    {
      stdio: "inherit",
      cwd: process.cwd(),
    },
  )

  console.log("Build complete!")
} catch (error) {
  console.error("Build failed:", error.message)
  process.exit(1)
}
