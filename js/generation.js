export function showGenerationScreen(callback) {
  const setupScreen =
    document.getElementById("setup-screen");

  setupScreen.classList.remove("active");

  const genScreen =
    document.getElementById("gen-screen");

  genScreen.classList.add("active");

  const fill =
    document.getElementById("loading-fill");

  const text =
    document.getElementById("gen-text");

  let progress = 0;

  const messages = [
    "Germinating...",
    "Waking up seeds...",
    "Growing roots...",
    "Almost ready..."
  ];

  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 8;

    if (progress > 100)
      progress = 100;

    fill.style.width = progress + "%";

    if (
      progress > (msgIndex + 1) * 25 &&
      msgIndex < messages.length - 1
    ) {
      msgIndex++;
      text.innerText = messages[msgIndex];
    }

    if (progress === 100) {
      clearInterval(interval);

      setTimeout(() => {
        genScreen.classList.remove("active");
        callback();
      }, 600);
    }
  }, 700);
}