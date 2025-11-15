// src/main.ts

import "./styles.css";

// This code implements a local-only GUI confusion style attack demo
// for a user study. It must only be used on localhost with dummy data.

const helpButton = document.getElementById("help-button") as HTMLButtonElement;
const helpPopup = document.getElementById("help-popup") as HTMLDivElement;
const helpCancel = document.getElementById("help-cancel") as HTMLButtonElement;
const helpContinue = document.getElementById(
  "help-continue"
) as HTMLButtonElement;

const pageRoot = document.getElementById("page-root") as HTMLDivElement;
const fakeRoot = document.getElementById("fake-google-root") as HTMLDivElement;
const fakeLoginForm = document.getElementById(
  "fake-login-form"
) as HTMLFormElement;
const fakeEmail = document.getElementById("fake-email") as HTMLInputElement;
const fakePassword = document.getElementById(
  "fake-password"
) as HTMLInputElement;

function showHelpPopup() {
  helpPopup.classList.remove("hidden");
}

function hideHelpPopup() {
  helpPopup.classList.add("hidden");
}

/**
 * Enter fullscreen and swap to fake Google style login.
 * The browser may still show its small fullscreen origin indicator,
 * which is part of the study.
 */
async function startGuiConfusion() {
  hideHelpPopup();
  pageRoot.classList.add("hidden");
  fakeRoot.classList.remove("hidden");

  const targetElement: HTMLElement = fakeRoot;

  if (targetElement.requestFullscreen) {
    try {
      await targetElement.requestFullscreen();
    } catch (err) {
      console.error("Fullscreen request failed:", err);
    }
  } else {
    // Fallback if fullscreen is not available
    console.warn("Fullscreen API not supported in this browser.");
  }
}

/**
 * Exit fullscreen (if active) and return to the normal page.
 */
async function exitGuiConfusion() {
  fakeRoot.classList.add("hidden");
  pageRoot.classList.remove("hidden");

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
 * No data is stored or sent. All values are discarded immediately.
 */
function handleFakeLoginSubmit(event: SubmitEvent) {
  event.preventDefault();

  // Minimal logging for the study - without PII
  console.log("Fake login submitted (dummy data discarded)");

  // Immediately clear any entered values
  fakeEmail.value = "";
  fakePassword.value = "";

  // Simulate a benign-looking sign-in issue
  alert("Couldn't sign in. Please try again later.");

  // Optionally exit the attack after submission
  void exitGuiConfusion();
}

/**
 * Wire up event listeners once DOM has loaded.
 */
function setupHandlers() {
  if (helpButton) {
    helpButton.addEventListener("click", showHelpPopup);
  }

  if (helpCancel) {
    helpCancel.addEventListener("click", hideHelpPopup);
  }

  if (helpContinue) {
    helpContinue.addEventListener("click", () => {
      void startGuiConfusion();
    });
  }

  if (fakeLoginForm) {
    fakeLoginForm.addEventListener("submit", handleFakeLoginSubmit);
  }

  // If user presses Escape, exit fullscreen and restore normal page
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      void exitGuiConfusion();
    }
  });
}

document.addEventListener("DOMContentLoaded", setupHandlers);
