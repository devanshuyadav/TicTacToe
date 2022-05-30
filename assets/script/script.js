const X_class = "x";
const O_class = "o";
const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
let Oturn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  // stop the confetti early
  setTimeout(function () {
    confetti.stop();
  }, 10);
  // X plays first
  Oturn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_class);
    cell.classList.remove(O_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();

  // reset everything
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currClass = Oturn ? O_class : X_class;

  // place Mark
  placeMark(cell, currClass);

  // check for win
  if (checkWin(currClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // swicth turn
    swapTurns();
    setBoardHoverClass();
  }
  // check for draw
}

function placeMark(cell, currClass) {
  cell.classList.add(currClass);
}

function swapTurns() {
  Oturn = !Oturn;
}

function setBoardHoverClass() {
  board.classList.remove(X_class);
  board.classList.remove(O_class);
  if (Oturn) {
    board.classList.add(O_class);
  } else {
    board.classList.add(X_class);
  }
}

function checkWin(currClass) {
  // if curr class is in every element of curr combination
  // then its a win
  return WIN_COMBINATIONS.some((combination) => {
    return combination.every((i) => {
      return cellElements[i].classList.contains(currClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${Oturn ? "O " : "X "} Wins!`;
  }
  winningMessageElement.classList.add("show");
  startConfetti();
  stopConfetti();
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_class) || cell.classList.contains(O_class);
  });
}

// ++++++++ //
// Confetti //
// ++++++++ //

// for starting the confetti
const startConfetti = () => {
  setTimeout(function () {
    confetti.start();
  }, 200); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti
const stopConfetti = () => {
  setTimeout(function () {
    confetti.stop();
  }, 3000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};
