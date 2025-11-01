# Lockdown Browser - Setup & Deployment Guide

## System Requirements

- **Windows**: Windows 10 or later (64-bit)
- **macOS**: macOS 10.13 or later
- **Node.js**: 16.0.0 or later

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Development Mode
\`\`\`bash
npm run dev
\`\`\`

This command:
- Starts the React dev server on `http://localhost:3000`
- Automatically waits for the dev server to be ready
- Launches the Electron app in development mode
- Enables hot reloading for React components

### 3. Test the Application
1. Click "Start Session" on the start screen
2. Try navigating to allowed URLs (default: ixl.com, khanacademy.org, google.com)
3. Try navigating to blocked URLs (e.g., youtube.com) - should be blocked
4. Verify the 10-minute countdown timer
5. Verify you cannot minimize, close, or Alt+Tab away

## Configuration Before Building

### Configure Whitelist URLs

Edit `src/main.ts` and update the `WHITELIST` array:

\`\`\`typescript
const WHITELIST = [
  "https://www.ixl.com",
  "https://www.khanacademy.org",
  "https://www.google.com",
  "https://www.youtube.com/watch?v=",
  // Add more URLs as needed
]
\`\`\`

**Important**: URLs must include the protocol (https:// or http://)

### Configure Session Duration

Edit `src/main.ts` and update `SESSION_DURATION_MS`:

\`\`\`typescript
// 10 minutes
const SESSION_DURATION_MS = 10 * 60 * 1000

// For 5 minutes:
// const SESSION_DURATION_MS = 5 * 60 * 1000

// For 30 minutes:
// const SESSION_DURATION_MS = 30 * 60 * 1000
\`\`\`

## Building for Production

### Step 1: Build the Application
\`\`\`bash
npm run build
\`\`\`

This will:
- Build the React app with Next.js
- Compile TypeScript files for Electron (main process and preload)
- Create optimized production bundles

### Step 2: Create Installers
\`\`\`bash
npm run make
\`\`\`

This will generate platform-specific installers in the `dist/` folder:

**Windows:**
- `Lockdown Browser Setup.exe` - NSIS installer (recommended for end users)
- `Lockdown Browser.exe` - Portable executable (no installation needed)

**macOS:**
- `Lockdown Browser.dmg` - DMG installer
- `Lockdown Browser.zip` - Standalone app archive

### Step 3: Distribute

Distribute the appropriate installer for each platform to your users.

## Customization Guide

### Change Application Name

Edit `package.json`:
\`\`\`json
{
  "name": "your-app-name",
  "build": {
    "productName": "Your App Name"
  }
}
\`\`\`

Also update `public/index.html`:
\`\`\`html
<title>Your App Name</title>
\`\`\`

### Customize Styling

Edit `src/App.css` to change:
- Start screen gradient colors
- Timer colors
- Browser toolbar colors
- Error message styling

### Add Custom Start Screen

Modify `src/App.tsx` start screen JSX to add your branding, instructions, or authentication.

## Troubleshooting

### Issue: "Cannot find module 'electron'"
**Solution**: Run `npm install`

### Issue: "React dev server not starting"
**Solution**: 
- Kill any process on port 3000: `lsof -ti:3000 | xargs kill -9`
- Run `npm run dev` again

### Issue: "Whitelist not working"
**Solution**:
- Ensure URLs include the protocol (https://)
- Check for trailing slashes - URLs must match exactly
- Restart the app after editing `src/main.ts`

### Issue: "DevTools still accessible"
**Solution**: 
- This only happens in development mode
- In production builds (npm run make), DevTools are completely disabled

### Issue: "App won't start on macOS"
**Solution**:
- Allow app to run in System Preferences > Security & Privacy
- Or build with code signing: update the `mac` section in `package.json` build config

## Advanced Configuration

### Enable Auto-Updates (Future Feature)

Edit `src/main.ts` to add electron-updater integration for automatic updates when new versions are released.

### Add Password Protection

Modify `src/App.tsx` to add a login screen before the start button:
\`\`\`tsx
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [password, setPassword] = useState("")

const handleLogin = (pwd: string) => {
  if (pwd === "your-password") {
    setIsAuthenticated(true)
  }
}
\`\`\`

### Customize Error Messages

Edit UI error messages in:
- `src/components/BrowserFrame.tsx` - URL validation errors
- `src/App.tsx` - Session start errors

## Security Best Practices

1. **Whitelist Only Trusted Domains**: Review all whitelisted URLs regularly
2. **Use HTTPS**: Only allow HTTPS URLs when possible
3. **Regular Updates**: Keep Electron and dependencies updated
4. **Distribute from Trusted Sources**: Only distribute installers from official channels
5. **Code Signing** (Advanced): Consider code signing on Windows and macOS for additional security

## Distribution Checklist

Before distributing to users:

- [ ] Whitelist is configured correctly
- [ ] Session duration is appropriate
- [ ] App builds without errors: `npm run build`
- [ ] Installers are created: `npm run make`
- [ ] Tested on target platform (Windows/macOS)
- [ ] Tested all whitelisted URLs
- [ ] Tested URL blocking
- [ ] Tested timer countdown
- [ ] Verified window lockdown features
- [ ] Test as regular user (not admin)

## Support & Troubleshooting

For issues:
1. Check that Node.js 16+ is installed: `node --version`
2. Delete `node_modules` and run `npm install` again
3. Try building on a fresh checkout
4. Check system logs for error messages

---

**Version**: 1.0.0
**Last Updated**: 2024
**Platform Support**: Windows 10+, macOS 10.13+
