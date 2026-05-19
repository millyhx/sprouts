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

/* =========================
   OPTION SELECTION SYSTEM
========================= */

function handleSelection(containerId, key) {
  const container = document.getElementById(containerId);

  container.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      // clear previous selection
      container.querySelectorAll(".option-btn")
        .forEach(b => b.classList.remove("selected"));

      // set selected UI state
      btn.classList.add("selected");

      // IMPORTANT FIX:
      petConfig[key] = btn.dataset[key];

      validateForm();
    });
  });
}

handleSelection("pet-options", "pet");
handleSelection("bg-options", "background"); // ✅ FIXED

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
});

/* =========================
   LOAD GAME
========================= */

function loadGame() {
  setupScreen.classList.remove("active");
  setupScreen.classList.add("hidden");

  gameScreen.classList.add("active");

  document.getElementById("pet-name-display").innerText = pet.name;
  document.getElementById("pet-sprite").innerText = pet.pet;

  applyBackground();
  updateUI();
}

/* =========================
   BACKGROUND FIX
========================= */

function applyBackground() {
  const bg = document.getElementById("background");

  const backgrounds = {
    forest: "forest.jpg",
    night: "night.jpg",
    cottage: "cottage.jpg"
  };

  bg.style.backgroundImage = `url('${backgrounds[pet.background]}')`;
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