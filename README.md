# Social Engineering Attack

This repository contains educational demonstrations of social engineering attacks for security research and user awareness studies.

## Part 1: GUI Confusion Attack

This demonstration simulates a phishing attack that uses GUI confusion techniques to trick users into entering their credentials on a fake login page.

### How It Works

1. A legitimate-looking BBC News page loads in fullscreen
2. After 10 seconds, a paywall overlay appears asking users to log in with Google
3. When users click "Login to view for free", a fake Google sign-in page appears in fullscreen mode
4. If users enter their credentials and submit, the data is logged to a text file with a timestamp
5. An error message appears and the attack exits

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

Open your browser and go to `http://localhost:5173/`

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` folder.

### Important Notes

- This is for educational purposes only
- Use only in controlled environments with informed consent
- All data is stored locally and never transmitted
- Credentials are saved to `credentials.txt` in your downloads folder