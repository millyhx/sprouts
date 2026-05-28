import {
  musicEnabled,
  setMusicEnabled
} from "./state.js";

const music = document.getElementById("bg-music");

export async function startMusic() {
  if (!music) return;

  music.volume = 0.4;
  music.currentTime = 0;
  music.loop = true;

  try {
    await music.play();
  } catch (e) {
    console.log("Autoplay blocked");
  }
}

export function toggleMusic() {
  setMusicEnabled(!musicEnabled);

  if (musicEnabled) {
    startMusic();
  } else {
    music.pause();
  }

  localStorage.setItem(
    "musicEnabled",
    musicEnabled
  );
}

export function syncMusicSetting() {
  const savedMusic =
    localStorage.getItem("musicEnabled");

  if (savedMusic !== null) {
    setMusicEnabled(savedMusic === "true");
  }

  if (musicEnabled) {
    startMusic();
  }
}