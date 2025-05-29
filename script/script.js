const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');
const gameBoard = document.querySelector('.game-board');
document.addEventListener('click', (event) => {
  const isButton = event.target.closest('button');

  if (!isButton) {
    jump();
  }
});

let time = 0;
let timer;
let loop;
let speed = 1.5;
let gameStarted = false;
let hasStartedOnce = false;
let pipeDelayMin = 2000; 
let pipeDelayMax = 3000;



function startGame() {
  if (hasStartedOnce) return;
  hasStartedOnce = true;
  gameStarted = true;
  
  mario.src = './img/narutorun.gif';
  mario.style.width = '5em';

  gameBoard.style.animation = `mover-fundo 60s infinite linear`;
  
  pipe.style.animation = `pipe-animation ${speed}s infinite linear`;

  
  timer = setInterval(() => {
    time++;
    scoreDisplay.textContent = `Time: ${time}s`;
  }, 1000);

  
  loop = setInterval(checkColision, 10);
  
  spawnPipe();
  
  setInterval(() => {
  if (!gameStarted) return;

  speed = speed - 0.025; 
  pipe.style.animation = `pipe-animation ${speed}s infinite linear`;

}, 10000);
  
  setInterval(() => {
  if (!gameStarted) return;

  
  speed -= 0.05;
  pipe.style.animation = `pipe-animation ${speed}s infinite linear`;

  
  pipeDelayMin = Math.max(300, pipeDelayMin - 200);
  pipeDelayMax = Math.max(500, pipeDelayMax - 200);

}, 10000); 
}

function jump() {
  if (!mario.classList.contains('jump') && gameStarted == true) {
    mario.classList.add('jump');

    setTimeout(() => {
      mario.classList.remove('jump');
    }, 700);
  }
}

function checkColision() {
  const pipePosition = pipe.offsetLeft;
  const marioBottom = parseFloat(window.getComputedStyle(mario).bottom);
  
  if (pipePosition <= 25 && pipePosition > 0 && marioBottom > 25 && marioBottom < 60) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioBottom}px`;

    clearInterval(timer);
    clearInterval(loop);
    gameStarted = false;

    showGameOver();
    mario.src = './img/crying.png';
    mario.style.width = '4em';
  }
  
    if (pipePosition <= 45 && pipePosition > 0 && marioBottom < 25) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioBottom}px`;

    clearInterval(timer);
    clearInterval(loop);
      gameStarted = false;

    showGameOver();
      mario.src = './img/crying.png';
      mario.style.width = '4em';
  }
}

function spawnPipe() {
  if (!gameStarted) return;

  pipe.style.left = '100%';
  pipe.style.transition = 'none';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      pipe.style.transition = `left ${speed}s linear`;
      pipe.style.left = '-4em';
    });
  });

  const delay = Math.random() * (pipeDelayMax - pipeDelayMin) + pipeDelayMin;

  setTimeout(spawnPipe, speed * 1000 + delay);
}

function showGameOver() {
  const gameOverScreen = document.getElementById('game-over');
  const finalScore = document.getElementById('final-score');
  finalScore.textContent = `Final Time: ${time}s`;
  gameOverScreen.style.display = 'flex';
}

function reset() {
  location.reload();
}
