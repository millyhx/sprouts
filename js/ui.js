import { pet, petConfig, setPet } from "./state.js";
import { petSprites } from "./data/pets.js";
import { backgroundImages } from "./data/backgrounds.js";
import { savePet } from "./storage.js";
import { startMusic } from "./audio.js";
import { showGenerationScreen } from "./generation.js";
import { syncMusicSetting } from "./audio.js";

/* =========================
   DOM
========================= */

const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const nameInput = document.getElementById("pet-name");

/* =========================
   SELECTION SYSTEM
========================= */

export function setupSelections() {
  handleSelection("pet-options", "pet");
  handleSelection("bg-options", "background");
}

function handleSelection(containerId, key) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".option-btn")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");

      petConfig[key] = btn.dataset[key];

      validateForm();
    });
  });
}

/* =========================
   NAME INPUT
========================= */

export function setupNameInput() {
  nameInput?.addEventListener("input", () => {
    let value = nameInput.value;

    value = value.replace(/[^a-zA-Z0-9\s'-]/g, "");

    petConfig.name = value.trim();

    validateForm();
  });
}

/* =========================
   VALIDATION
========================= */

export function validateForm() {
  const name = (petConfig.name || "").trim();

  const nameValid = name.length >= 2 && name.length <= 12;
  const petValid = !!petConfig.pet;
  const bgValid = !!petConfig.background;

  const isValid = nameValid && petValid && bgValid;

  startBtn.disabled = !isValid;

  if (!nameValid) {
    startBtn.textContent = "Enter a name";
  } else if (!petValid) {
    startBtn.textContent = "Choose a sprout";
  } else if (!bgValid) {
    startBtn.textContent = "Choose a background";
  } else {
    startBtn.textContent = "Start";
  }
}

/* =========================
   START GAME
========================= */

export function setupStartButton() {
  startBtn?.addEventListener("click", () => {
    if (startBtn.disabled) return;

    setPet({
      name: petConfig.name,
      pet: petConfig.pet,
      background: petConfig.background,
      hunger: 70,
      happiness: 70,
      energy: 70,
      lastUpdated: Date.now(),
      introSeen: false,
      streak: 1,
      lastVisit: new Date().toDateString()
    });

    savePet();

    syncMusicSetting();

    showGenerationScreen(() => {
      loadGame();
    });
  });
}

/* =========================
   LOAD GAME SCREEN
========================= */

export function loadGame() {
  setupScreen.classList.remove("active");
  gameScreen.classList.add("active");

  document.getElementById("pet-name-display").innerText = pet.name;

  applyBackground();
  updateUI();

  if (!pet.introSeen) {
    showIntroPopup();
    pet.introSeen = true;
    savePet();
  }


}

export function setupSproutInteraction() {
    const sprout = document.getElementById("pet-sprite");

    if (!sprout) return;

    sprout.addEventListener("click", () => {
        triggerSproutReaction(sprout);
    });
}

/* =========================
   BACKGROUND
========================= */

export function applyBackground() {
  const bg = document.getElementById("background");
  if (!bg) return;

  bg.style.backgroundImage =
    `url('${backgroundImages[pet.background]}')`;
}

/* =========================
   UI UPDATE
========================= */

export function updateUI() {
  document.getElementById("hunger-bar").style.width = pet.hunger + "%";
  document.getElementById("happy-bar").style.width = pet.happiness + "%";
  document.getElementById("energy-bar").style.width = pet.energy + "%";

  updateSprite();
}

/* =========================
   SPRITE LOGIC
========================= */

export function updateSprite() {
  const spriteImg = document.getElementById("pet-sprite");
  if (!spriteImg || !pet) return;

  let state = "happy";

  if (pet.hunger < 30 || pet.happiness < 30) {
    state = "sad";
  }

  if (pet.energy < 30) {
    state = "tired";
  }

  spriteImg.src = petSprites[pet.pet][state];
}

/* =========================
   INTRO POPUP
========================= */

export function showIntroPopup() {
  const popup = document.getElementById("intro-popup");
  const title = document.getElementById("intro-title");
  const text = document.getElementById("intro-text");

  const descriptions = {
    earth:
      "Earth Sprouts love hydration, calm spaces, and steady care.",

    moon:
      "Moon Sprouts are quiet companions who thrive at night and prefer gentle attention.",

    star:
      "Star Sprouts glow with energy and love warmth, play, and attention."
  };

  title.innerText = `Meet ${pet.name}`;
  text.innerText = descriptions[pet.pet];

  popup.classList.remove("hidden");
}

/* =========================
   CLOSE INTRO
========================= */

export function closeIntro() {
  document.getElementById("intro-popup")?.classList.add("hidden");
}


/* =========================
   SPROUT INTERACTIONS
========================= */
function triggerSproutReaction(sprout) {
  const reactions = [
    "wiggle",
    "bounce",
    "spin",
    "shake",
    "squish"
  ];

  const choice =
    reactions[Math.floor(Math.random() * reactions.length)];

  sprout.classList.remove(
    "wiggle",
    "bounce",
    "spin",
    "shake",
    "squish"
  );

  // force reflow so animation can replay
  void sprout.offsetWidth;

  sprout.classList.add(choice);

  setTimeout(() => {
    sprout.classList.remove(choice);
  }, 600);
}