const teamSelection = document.getElementById('teamSelection');
const redTeamButton = document.getElementById('redTeamButton');
const blueTeamButton = document.getElementById('blueTeamButton');
const countdownElement = document.getElementById('countdown');
const randomNumberElement = document.getElementById('randomNumber');
const circleButton = document.getElementById('circleButton');
const startButton = document.getElementById('startButton');
const result = document.getElementById('result');
const chart = document.getElementById('chart');
const differenceElement = document.getElementById('difference');
const restartButton = document.getElementById('restartButton');

let selectedTeam = '';
let redTeamTimes = [];
let blueTeamTimes = [];
let startTime, endTime;

redTeamButton.addEventListener('click', () => {
  selectedTeam = 'red';
  startGame();
});

blueTeamButton.addEventListener('click', () => {
  selectedTeam = 'blue';
  startGame();
});

startButton.addEventListener('click', startGameRound);

function startGame() {
  teamSelection.style.display = 'none';
  startButton.style.display = 'inline-block';
  result.textContent = '';
  chart.style.display = 'none';
  differenceElement.style.display = 'none';
  restartButton.style.display = 'none';
}

function startGameRound() {
  result.textContent = '';
  startButton.style.display = 'none';
  randomNumberElement.textContent = '';
  circleButton.style.display = 'none';
  countdown(3);
}

function countdown(seconds) {
  countdownElement.textContent = seconds;
  if (seconds > 0) {
    setTimeout(() => countdown(seconds - 1), 1000);
  } else {
    countdownElement.textContent = '';
    showRandomNumber();
  }
}

function showRandomNumber() {
  const randomNum = Math.floor(Math.random() * 10) + 1;
  randomNumberElement.textContent = randomNum;
  circleButton.style.display = 'inline-block';
  circleButton.disabled = false;
  startTime = new Date().getTime();
}

circleButton.addEventListener('click', () => {
  endTime = new Date().getTime();
  const reactionTime = (endTime - startTime) / 1000;
  result.textContent = `Tiempo de reacción: ${reactionTime} segundos`;
  circleButton.style.display = 'none';

  if (selectedTeam === 'red') {
    redTeamTimes.push(reactionTime);
  } else if (selectedTeam === 'blue') {
    blueTeamTimes.push(reactionTime);
  }

  showResults();
});

function showResults() {
  const redTeamAvg = calculateAverage(redTeamTimes);
  const blueTeamAvg = calculateAverage(blueTeamTimes);
  const difference = Math.abs(redTeamAvg - blueTeamAvg).toFixed(3);

  displayChart(redTeamAvg, blueTeamAvg);
  differenceElement.textContent = `Diferencia de tiempos: ${difference} segundos`;
  differenceElement.style.display = 'inline-block';
  restartButton.style.display = 'inline-block';
}

function calculateAverage(times) {
  const sum = times.reduce((a, b) => a + b, 0);
  return sum / times.length;
}

function displayChart(redTeamAvg, blueTeamAvg) {
  const ctx = chart.getContext('2d');
  chart.style.display = 'block';

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Equipo Rojo', 'Equipo Azul'],
      datasets: [{
        label: 'Tiempo promedio (s)',
        data: [redTeamAvg, blueTeamAvg],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

restartButton.addEventListener('click', () => {
  selectedTeam = '';
  redTeamTimes = [];
  blueTeamTimes = [];
  teamSelection.style.display = 'block';
  chart.style.display = 'none';
  differenceElement.style.display = 'none';
  restartButton.style.display = 'none';
});