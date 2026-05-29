import { loadPet } from "./storage.js";
import { setupSettingsEvents } from "./settings.js";
import { syncMusicSetting, startMusic } from "./audio.js";
import { musicEnabled } from "./state.js";
import { startDecayLoop } from "./gameplay.js";
import { startFeedGame } from "./minigames/memoryGame.js";
import { validateForm, closeIntro, setupSproutInteraction, setupNameInput, setupSelections, setupStartButton } from "./ui.js";

window.addEventListener(
  "DOMContentLoaded",
  () => {

    setupSelections();

    setupNameInput();

    setupStartButton();

    setupSettingsEvents();

    validateForm();

    syncMusicSetting();

    document.getElementById("close-intro")?.addEventListener("click", closeIntro);

    loadPet();

    setupSproutInteraction();

    startDecayLoop();

    document
      .getElementById("feed-btn")
      ?.addEventListener(
        "click",
        startFeedGame
      );

    document.body.addEventListener("click", () => {
      syncMusicSetting();
    }, { once: true });

  }
);