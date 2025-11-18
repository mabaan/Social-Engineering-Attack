# Social-Engineering-Attack

## Hidden Privacy Settings Study (Section 1.3)

This repository contains research simulations for studying how UI dark patterns influence privacy-related decisions.

### Two Versions Available

#### 1. Static HTML Version (Simple)
**Location:** `hidden-privacy-settings.html`

**Quick Start:**
1. Open `hidden-privacy-settings.html` in a web browser
2. Configure the privacy settings as you normally would
3. Click "Save Preferences" when done
4. Click "Show Study Data" to see how dark patterns influenced your choices

#### 2. Next.js React Version (Advanced)
**Location:** `app/` and `components/` directories

**Quick Start:**
1. Install dependencies: `npm install --legacy-peer-deps`
2. Run development server: `npm run dev` (or `./node_modules/.bin/next.cmd dev` on Windows)
3. Open http://localhost:3000 in your browser
4. Complete the profile setup task while privacy settings are in the sidebar

**Note:** This version demonstrates a split-attention dark pattern where users focus on the main task while privacy-invasive settings are configured in a less prominent sidebar.

### What's Included

- **hidden-privacy-settings.html** - Interactive privacy settings page with deliberate dark patterns
- **privacy-settings-styles.css** - Styling that implements manipulative UI techniques
- **privacy-settings-script.js** - Tracks interactions and analyzes privacy choices (simulated data only)
- **STUDY_GUIDE.md** - Complete documentation on conducting the study ethically

### Dark Patterns Demonstrated

1. **Visual Hierarchy Manipulation** - Important privacy controls buried, tracking options prominent
2. **Deep Nesting** - Opt-out controls hidden 3 levels deep in collapsible menus
3. **Misleading Language** - Double negatives, confusing terms, benefit framing
4. **Pre-checked Boxes** - Privacy-invasive defaults enabled out of the box
5. **Discouragement** - Warning messages that make privacy protection seem risky
6. **Fine Print** - Critical information in tiny, low-contrast text

### Privacy & Safety

✅ **No actual data is collected or stored**  
✅ **All tracking is simulated and stays in the browser**  
✅ **Designed for educational purposes only**  
✅ **Includes comprehensive ethical guidelines**

### For Researchers

Before conducting this study:
1. ✅ Obtain ethics approval from your IRB
2. ✅ Prepare informed consent documentation
3. ✅ Plan your debrief session to educate participants
4. ✅ Read the full STUDY_GUIDE.md for methodology

### Educational Use

This tool helps students and researchers:
- Understand how UI design influences behavior
- Identify dark patterns in real applications
- Learn about privacy-respecting interface design
- Discuss ethical considerations in UX design

### Metrics Tracked

The simulation tracks (locally only):
- Session duration and time per section
- Which privacy controls were found/changed
- Nesting depth explored
- Privacy score (0-100) based on final configuration
- Dark pattern effectiveness analysis

### Results Export

Click "Export Results" to download a JSON file containing:
- All interaction events with timestamps
- Privacy score and analysis
- Section exploration patterns
- Checkbox state changes

### Project Structure

```
Social-Engineering-Attack/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Main page with setup task
│   ├── layout.tsx               # App layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── setup-task.tsx           # Primary task component
│   ├── privacy-settings.tsx     # Privacy settings sidebar
│   └── ui/                      # UI component library
├── lib/
│   └── utils.ts                 # Utility functions
├── hidden-privacy-settings.html # Standalone HTML version
├── privacy-settings-styles.css  # Styles for HTML version
├── privacy-settings-script.js   # Scripts for HTML version
└── STUDY_GUIDE.md              # Research methodology guide
```

### License

For educational and research purposes only. See LICENSE for details.

**Warning**: Do NOT use these techniques to actually manipulate users. This is for awareness and education only.