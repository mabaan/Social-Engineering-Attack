// src/main.ts

import "./styles.css";

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
 * Enter fullscreen and swap to fake Google style login.
 * The browser may still show its small fullscreen origin indicator,
 * which is part of the study.
 */
async function startGuiConfusion() {
  if (attackActive) {
    return;
  }
  attackActive = true;
  hidePaywallOverlay();
  pageRoot.classList.add("hidden");
  fakeRoot.classList.remove("hidden");
  fakeRoot.removeAttribute("hidden");

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
 * No data is stored or sent. All values are discarded immediately.
 */
function handleFakeLoginSubmit(event: SubmitEvent) {
  event.preventDefault();

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
