import { feedPet } from "../gameplay.js";
import { pet } from "../state.js";
import { updateUI } from "../ui.js";
import { savePet } from "../storage.js";
import { getPet } from "../state.js";

const fruitEmojis = [
  "🍎","🍓","🍇",
  "🍐","🍊","🍒"
];

let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

export function startFeedGame() {

  const modal =
    document.getElementById(
      "minigame-modal"
    );

  const title =
    document.getElementById(
      "game-title"
    );

  const content =
    document.getElementById(
      "minigame-content"
    );

  title.innerText =
    "Feed your Sprout 🌱";

  content.innerHTML =
    `<p>Match the fruit pairs!</p>
     <div id="memory-grid"></div>`;

  modal.classList.remove(
    "hidden"
  );

  buildMemoryBoard();
}

function buildMemoryBoard() {

  const grid =
    document.getElementById(
      "memory-grid"
    );

  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;

  grid.innerHTML = "";

  const cards =
    [...fruitEmojis, ...fruitEmojis]
      .sort(() => Math.random() - .5);

  cards.forEach(fruit => {

    const card =
      document.createElement("button");

    card.className =
      "memory-card";

    card.dataset.fruit = fruit;

    card.innerText = "?";

    card.addEventListener(
      "click",
      () => flipCard(card)
    );

    grid.appendChild(card);

  });
}

function flipCard(card) {

  if (lockBoard) return;

  if (flippedCards.includes(card))
    return;

  card.innerText =
    card.dataset.fruit;

  card.classList.add("flipped");

  flippedCards.push(card);

  if (flippedCards.length !== 2)
    return;

  checkMatch();
}

function checkMatch(){

    const [first,second] =
    flippedCards;

    if(
      first.dataset.fruit ===
      second.dataset.fruit
    ){

        matchedPairs++;

        flippedCards=[];

        if(
          matchedPairs===6
        ){

            setTimeout(
              completeFeedGame,
              600
            );

        }

        return;
    }

    lockBoard=true;

    setTimeout(()=>{

        first.innerText="?";
        second.innerText="?";

        first.classList.remove(
          "flipped"
        );

        second.classList.remove(
          "flipped"
        );

        flippedCards=[];

        lockBoard=false;

    },800);

}

function completeFeedGame() {
  const pet = getPet();

  pet.hunger = Math.min(100, pet.hunger + 25);

  updateUI();
  savePet();

  document.getElementById("minigame-modal").classList.add("hidden");
}