import { pet, DECAY_RATES } from "./state.js";
import { updateUI } from "./ui.js";
import { savePet } from "./storage.js";

export function feedPet(amount) {
  pet.hunger = Math.min(100, pet.hunger + amount);

  updateUI();
  savePet();
}

export function playPet(amount) {
  pet.happiness = Math.min(100, pet.happiness + amount);
  updateUI();
  savePet();
}

export function restPet(amount) {
  pet.energy = Math.min(100, pet.energy + amount);
  updateUI();
  savePet();
}

export function startDecayLoop() {
  setInterval(() => {
    if (!pet) return;

    applyDecay();
    updateUI();
    savePet();

  }, 10000);
}

function applyDecay() {
  const now = Date.now();
  const minutesPassed = (now - pet.lastUpdated) / 60000;

  pet.hunger = Math.max(0, pet.hunger - minutesPassed * DECAY_RATES.hunger);
  pet.happiness = Math.max(0, pet.happiness - minutesPassed * DECAY_RATES.happiness);
  pet.energy = Math.max(0, pet.energy - minutesPassed * DECAY_RATES.energy);

  pet.lastUpdated = now;

  if (pet.hunger <= 0 || pet.happiness <= 0 || pet.energy <= 0) {
    pet.dead = true;

    if (pet.hunger <= 0) pet.deathCause = "Your sprout starved from lack of food.";
    else if (pet.happiness <= 0) pet.deathCause = "Your sprout became too sad and lonely.";
    else if (pet.energy <= 0) pet.deathCause = "Your sprout became exhausted and couldn’t recover.";

    pet.deathStreak = pet.streak;
  }


}