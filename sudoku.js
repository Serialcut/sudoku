// Initialiser une grille vide de Sudoku
let grid = Array(9)
  .fill()
  .map(() => Array(9).fill(0));
let listeChiffres = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Function to check if a number is repeated in a row, column, or 3x3 grid
function verif_chiffre_deja_present(matriceJeu) {
  let invalidPositions = [];

  // Check each row
  for (let i = 0; i < 9; i++) {
    for (let num of listeChiffres) {
      if (matriceJeu[i].filter((x) => x == num).length > 1) {
        invalidPositions.push([i, matriceJeu[i].indexOf(num)]);
      }
    }
  }

  // Check each column
  for (let i = 0; i < 9; i++) {
    let col = matriceJeu.map((x) => x[i]);
    for (let num of listeChiffres) {
      if (col.filter((x) => x == num).length > 1) {
        invalidPositions.push([col.indexOf(num), i]);
      }
    }
  }

  // Check each 3x3 grid
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      let grid = [];
      for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
          grid.push(matriceJeu[i][j]);
        }
      }
      for (let num of listeChiffres) {
        if (grid.filter((x) => x == num).length > 1) {
          invalidPositions.push([
            row + (grid.indexOf(num) % 3),
            col + Math.floor(grid.indexOf(num) / 3),
          ]);
        }
      }
    }
  }
  return invalidPositions;
}

// Fonction pour générer une grille de Sudoku vide
function generateGrid() {
  let sudokuGrid = document.getElementById("sudoku-grid");
  for (let i = 0; i < 9; i++) {
    let subGrid = document.createElement("div");
    subGrid.className = "cell";
    for (let j = 0; j < 9; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.maxLength = "1";
      subGrid.appendChild(input);
    }
    sudokuGrid.appendChild(subGrid);
  }
}
function resetGrid() {
  // Cette fonction est vide pour l'instant, mais c'est ici que vous mettriez le code pour réinitialiser votre grille de Sudoku
}

function sudokuSolverMenuClick() {
  // Cette fonction est vide pour l'instant, mais c'est ici que vous mettriez le code pour ouvrir le résolveur de Sudoku
}

// Générer un nombre aléatoire entre min (inclus) et max (inclus)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Générer une grille de Sudoku complète
function generateFullGrid() {
  let grid = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let randomIndex = getRandomInt(0, numbers.length - 1);
      grid[i][j] = numbers[randomIndex];
      numbers.splice(randomIndex, 1);
    }
  }
  return grid;
}

// Enlever certains chiffres de la grille pour créer le puzzle
function generatePuzzle(grid) {
  let puzzle = JSON.parse(JSON.stringify(grid)); // Copier la grille
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Math.random() < 0.5) {
        // Enlever environ la moitié des chiffres
        puzzle[i][j] = 0;
      }
    }
  }
  return puzzle;
}

// Générer une grille de Sudoku
function generateSudoku(difficulty) {
  let fullGrid = generateFullGrid();
  let puzzle = generatePuzzle(fullGrid, difficulty); // Passer la difficulté à generatePuzzle
  return puzzle;
}

// Fonction pour générer une grille de Sudoku
function generateGrid() {
  let sudokuGrid = document.getElementById("sudoku-grid");
  // Vider la grille
  while (sudokuGrid.firstChild) {
    sudokuGrid.removeChild(sudokuGrid.firstChild);
  }
  let difficulty = document.getElementById("difficulty").value; // Obtenir la difficulté choisie par l'utilisateur
  let puzzle = generateSudoku(difficulty); // Générer le puzzle
  for (let i = 0; i < 9; i++) {
    let subGrid = document.createElement("div");
    subGrid.className = "cell";
    for (let j = 0; j < 9; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.maxLength = "1";
      input.value = puzzle[i][j] ? puzzle[i][j] : ""; // Remplir la case avec la valeur du puzzle
      subGrid.appendChild(input);
    }
    sudokuGrid.appendChild(subGrid);
  }
}

// Générer la grille lorsque la page est chargée
window.onload = generateGrid;

// Fonction pour vérifier si la grille de Sudoku est valide
function checkGame(sudokuGrid) {
  // Vérifier les lignes, les colonnes et les sous-grilles 3x3
  for (let i = 0; i < 9; i++) {
    let row = new Set();
    let column = new Set();
    let grid = new Set();
    for (let j = 0; j < 9; j++) {
      // Vérifier la ligne
      if (sudokuGrid[i][j] === 0 || row.has(sudokuGrid[i][j])) {
        return false;
      }
      row.add(sudokuGrid[i][j]);

      // Vérifier la colonne
      if (sudokuGrid[j][i] === 0 || column.has(sudokuGrid[j][i])) {
        return false;
      }
      column.add(sudokuGrid[j][i]);

      // Vérifier la sous-grille 3x3
      let gridRow = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      let gridCol = (i % 3) * 3 + (j % 3);
      if (
        sudokuGrid[gridRow][gridCol] === 0 ||
        grid.has(sudokuGrid[gridRow][gridCol])
      ) {
        return false;
      }
      grid.add(sudokuGrid[gridRow][gridCol]);
    }
  }

  // Si aucune entrée invalide n'a été trouvée, le Sudoku est valide
  return true;
}

