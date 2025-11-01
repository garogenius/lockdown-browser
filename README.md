# Lockdown Browser

A secure, full-screen browser application built with Electron that restricts browsing to whitelisted websites and enforces strict time limits. Perfect for controlled educational or testing environments.

## Features

- **Full-Screen Lockdown**: Prevents minimizing, closing, or alt-tabbing away
- **URL Whitelist Enforcement**: Only allows access to pre-approved websites
- **Timed Sessions**: Automatically closes after a set duration (default: 10 minutes)
- **Countdown Timer**: Displays remaining session time
- **Security**: Disables developer tools and system shortcuts
- **Cross-Platform**: Runs on Windows and macOS
- **Modern UI**: Clean, intuitive interface with clear navigation

## Technical Stack

- **Electron**: Desktop application framework
- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Node.js**: Backend logic
- **electron-builder**: Cross-platform installer creation

## System Requirements

- **Windows**: Windows 10 or later (64-bit)
- **macOS**: macOS 10.13 or later

## Installation & Setup

### For Development

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/garogenius/lockdown-browser.git
   cd lockdown-browser
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run in development mode:
   \`\`\`bash
   npm run dev
   \`\`\`
   This starts both the Electron main process and React dev server.

### Building for Production

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Create installer packages:
   \`\`\`bash
   npm run make
   \`\`\`

   This will generate:
   - **Windows**: `dist/Lockdown Browser Setup.exe` (NSIS installer) and portable `.exe`
   - **macOS**: `dist/Lockdown Browser.dmg` and `.zip`

3. To create distribution without installer:
   \`\`\`bash
   npm run dist
   \`\`\`

## Configuration

### Modifying the Whitelist

Edit the `WHITELIST` array in `src/main.ts`:

\`\`\`typescript
const WHITELIST = [
  "https://www.ixl.com",
  "https://www.khanacademy.org",
  "https://www.google.com",
  "https://www.youtube.com/watch?v=",
];
\`\`\`

Add or remove URLs as needed. The app checks if the requested URL starts with any whitelisted URL.

### Changing Session Duration

Modify `SESSION_DURATION_MS` in `src/main.ts`:

\`\`\`typescript
const SESSION_DURATION_MS = 10 * 60 * 1000; // 10 minutes
\`\`\`

Change the multiplier to adjust duration (e.g., `5 * 60 * 1000` for 5 minutes).

## Disabled Features & Shortcuts

For security, the following are disabled:
- Developer tools (Ctrl+Shift+I, F12)
- Page refresh (Ctrl+R, F5)
- Alt+Tab, Cmd+Tab (window switching)
- Ctrl+Shift+Esc (task manager)
- Ctrl+N, Ctrl+T (new window/tab)
- Cmd+Q (quit on macOS)

## How It Works

1. **Launch**: User starts the application
2. **Start Screen**: Click "Start Session" to begin
3. **Session Active**: Browser locked in full-screen with countdown timer
4. **Navigation**: Type URLs in the address bar and click "Go"
5. **Whitelist Check**: System verifies URL is whitelisted before loading
6. **Time Expires**: When countdown reaches 00:00, the app closes automatically

## Known Limitations

- Iframe-based browsing may not work perfectly with all websites
- Some sites with strict CORS policies may not display properly
- Full page interception is limited to iframe content
- Workarounds for iframe restrictions may require advanced configuration

## Troubleshooting

### App Won't Start
- Ensure Node.js 16+ is installed
- Run `npm install` to install dependencies
- Try deleting `node_modules` and reinstalling

### DevTools Shortcuts Still Work
- Restart the application
- Check that you're running the production build, not development

### Whitelist Not Working
- Ensure URLs include protocol (https:// or http://)
- Check URL format matches exactly (trailing slashes matter)
- URLs should be complete paths for specific pages

## Development Notes

### Project Structure

\`\`\`
lockdown-browser/
├── src/
│   ├── main.ts           # Electron main process
│   ├── preload.ts        # Secure IPC bridge
│   ├── types/
│   │   └── electron.d.ts # Type definitions
│   ├── components/       # React components
│   ├── App.tsx           # Main app component
│   └── App.css           # Styling
├── public/
│   └── index.html        # HTML entry point
├── package.json          # Dependencies & build config
├── tsconfig.json         # TypeScript config
└── README.md
\`\`\`

### Building Components

When adding new features:
1. Keep security in mind - validate all user inputs
2. Use TypeScript for type safety
3. Leverage IPC for main process communication
4. Keep UI responsive during long operations

## Security Considerations

- **Context Isolation**: Enabled to prevent XSS attacks
- **Node Integration**: Disabled to prevent direct Node access
- **Sandbox**: Renderer process runs in sandbox
- **Preload Script**: Securely exposes only needed IPC methods
- **Web Security**: Enabled to enforce same-origin policies

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact net.suleimangaro@gmail.com.
