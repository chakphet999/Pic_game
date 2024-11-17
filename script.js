const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const backgroundMusic = document.getElementById("background-music"); // อ้างอิงถึง audio element
const images = [
    "🍎", "🍌", "🍓", "🍇", "🍉", 
    "🍍", "🍑", "🥝"
];
let cardsArray = [...images, ...images];
let firstCard, secondCard;
let lockBoard = false;
let matchedCount = 0;

function shuffleCards() {
    cardsArray.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffleCards();
    cardsArray.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-content front-face"></div>
            <div class="card-content back-face">${image}</div>
        `;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

    // เริ่มเล่นเพลงเมื่อสร้างบอร์ดใหม่
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add("flip");
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}
function showWinModal() {
    const modal = document.getElementById("winModal");
    const closeButton = document.getElementById("closeModal");
  
    modal.style.display = "block"; // แสดง modal
  
    // ปิด modal เมื่อคลิกปุ่มปิด
    closeButton.onclick = function () {
      modal.style.display = "none";
    };
  
    // ปิด modal เมื่อคลิกนอก modal
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;
    if (isMatch) {
        disableCards();
        matchedCount += 2;
        if (matchedCount === cardsArray.length) {
            // เรียกฟังก์ชันแสดง modal
            showWinModal();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
        resetBoard();
    }, 500);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

resetButton.addEventListener("click", () => {
    matchedCount = 0;
    createBoard();
});

createBoard();
