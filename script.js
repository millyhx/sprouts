let pet = null;

const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");

const startBtn = document.getElementById("start-btn");
const nameInput = document.getElementById("pet-name");

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

/* =========================
   OPTION SELECTION SYSTEM
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
   NAME INPUT VALIDATION
========================= */

nameInput.addEventListener("input", () => {
  let value = nameInput.value.trim();
  value = value.replace(/[^a-zA-Z0-9\s'-]/g, "");

  petConfig.name = value;

  validateForm();
});

/* =========================
   FORM VALIDATION
========================= */

function validateForm() {
  const nameValid =
    petConfig.name.length >= 2 &&
    petConfig.name.length <= 12;

  const petValid = petConfig.pet !== "";
  const bgValid = petConfig.background !== "";

  startBtn.disabled = !(nameValid && petValid && bgValid);
}

/* =========================
   START GAME
========================= */

startBtn.addEventListener("click", () => {
  if (startBtn.disabled) return;

  pet = {
    name: petConfig.name,
    pet: petConfig.pet,
    background: petConfig.background,
    hunger: 70,
    happiness: 70,
    energy: 70,
    lastUpdated: Date.now()
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
  setupScreen.classList.add("hidden");

  gameScreen.classList.add("active");

  document.getElementById("pet-name-display").innerText = pet.name;
  document.getElementById("pet-sprite-img").src = petSprites[pet.pet];

  applyBackground();
  updateUI();
  showIntroPopup();
}

/* =========================
   INTRO POPUP
========================= */

function showIntroPopup() {
  const title = document.getElementById("intro-title");
  const text = document.getElementById("intro-text");
  const popup = document.getElementById("intro-popup");

  const descriptions = {
    earth: "Earth Sprouts love hydration, calm spaces, and steady care.",
    moon: "Moon Sprouts are quiet companions who thrive at night and prefer gentle attention.",
    star: "Star Sprouts glow with energy and love warmth, play, and attention."
  };

  const type = pet?.pet || "earth";

  title.innerText = `Meet ${pet.name} 🌱`;
  text.innerText = `You chose a ${type} sprout. ${descriptions[type]}`;

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

  bg.style.backgroundImage =
    `url('${backgroundImages[pet.background]}')`;
}

/* =========================
   UI UPDATE
========================= */

function updateUI() {
  document.getElementById("hunger-bar").style.width = pet.hunger + "%";
  document.getElementById("happy-bar").style.width = pet.happiness + "%";
  document.getElementById("energy-bar").style.width = pet.energy + "%";

  document.getElementById("mood-text").innerText =
    "Your pet is watching you...";
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

const music = document.getElementById("bg-music");
let musicEnabled = true;

function startMusic() {
  if (!music) return;
  music.volume = 0.4;

  music.play().catch(() => {});
}

function toggleMusic() {
  musicEnabled = !musicEnabled;

  if (musicEnabled) {
    music.play();
  } else {
    music.pause();
  }
}

/* =========================
   SETTINGS
========================= */

const modal = document.getElementById("settings-modal");

function openSettings() {
  modal?.classList.remove("hidden");
}

function closeSettings() {
  modal?.classList.add("hidden");
}

let highContrast = false;
let reducedMotion = false;

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
   DOM WIRING (SAFE)
========================= */

window.addEventListener("DOMContentLoaded", () => {

  document.getElementById("settings-btn-setup")?.addEventListener("click", openSettings);
  document.getElementById("settings-btn-game")?.addEventListener("click", openSettings);

  document.getElementById("close-settings")?.addEventListener("click", closeSettings);

  document.getElementById("toggle-music")?.addEventListener("click", toggleMusic);
  document.getElementById("toggle-contrast")?.addEventListener("click", toggleContrast);
  document.getElementById("toggle-reduced-motion")?.addEventListener("click", toggleMotion);

  document.getElementById("restart-game")?.addEventListener("click", restartGame);

  document.getElementById("close-intro")?.addEventListener("click", closeIntro);
});