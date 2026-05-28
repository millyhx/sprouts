import { pet, setPet } from "./state.js";
import { loadGame } from "./ui.js";

export function savePet() {
  localStorage.setItem("cosyPet", JSON.stringify(pet));
}

export function loadPet() {
  const data = localStorage.getItem("cosyPet");

  if (!data) return;

  setPet(JSON.parse(data));

  updateOfflineStats();

  loadGame();
}

export function updateOfflineStats() {
  const now = Date.now();

  const minutesPassed =
    (now - pet.lastUpdated) / 60000;

  pet.hunger = Math.max(
    0,
    pet.hunger - (minutesPassed * .4)
  );

  pet.lastUpdated = now;

  savePet();
}