// Fonction pour obtenir les valeurs de la grille à partir des champs de saisie
function getGridValues() {
  let sudokuGrid = document.getElementById("sudoku-grid");
  let inputs = sudokuGrid.getElementsByTagName("input");
  let gridValues = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  for (let i = 0; i < inputs.length; i++) {
    let row = Math.floor(i / 9);
    let col = i % 9;
    gridValues[row][col] = Number(inputs[i].value);
  }
  return gridValues;
}

// Fonction pour vérifier la grille lorsque le bouton est cliqué
function checkGrid() {
  let gridValues = getGridValues();
  let invalidPositions = verif_chiffre_deja_present(gridValues);
  let inputs = document
    .getElementById("sudoku-grid")
    .getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    let row = Math.floor(i / 9);
    let col = i % 9;
    if (invalidPositions.some((pos) => pos[0] == row && pos[1] == col)) {
      inputs[i].classList.add("invalid");
    } else {
      inputs[i].classList.remove("invalid");
    }
  }
}
let startTime = Date.now();
let timer = document.getElementById("timer");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resumeButton = document.getElementById("resume");
let resetButton = document.getElementById("reset");
startTime;
let elapsedTime = 0;
let timerInterval;

// Fonction pour mettre à jour le texte du chronomètre
function updateTimerText() {
  let minutes = Math.floor(elapsedTime / (60 * 1000));
  let seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
  timer.textContent =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}

// Démarrer le chronomètre
startButton.onclick = function () {
  startTime = Date.now();
  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    updateTimerText();
  }, 1000);
};

// Mettre en pause le chronomètre
pauseButton.onclick = function () {
  clearInterval(timerInterval);
};

// Reprendre le chronomètre
resumeButton.onclick = function () {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    updateTimerText();
  }, 1000);
};

// Réinitialiser le chronomètre
resetButton.onclick = function () {
  clearInterval(timerInterval);
  elapsedTime = 0;
  startTime = Date.now(); // Réinitialiser le startTime
  updateTimerText();
};

// Ajouter un gestionnaire d'événements à chaque case de la grille
for (let cell of document.querySelectorAll("#sudoku-grid input")) {
  cell.addEventListener("click", function () {
    let number = this.value;
    // Surligner toutes les cases qui contiennent le même nombre
    for (let otherCell of document.querySelectorAll("#sudoku-grid input")) {
      if (otherCell.value === number) {
        otherCell.classList.add("highlighted");
      } else {
        otherCell.classList.remove("highlighted");
      }
    }
  });
}
// Ajouter un gestionnaire d'événements à chaque case de la grille
for (let cell of document.querySelectorAll("#sudoku-grid input")) {
  cell.addEventListener("input", function () {
    let number = this.value;
    let position = getPosition(this); // Déterminer la position de la cellule
    // Vérifier si le nombre peut être placé dans la cellule
    if (!valid(number, position)) {
      this.classList.add("error");
    } else {
      this.classList.remove("error");
    }
  });
}

document.getElementById("night-mode").addEventListener("click", toggleNightMode);


function toggleNightMode() {
  let link = document.getElementById("night-mode-css");
  if (link) {
    // Si le lien existe déjà, supprimez-le pour désactiver le mode nuit
    link.parentNode.removeChild(link);
  } else {
    // Sinon, ajoutez le lien pour activer le mode nuit
    link = document.createElement("link");
    link.id = "night-mode-css";
    link.rel = "stylesheet";
    link.href = "nightmode.css";  // Remplacez par le chemin vers votre fichier CSS du mode nuit
    document.head.appendChild(link);
  }
}


// function to hide dialog opened in window
window.onclick = function (event) {
  var d1 = document.getElementById("dialog");
  var d2 = document.getElementById("about-dialog");
  var m1 = document.getElementById("more-option-list");

  if (event.target == d1) {
    hideDialogButtonClick("dialog");
  } else if (event.target == d2) {
    hideDialogButtonClick("about-dialog");
  } else if (m1.style.visibility == "visible") {
    hideMoreOptionMenu();
  }
};
////////////////////////////////////////////////////////
// show hamburger menu
function HamburgerButtonClick() {
  debugger;
  var div = document.getElementById("hamburger-menu");
  var menu = document.getElementById("nav-menu");
  div.style.display = "block";
  div.style.visibility = "visible";
  setTimeout(function () {
    div.style.opacity = 1;
    menu.style.left = 0;
  }, 50);
}
