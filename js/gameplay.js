import { pet } from "./state.js";
import { updateUI } from "./ui.js";
import { savePet } from "./storage.js";

export function feedPet(amount) {
  pet.hunger = Math.min(
    100,
    pet.hunger + amount
  );

  updateUI();
  savePet();
}

export function startDecayLoop() {
  setInterval(() => {
    if (!pet) return;

    pet.hunger = Math.max(
      0,
      pet.hunger - 1
    );

    pet.lastUpdated = Date.now();

    updateUI();
    savePet();

  }, 15000);
}