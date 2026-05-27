let pet = null;

/* =========================
   DOM REFERENCES
========================= */

const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");

const startBtn = document.getElementById("start-btn");
const nameInput = document.getElementById("pet-name");

const modal = document.getElementById("settings-modal");
const music = document.getElementById("bg-music");

/* =========================
   STATE
========================= */

let petConfig = {
  name: "",
  pet: "",
  background: ""
};

const backgroundImages = {
  forest: "assets/forest.png",
  night: "assets/night.png",
  cottage: "assets/cottage.png"
};

const petSprites = {
  earth: "assets/happy-earth-sprout.png",
  moon: "assets/happy-moon-sprout.png",
  star: "assets/happy-star-sprout.png"
};

let musicEnabled = true;
let highContrast = false;
let reducedMotion = false;

/* =========================
   OPTION SELECTION
========================= */

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

handleSelection("pet-options", "pet");
handleSelection("bg-options", "background");

/* =========================
   NAME INPUT
========================= */

nameInput?.addEventListener("input", () => {
  let value = nameInput.value;

  value = value.replace(/[^a-zA-Z0-9\s'-]/g, "");

  petConfig.name = value.trim();

  validateForm();
});

/* =========================
   VALIDATION
========================= */

function validateForm() {
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

validateForm();

/* =========================
   START GAME
========================= */

startBtn?.addEventListener("click", () => {
  if (startBtn.disabled) return;

  pet = {
    name: petConfig.name,
    pet: petConfig.pet,
    background: petConfig.background,
    hunger: 70,
    happiness: 70,
    energy: 70,
    lastUpdated: Date.now(),
    introSeen: false
  };

  savePet();
  loadGame();
  startMusic();
});

/* =========================
   LOAD GAME
========================= */

function loadGame() {
  setupScreen.classList.remove("active");
  gameScreen.classList.add("active");

  document.getElementById("pet-name-display").innerText = pet.name;

  const spriteImg = document.getElementById("pet-sprite");
  if (spriteImg) spriteImg.src = petSprites[pet.pet];

  applyBackground();
  updateUI();

  // ONLY show intro once ever per pet
  if (!pet.introSeen) {
    showIntroPopup();
    pet.introSeen = true;
    savePet();
  }
}

/* =========================
   INTRO POPUP
========================= */

function showIntroPopup() {
  const popup = document.getElementById("intro-popup");
  const title = document.getElementById("intro-title");
  const text = document.getElementById("intro-text");

  const descriptions = {
    earth: "Earth Sprouts love hydration, calm spaces, and steady care.",
    moon: "Moon Sprouts are quiet companions who thrive at night and prefer gentle attention.",
    star: "Star Sprouts glow with energy and love warmth, play, and attention."
  };

  const themes = {
    forest: "a peaceful forest theme.",
    night: "a calm night theme.",
    cottage: "a cosy cottage theme."
  };

  const type = pet.pet;
  const theme = themes[pet.background];

  title.innerText = `Meet ${pet.name} 🌱`;
  text.innerText =
    `You chose a ${type} sprout. ${descriptions[type]} ` +
    `You also chose ${theme}.`;

  popup.classList.remove("hidden");
}

function closeIntro() {
  document.getElementById("intro-popup")?.classList.add("hidden");
}

/* =========================
   BACKGROUND
========================= */

function applyBackground() {
  const bg = document.getElementById("background");
  if (!bg) return;

  bg.style.backgroundImage =
    `url('${backgroundImages[pet.background]}')`;
}

/* =========================
   UI
========================= */

function updateUI() {
  document.getElementById("hunger-bar").style.width = pet.hunger + "%";
  document.getElementById("happy-bar").style.width = pet.happiness + "%";
  document.getElementById("energy-bar").style.width = pet.energy + "%";

  document.getElementById("mood-text").innerText =
    "Your sprout is watching you...";
}

/* =========================
   SAVE / LOAD
========================= */

function savePet() {
  localStorage.setItem("cosyPet", JSON.stringify(pet));
}

function loadPet() {
  const data = localStorage.getItem("cosyPet");
  if (!data) return;

  pet = JSON.parse(data);
  loadGame();
}

/* auto-load */
loadPet();

/* =========================
   MUSIC
========================= */

function startMusic() {
  if (!music) return;

  music.volume = 0.4;
  music.play().catch(() => {});
}

function toggleMusic() {
  musicEnabled = !musicEnabled;

  if (!music) return;

  musicEnabled ? music.play() : music.pause();
}

/* =========================
   SETTINGS
========================= */

function openSettings() {
  modal?.classList.remove("hidden");
}

function closeSettings() {
  modal?.classList.add("hidden");
}

function toggleContrast() {
  highContrast = !highContrast;
  document.body.classList.toggle("high-contrast", highContrast);
}

function toggleMotion() {
  reducedMotion = !reducedMotion;
  document.body.classList.toggle("reduced-motion", reducedMotion);
}

function restartGame() {
  localStorage.removeItem("cosyPet");
  location.reload();
}

/* =========================
   EVENT WIRING
========================= */

window.addEventListener("DOMContentLoaded", () => {

  // settings buttons
  document.getElementById("settings-btn")?.addEventListener("click", openSettings);
  document.getElementById("settings-btn-game")?.addEventListener("click", openSettings);

  document.getElementById("close-settings")?.addEventListener("click", closeSettings);

  document.getElementById("toggle-music")?.addEventListener("click", toggleMusic);
  document.getElementById("toggle-contrast")?.addEventListener("click", toggleContrast);
  document.getElementById("toggle-reduced-motion")?.addEventListener("click", toggleMotion);

  document.getElementById("restart-game")?.addEventListener("click", restartGame);

  document.getElementById("close-intro")?.addEventListener("click", closeIntro);
});