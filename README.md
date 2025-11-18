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