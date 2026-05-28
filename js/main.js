import { loadPet } from "./storage.js";
import { setupSelections } from "./ui.js";
import { setupNameInput } from "./ui.js";
import { setupStartButton } from "./ui.js";
import { validateForm } from "./ui.js";
import { setupSettingsEvents } from "./settings.js";
import { syncMusicSetting } from "./audio.js";
import { startDecayLoop } from "./gameplay.js";
import { startFeedGame } from "./minigames/memoryGame.js";
import { closeIntro } from "./ui.js";

window.addEventListener(
  "DOMContentLoaded",
  () => {

    setupSelections();

    setupNameInput();

    setupStartButton();

    setupSettingsEvents();

    validateForm();

    syncMusicSetting();

    loadPet();

    startDecayLoop();

    document
      .getElementById("feed-btn")
      ?.addEventListener(
        "click",
        startFeedGame
      );

  }
);