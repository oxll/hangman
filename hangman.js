let word = words[Math.floor(Math.random() * words.length)];

let guesses = [];

let lives = 10;

updateLivesCounter();

function updateWordP() {
  let text = "";
  let wordArray = [...word];
  for (let i = 0; i < wordArray.length; i++) {
    if (guesses.includes(wordArray[i])) {
      text += wordArray[i] + " ";
    } else {
      text += "_ ";
    }
  }
  wordP.innerHTML = text;
}

function updateLivesCounter() {
  livesCounter.innerHTML = "Lives: " + lives;
}

console.log(word);

// adds a random word
for (let i = 0; i < word.length; i++) {
  wordP.innerHTML += "_ ";
}

input.addEventListener("keypress", (event) => {
  const VALID_CHARACTERS = "abcdefghijklmnopqrstuvwxyz-";

  if (!VALID_CHARACTERS.includes(event.key)) {
    event.preventDefault();
  }

  if (event.key !== "Enter") {
    return;
  }
  guesses.push(input.value);
  console.log(guesses.join(""));
  updateWordP();
  if (
    !word.includes(input.value) &&
    !wrongGuesses.innerHTML.includes(input.value)
  ) {
    wrongGuesses.innerHTML += input.value + " ";
    if (lives > 0) {
      lives--;
    }
    if (lives === 0) {
      document.body.style.backgroundColor = "crimson";
      wordP.innerHTML = [...word].join(" ");
      playagain.style.display = "block";
    }

    updateLivesCounter();
  }

  if (!wordP.innerHTML.includes("_") && lives > 0) {
    document.body.style.backgroundColor = "seagreen";
    playagain.style.display = "block";
  }

  playagain.addEventListener("click", () => {
    location.reload();
  });

  input.value = "";
});
