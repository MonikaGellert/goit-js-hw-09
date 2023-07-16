function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stopBtnHandler);

function startBtnHandler(event) {
  intervalId = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
  event.target.disabled = true;
}

function stopBtnHandler(event) {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
