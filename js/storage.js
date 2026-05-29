import { pet, setPet, DECAY_RATES } from "./state.js";
import { loadGame } from "./ui.js";

export function savePet() {
  localStorage.setItem("cosyPet", JSON.stringify(pet));
}

export function loadPet() {
  const data = localStorage.getItem("cosyPet");
  const today = new Date().toDateString();
  if (!data) return;

  const saved = JSON.parse(data);

  // Ensure missing fields don’t break the game
  setPet({
    ...saved,
    lastUpdated: saved.lastUpdated ?? Date.now(),
    lastVisit: saved.lastVisit ?? new Date().toDateString(),
    streak: saved.streak ?? 1,
    dead: saved.dead ?? false
  });

  if (pet.lastVisit !== today) {
    pet.streak += 1;
    pet.lastVisit = today;
  }

  updateOfflineStats();
  loadGame();
}


export function updateOfflineStats() {
  const now = Date.now();

  const minutesPassed =
    (now - pet.lastUpdated) / 60000;

  pet.hunger = Math.max(0, pet.hunger - minutesPassed * DECAY_RATES.hunger);
  pet.happiness = Math.max(0, pet.happiness - minutesPassed * DECAY_RATES.happiness);
  pet.energy = Math.max(0, pet.energy - minutesPassed * DECAY_RATES.energy);

  pet.lastUpdated = now;

  savePet();
}