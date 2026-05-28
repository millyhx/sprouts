import {
  highContrast,
  reducedMotion,
  setHighContrast,
  setReducedMotion,
  setMusicEnabled,
  musicEnabled,
  setPet
} from "./state.js";

import { startMusic } from "./audio.js";

const modal =
  document.getElementById("settings-modal");

const music =
  document.getElementById("bg-music");

export function openSettings() {
  modal?.classList.remove("hidden");
  syncSettingsUI();
}

export function closeSettings() {
  modal?.classList.add("hidden");
}

export function toggleContrast() {
  setHighContrast(!highContrast);

  document.body.classList.toggle(
    "high-contrast",
    highContrast
  );
}

export function toggleMotion() {
  setReducedMotion(!reducedMotion);

  document.body.classList.toggle(
    "reduced-motion",
    reducedMotion
  );
}

export function restartGame() {
  localStorage.removeItem("cosyPet");
  localStorage.removeItem("musicEnabled");

  setPet(null);

  location.reload();
}

export function syncSettingsUI() {
  const musicToggle =
    document.getElementById(
      "toggle-music-switch"
    );

  const contrastToggle =
    document.getElementById(
      "toggle-contrast-switch"
    );

  const motionToggle =
    document.getElementById(
      "toggle-motion-switch"
    );

  if (musicToggle)
    musicToggle.checked = musicEnabled;

  if (contrastToggle)
    contrastToggle.checked = highContrast;

  if (motionToggle)
    motionToggle.checked = reducedMotion;
}

export function setupSettingsEvents() {
  document
    .getElementById("settings-btn")
    ?.addEventListener("click", openSettings);

  document
    .getElementById("settings-btn-game")
    ?.addEventListener("click", openSettings);

  document
    .getElementById("close-settings")
    ?.addEventListener("click", closeSettings);

  document
    .getElementById("restart-game")
    ?.addEventListener("click", restartGame);

  document
    .getElementById("toggle-contrast-switch")
    ?.addEventListener("change", toggleContrast);

  document
    .getElementById("toggle-motion-switch")
    ?.addEventListener("change", toggleMotion);

  document
    .getElementById("toggle-music-switch")
    ?.addEventListener("change", (e) => {
      const enabled = e.target.checked;

      setMusicEnabled(enabled);

      if (enabled) {
        startMusic();
      } else {
        music.pause();
      }

      localStorage.setItem(
        "musicEnabled",
        enabled
      );
    });
}