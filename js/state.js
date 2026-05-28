export let pet = null;

export let musicEnabled = true;
export let highContrast = false;
export let reducedMotion = false;

export const petConfig = {
  name: "",
  pet: "",
  background: ""
};

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