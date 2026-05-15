let chosenNumbersArray = [];

let maxNumber = 10;

function displayTextOnScreen(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API is not supported in this browser.");
  }
}

function displayInicialMessage() {
  displayTextOnScreen(`h1`, `Secret Number Game`);

  displayTextOnScreen(`p`, `Guess a number between 1 and ${maxNumber}:`);
}

displayInicialMessage();

function secretNumberGenerator() {
  let chosenNumber = parseInt(Math.random() * maxNumber + 1);
  let choosenNumberArrayLength = chosenNumbersArray.length;

  if (choosenNumberArrayLength == maxNumber) {
    chosenNumbersArray = [];
  }

  if (chosenNumbersArray.includes(chosenNumber)) {
    return secretNumberGenerator();
  } else {
    chosenNumbersArray.push(chosenNumber);
    console.log(chosenNumbersArray);
    return chosenNumber;
  }
}

function clearField() {
  guess = document.querySelector(`input`);
  guess.value = ``;
}

function resetGame() {
  secretNumber = secretNumberGenerator();
  clearField();
  attempts = 1;
  displayInicialMessage();
  document.getElementById(`reset`).setAttribute(`disabled`, true);
}

let secretNumber = secretNumberGenerator();

console.log(`The secret number is: ${secretNumber}`);

let attempts = 1;

function checkGuess() {
  let guess = document.querySelector(`input`).value;

  if (guess == secretNumber) {
    const numbersAsText = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];

    let attemptsText = numbersAsText[attempts] || attempts;

    let wordAttempt = attempts > 1 ? `attempts` : `attempt`;

    displayTextOnScreen(`h1`, `That's it!`);
    displayTextOnScreen(
      `p`,
      `You've discovered the secret number in ${attemptsText} ${wordAttempt}!!`,
    );
    document.getElementById(`reset`).removeAttribute(`disabled`);
  } else {
    if (guess > secretNumber) {
      displayTextOnScreen(`h1`, `Wrong number, please try again!`);
      displayTextOnScreen(
        `p`,
        `The secret number is a number LESS than ${guess}.`,
      );
    } else {
      displayTextOnScreen(`h1`, `Wrong number, please try again!`);
      displayTextOnScreen(
        `p`,
        `The secret number is a number GREATER than ${guess}.`,
      );
    }
    attempts++;
    clearField();
  }
}
