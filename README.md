# Social Engineering Attack

This repository contains educational demonstrations of social engineering attacks for security research and user awareness studies.

Github Link: https://github.com/mabaan/Social-Engineering-Attack

## Part 1: GUI Confusion Attack

This demonstration simulates a phishing attack that uses GUI confusion techniques to trick users into entering their credentials on a fake login page. The experiment includes two conditions to study the impact of fullscreen mode on user susceptibility.

### How It Works

1. A legitimate-looking BBC News page loads
2. After 10 seconds, a paywall overlay appears asking users to log in with Google
3. When users click "Login to view for free", a fake Google sign-in page appears
4. If users enter their credentials and submit, the data is logged to a text file with a timestamp
5. An error message appears and the attack exits

### Experimental Conditions

**Condition A (Fullscreen)**: When users click the paywall button, the fake Google login page takes over the entire screen using the browser fullscreen API. This maximizes the deception by hiding browser UI elements.

**Condition B (Inline)**: When users click the paywall button, the fake Google login appears in the normal browser window without entering fullscreen mode. Browser navigation and address bar remain visible.

### Running the Demo

Navigate to the GUI Confusion folder:

```bash
cd "GUI Confusion"
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and access either condition:

- Condition A (fullscreen): `http://localhost:5173/condition-a.html`
- Condition B (inline): `http://localhost:5173/condition-b.html`

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` folder. Both condition files will be built and ready for deployment.

### Important Notes

- This is for educational purposes only
- Use only in controlled environments with informed consent
- All data is stored locally and never transmitted
- Credentials are saved to `credentials.txt` in your downloads folder
- Both conditions use identical code except for the fullscreen behavior

## Part 2: Privacy Dark Patterns Study

This demonstration explores how UI design affects users' ability to manage privacy settings, focusing on whether hidden or ambiguous controls reduce users' ability to disable tracking and permissions. The study compares two interface variants to measure the impact of dark patterns on user privacy awareness.

### How It Works

1. Users complete a simple profile setup task (username, bio, interests)
2. Privacy settings are displayed alongside the task
3. Users can adjust 18 privacy-invasive settings before clicking "Save Settings"
4. The console logs how many invasive options remain enabled (format: `X/18 privacy-invasive options still enabled`)
5. All interactions are simulated - no actual data is collected or transmitted

### Interface Variants

**Hard Variant (Dark Patterns):**
- Privacy-invasive settings hidden in collapsible dropdowns
- Decreasing text size and opacity for more sensitive permissions
- Vague, euphemistic labels ("Enhanced Experience", "Content Optimization")
- Important settings buried at the bottom with minimal visibility
- Grey checkboxes and switches to reduce visual prominence
- Prominent "Enable All Features" button encouraging bad privacy choices

**Easy Variant (Clear Layout):**
- All 18 privacy settings displayed in clear, organized sections
- Explicit labeling ("Behavioral Tracking", "Location Tracking", "Biometric Data")
- Color-coded categories (blue, purple, green borders)
- High-contrast switches that turn red when enabled
- No hidden dropdowns - all options immediately visible
- Clear "Save Privacy Settings" button

### Running the Demo

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and access either variant:

- **Hard variant** (dark patterns): `http://localhost:3000`
- **Easy variant** (clear layout): `http://localhost:3000/easy`

### Building for Production

To create a production build:

```bash
npm run build
npm start
```

### Privacy Metrics

The application tracks 18 predatory privacy settings:
- `analyticsTracking`, `thirdPartySharing`, `marketingEmails`
- `behavioralTracking`, `locationTracking`, `searchHistory`, `purchaseHistory`
- `dataRetention`, `crossDeviceTracking`, `notificationTracking`
- `biometricData`, `voiceRecording`, `healthData`, `financialData`
- `cameraAccess`, `microphoneAccess`, `contactsAccess`, `photoLibraryAccess`

When users click "Save Settings", the console logs:
```
[Privacy Metrics] X/18 privacy-invasive options still enabled
```

### Important Notes

- This is for educational and research purposes only
- Use only with informed consent in controlled studies
- All data stays local - nothing is transmitted to servers
- Console logging is for research measurement only
- Both variants track identical privacy settings for valid comparison
