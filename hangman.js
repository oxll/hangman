let word = words[Math.floor(Math.random() * words.length)];

let guesses = [];

let lives = 10;

let wrongGuessCount = 0;

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

  if (!word.includes(input.value) && !guesses.includes(input.value)) {
    wrongGuesses.innerHTML += input.value + " ";
    if (lives > 0) {
      lives--;
      wrongGuessCount++;
      gallow.src = "hangman-figure/" + wrongGuessCount + ".svg";
    }
    if (lives === 0) {
      document.body.style.backgroundColor = "crimson";
      wordP.innerHTML = [...word].join(" ");
      playagain.style.display = "block";
    }

    updateLivesCounter();
  }

  guesses.push(input.value);
  console.log(guesses.join(""));
  if (lives !== 0) {
    updateWordP();
  }

  if (!wordP.innerHTML.includes("_") && lives > 0) {
    let count = 200;
    let defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
    playagain.style.display = "block";
  }

  playagain.addEventListener("click", () => {
    location.reload();
  });

  input.value = "";
});
