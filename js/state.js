export let pet = null;

export let musicEnabled = true;
export let highContrast = false;
export let reducedMotion = false;

export let deathModalShown = false;


export const petConfig = {
  name: "",
  pet: "",
  background: ""
};

export const DECAY_RATES = {
  hunger: 2,     // per minute
  happiness: 1.5,
  energy: 1.8
};

export function setDeathModalShown(value) {
  deathModalShown = value;
}

export function setPet(newPet) {
  pet = newPet;
}

export function getPet() {
  return pet;
}

export function setMusicEnabled(value) {
  musicEnabled = value;
}

export function setHighContrast(value) {
  highContrast = value;
}

export function setReducedMotion(value) {
  reducedMotion = value;
}