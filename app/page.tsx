export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Lockdown Browser</h1>
            <p className="text-xl text-slate-300">A secure, full-screen desktop browser for controlled web access</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-semibold mb-2">Full-Screen Lockdown</h3>
              <p className="text-slate-300">Prevents minimizing, closing, or alt-tabbing away from the application.</p>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-semibold mb-2">URL Whitelist</h3>
              <p className="text-slate-300">Restrict browsing to pre-approved websites only.</p>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-semibold mb-2">Timed Sessions</h3>
              <p className="text-slate-300">Automatic countdown timer with session expiration.</p>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
              <p className="text-slate-300">Runs on Windows 10+ and macOS 10.13+.</p>
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="bg-slate-700 p-8 rounded-lg border border-slate-600 space-y-6">
            <h2 className="text-2xl font-bold">Getting Started</h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">1. Install Dependencies</h4>
                <code className="bg-slate-900 p-3 rounded block text-slate-200">npm install</code>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">2. Development Mode</h4>
                <code className="bg-slate-900 p-3 rounded block text-slate-200">npm run dev</code>
                <p className="text-slate-400 mt-2 text-sm">This starts both Electron and React dev server</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">3. Production Build</h4>
                <code className="bg-slate-900 p-3 rounded block text-slate-200">npm run make</code>
                <p className="text-slate-400 mt-2 text-sm">Creates installers for Windows and macOS</p>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-slate-700 p-8 rounded-lg border border-slate-600 space-y-6">
            <h2 className="text-2xl font-bold">Configuration</h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Whitelist URLs</h4>
                <p className="text-slate-300 mb-2">
                  Edit the <code className="bg-slate-900 px-2 py-1 rounded">WHITELIST</code> array in{" "}
                  <code className="bg-slate-900 px-2 py-1 rounded">src/main.ts</code>:
                </p>
                <pre className="bg-slate-900 p-4 rounded text-slate-200 text-sm overflow-x-auto">
                  {`const WHITELIST = [
  "https://www.ixl.com",
  "https://www.khanacademy.org",
  "https://www.google.com",
];`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Session Duration</h4>
                <p className="text-slate-300 mb-2">
                  Modify <code className="bg-slate-900 px-2 py-1 rounded">SESSION_DURATION_MS</code> in{" "}
                  <code className="bg-slate-900 px-2 py-1 rounded">src/main.ts</code>:
                </p>
                <pre className="bg-slate-900 p-4 rounded text-slate-200 text-sm">
                  {`const SESSION_DURATION_MS = 10 * 60 * 1000; // 10 minutes`}
                </pre>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-slate-700 p-8 rounded-lg border border-slate-600 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Security Features</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                <span>Context isolation prevents XSS attacks</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                <span>Disabled developer tools and console access</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                <span>Sandboxed renderer process</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                <span>System shortcut interception (Alt+Tab, Ctrl+Shift+Esc, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                <span>Secure preload script for IPC communication</span>
              </li>
            </ul>
          </div>

          {/* Project Structure */}
          <div className="bg-slate-700 p-8 rounded-lg border border-slate-600 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Project Structure</h2>
            <pre className="bg-slate-900 p-4 rounded text-slate-200 text-sm overflow-x-auto">
              {`lockdown-browser/
├── src/
│   ├── main.ts              # Electron main process
│   ├── preload.ts           # Secure IPC bridge
│   ├── types/
│   │   └── electron.d.ts    # Type definitions
│   ├── components/
│   │   ├── Timer.tsx        # Countdown timer
│   │   └── BrowserFrame.tsx # Browser UI
│   ├── App.tsx              # Main app component
│   └── App.css              # Styling
├── public/
│   └── index.html           # HTML entry
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── README.md                # Full documentation`}
            </pre>
          </div>

          {/* Footer */}
          <div className="text-center text-slate-400 pt-8 border-t border-slate-600">
            <p>For full documentation and troubleshooting, see README.md in the project root.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
